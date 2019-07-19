/// <reference path="./index.d.ts" />

import * as path from "path";
import * as fs from "fs";
import * as express from "express";
import * as React from "react";
import * as Handlebars from "handlebars";
import * as webpack from "webpack";
import * as webpackDev from "webpack-dev-middleware";
import * as webpackHot from "webpack-hot-middleware";
import { Request, Response } from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

import { App } from "./app";

global.BROWSER = false;
const server = express();

const indexPath = path.resolve(__dirname, "../dist/index.html");
const indexHtml = fs.existsSync(indexPath) ?
  fs.readFileSync(indexPath) :
  "";
const indexTemplate = Handlebars.compile(indexHtml.toString());

const renderTemplate = (context: {}) => {
  if (process.env.NODE_ENV === "production") {
    // Optimize rendering for production
    return indexTemplate(context);
  } else {
    // During dev the index.html might change, more dynamic aproach
    const html = fs.readFileSync(path.resolve(__dirname, "../dist/index.html"));
    const template = Handlebars.compile(html.toString());
    return template(context);
  }
} 

const renderReact: express.RequestHandler = (req: Request, res: Response) => {
  const context = { statusCode: 200 };
  const reactDom = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  const helmet = Helmet.renderStatic();

  res.writeHead(context.statusCode, { "Content-Type": "text/html" });
  res.end(renderTemplate({ 
    reactDom,
    helmet
  }));
};

// index should alway go to react (else it will take the static dist/index.html)
server.get("/", renderReact);
server.get("/index.html", renderReact);

// Webpack-dev
if (process.env.NODE_ENV !== "production") {
  const config = require("../webpack.config.js")("development");
  const compiler = webpack(config);
  server.use(webpackDev(compiler, {
    publicPath: "/",
    writeToDisk: true // Needed for the SSR
  }));
  server.use(webpackHot(compiler));
  server.get("/dist/*", (req, res) => {
    res.redirect(req.path.substr(5));
  });
}
// Host /dist as static
if (process.env.NODE_ENV === "production") {
  server.use(express.static(path.resolve(__dirname, "../dist")));
}
// Static for dev, prod uses nginx
if (process.env.NODE_ENV !== "production") {
  server.use("/static", express.static(path.resolve(__dirname, "../static")));
}
// All other request try to handle by React
server.get("/*", renderReact);

const port = 8080;
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});