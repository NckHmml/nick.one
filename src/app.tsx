import * as React from "react";
import { Switch, Route, RouteComponentProps, withRouter } from "react-router";
import Helmet from "react-helmet";
import { hot } from "react-hot-loader";

import { KanaStore } from "./redux/kana";

import { Background } from "./components/background";
import { NavigationComponent as Navigation } from "./components/nagivation";

import { NotFoundPage } from "./pages/notFound";
import { HomePage } from "./pages/home";
import { AboutPage } from "./pages/about";
import { KanaPage } from "./pages/kana";

export class App extends React.Component<RouteComponentProps<{}>> {
  public static kanaStore = new KanaStore();

  public componentDidUpdate(prevProps: RouteComponentProps<{}>) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0); // Restore scroll
    }
  }

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


export const AppComponent = withRouter(App);

export const HotApp = hot(module)(AppComponent);