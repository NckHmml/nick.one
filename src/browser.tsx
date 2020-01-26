/* IE 11 and Edge */
import "core-js/features/array";

/* Imports */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";

import { PageRoutes } from "./routes";

import { NotFoundPage } from "./pages/notFound";

const routesProps = {
  AboutPage: React.lazy(() => import("./pages/about")),
  HomePage: React.lazy(() => import("./pages/home")),
  KanaPage: React.lazy(() => import("./pages/kana")),
  SudokuPage: React.lazy(() => import("./pages/sudoku")),
  NotFoundPage
}; 

const regex = /^\/([a-z]{2})\//i;
const language = regex.test(location.pathname) ? regex.exec(location.pathname)[1] : "en";
const pLanguage = (() => {
  switch (language) {
    case "nl": {
      return import("./languages/nl.json");
    }
    case "en":
    default: {
      return import("./languages/en.json");
    }
  }
})() as never as Promise<I18NJSON>;

Promise
  .all<typeof import("./app"), I18NJSON>([import("./app"), pLanguage])
  .then(([mApp, mLanguage]) => {
    const { App, AppComponent } = mApp;
    App.I18N = mLanguage;

    const loader = <div>Loading...</div>;

    const Entry = () => (
      <AppComponent>
        <React.Suspense fallback={loader}>
          <PageRoutes {...routesProps} />
        </React.Suspense>
      </AppComponent>
    );

    // Start rendering application
    if (process.env.DEBUG === "true") {
      if (module["hot"]) {
        module["hot"].accept()
      }
      ReactDOM.render(
        <BrowserRouter basename={`/${language}/`}>
          <Entry />
        </BrowserRouter>,
        document.getElementById("entry")
      );
    } else {
      // Load MS App Insights
      App.insights = new ApplicationInsights({
        config: {
          instrumentationKey: process.env.INSIGHTS_KEY,
          enableDebug: process.env.DEBUG === "true",
        }
      });
      App.insights.loadAppInsights();
      App.insights.trackPageView();

      ReactDOM.hydrate(
        <BrowserRouter basename={`/${language}/`}>
          <Entry />
        </BrowserRouter>,
        document.getElementById("entry")
      );
    }
  });