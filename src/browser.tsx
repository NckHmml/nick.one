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


import("./app").then((m) => {
  const { App, AppComponent } = m;

  const loader = <div>Loading...</div>;
  
  // Also maintain routes in server.tsx
  const Entry = () => (
    <AppComponent>
      <Switch>
        <Route exact={true} path="/">
          <React.Suspense fallback={loader}>
            <HomePageLazy />
          </React.Suspense>
        </Route>
        <Route exact={true} path="/about">
          <React.Suspense fallback={loader}>
            <AboutPageLazy />
          </React.Suspense>
        </Route>
        <Route exact={true} path="/kana">
          <React.Suspense fallback={loader}>
            <KanaPageLazy />
          </React.Suspense>
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
    </AppComponent>
  );
  
  // Start rendering application
  if (process.env.DEBUG === "true") {
    if (module["hot"]) {
      module["hot"].accept()
    }
    ReactDOM.render(
      <BrowserRouter>
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
      <BrowserRouter>
        <Entry />
      </BrowserRouter>,
      document.getElementById("entry")
    );
  }
});