/* IE Polyfill (IE 10) */
import "core-js/features/map";
import "core-js/features/set";

/* Imports */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";

import { NotFoundPage } from "./pages/notFound";

const AboutPageLazy = React.lazy(() => import("./pages/about"));
const HomePageLazy = React.lazy(() => import("./pages/home"));
const KanaPageLazy = React.lazy(() => import("./pages/kana"));

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
})();

Promise
  .all<typeof import("./app"), typeof import("./languages/en.json")>([import("./app"), pLanguage])
  .then(([mApp, mLanguage]) => {
    const { App, AppComponent } = mApp;
    App.I18N = mLanguage;

    const loader = <div>Loading...</div>;

    // Also maintain routes in server.tsx
    const Entry = () => (
      <AppComponent>
        <React.Suspense fallback={loader}>
          <Switch>
            <Route exact={true} path="/" component={HomePageLazy} />
            <Route exact={true} path="/about" component={AboutPageLazy} />
            <Route exact={true} path="/kana(/test)?" component={KanaPageLazy} />
            <Route component={NotFoundPage} />
          </Switch>
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