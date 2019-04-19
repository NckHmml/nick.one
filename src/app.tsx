import * as React from "react";
import { Switch, Route } from "react-router";
import Helmet from "react-helmet";

import { Navigation } from "./components/nagivation";
import { HomePage } from "./pages/home";
import { TestPage } from "./pages/test";
import { NotFoundPage } from "./pages/notFound";

export class AppComponent extends React.Component {
  public render() {
    return (
      <>
        <Helmet
          titleTemplate="Portfolio - %s"
        />
        <Navigation />
        <div className="content">
          <Switch>
            <Route exact={true} path="/" component={HomePage} />
            <Route exact={true} path="/test" component={TestPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </>
    );
  }
}