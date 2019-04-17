import * as path from "path";
import * as fs from "fs";
import * as express from "express";
import * as React from "react";
import * as Handlebars from "handlebars";
import { renderToString } from "react-dom/server";

import { AppComponent } from "./app";

const server = express();

const indexHtml = fs.readFileSync(path.resolve(__dirname, "../dist/index.html"));
const indexTemplate = Handlebars.compile(indexHtml.toString());

const renderReact: express.RequestHandler = (req, res) => {
  const jsx = <AppComponent />
  const reactDom = renderToString(jsx);

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(indexTemplate({ reactDom }));
};

server.get("/", renderReact);
server.get("/index.html", renderReact);
server.use(express.static(path.resolve(__dirname, "../dist")));
server.get("/*", renderReact);



const port = 8080;
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});