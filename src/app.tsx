import * as React from "react";
import { Switch, Route } from "react-router";
import Helmet from "react-helmet";
import { hot } from "react-hot-loader";

import { KanaStore } from "./redux/kana";

import { Background } from "./components/background";
import { Navigation } from "./components/nagivation";

import { NotFoundPage } from "./pages/notFound";
import { HomePage } from "./pages/home";
import { AboutPage } from "./pages/about";
import { KanaPage } from "./pages/kana";

export class App extends React.Component {
  public static kanaStore = new KanaStore();

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
            <Route exact={true} path="/about" component={AboutPage} />
            <Route exact={true} path="/kana" component={KanaPage} />
            <Route component={NotFoundPage} />
          </Switch>
          <div className="g-24 content-bottom" />
        </div>
        <Background />
      </>
    );
  }
}

export const HotApp = hot(module)(App);