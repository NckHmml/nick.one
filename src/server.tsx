/// <reference path="./index.d.ts" />

import * as path from "path";
import * as fs from "fs";
import * as express from "express";
import * as React from "react";
import * as Handlebars from "handlebars";
import { Request, Response } from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter, Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import { App, AppComponent } from "./app";
import { KanaPage } from "~/pages/kana";
import { AboutPage } from "~/pages/about";
import { HomePage } from "~/pages/home";
import { NotFoundPage } from "~/pages/notFound";

const server = express();

const indexPath = path.resolve(__dirname, "../dist/index.html");
const indexHtml = fs.existsSync(indexPath) ?
  fs.readFileSync(indexPath) :
  "";
const indexTemplate = Handlebars.compile(indexHtml.toString());

const renderReact: express.RequestHandler = (req: Request, res: Response) => {
  const context = { statusCode: 200 };
  const languageJson = (() => {
    switch (req.params.lang) {
      case "nl": {
        return require("./languages/nl.json");
      }
      case "en":
      default: {
        return require("./languages/en.json");
      }
    }
  })();
  App.I18N = languageJson;
  // Also maintain routes in browser.tsx
  const reactDom = renderToString(
    <StaticRouter basename={`/${req.params.lang || "en"}`} location={req.url} context={context}>
      <AppComponent>
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route exact={true} path="/about" component={AboutPage} />
          <Route exact={true} path="/kana(/test)?" component={KanaPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </AppComponent>
    </StaticRouter>
  );
  const helmet = Helmet.renderStatic();

  res.writeHead(context.statusCode, { "Content-Type": "text/html" });
  res.end(indexTemplate({
    reactDom,
    helmet
  }));
};

// Root to english
server.get("/", (_req: Request, res: Response) => res.redirect(`/en/`));
// Host /dist as static
server.use(express.static(path.resolve(__dirname, "../dist")));
// All other request try to handle by React
server.get("/:lang([a-z]{2})/", renderReact);
server.get("/:lang([a-z]{2})/*", renderReact);
server.get("/*", (req: Request, res: Response) => res.redirect(`/en${req.path}`));

const port = 8080;
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});