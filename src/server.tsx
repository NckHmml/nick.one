/// <reference path="./index.d.ts" />

import * as path from "path";
import * as fs from "fs";
import * as express from "express";
import * as React from "react";
import * as Handlebars from "handlebars";
import { Request, Response } from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

import { AppComponent } from "./app";

global.BROWSER = false;
const server = express();

const indexPath = path.resolve(__dirname, "../dist/index.html");
const indexHtml = fs.existsSync(indexPath) ?
  fs.readFileSync(indexPath) :
  "";
const indexTemplate = Handlebars.compile(indexHtml.toString());

const renderReact: express.RequestHandler = (req: Request, res: Response) => {
  const context = { statusCode: 200 };
  const reactDom = renderToString(
    <StaticRouter location={req.url} context={context}>
      <AppComponent />
    </StaticRouter>
  );
  const helmet = Helmet.renderStatic();

  res.writeHead(context.statusCode, { "Content-Type": "text/html" });
  res.end(indexTemplate({
    reactDom,
    helmet
  }));
};

// index should alway go to react (else it will take the static dist/index.html)
server.get("/", renderReact);
server.get("/index.html", renderReact);
// Host /dist as static
server.use(express.static(path.resolve(__dirname, "../dist")));
// All other request try to handle by React
server.get("/*", renderReact);

const port = 8080;
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});