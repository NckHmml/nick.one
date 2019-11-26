import * as React from "react";
import { Switch, Route, RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { observer } from "mobx-react";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import Helmet from "react-helmet";

import { KanaStore } from "./redux/kana";
import { GlobalStore } from "./redux/global";

import { Background } from "./components/background";
import { NavigationComponent as Navigation } from "./components/nagivation";

import { NotFoundPage } from "./pages/notFound";
import { HomePage } from "./pages/home";
import { AboutPage } from "./pages/about";
import { KanaPage } from "./pages/kana";
import { ClassNames } from "./helpers/global";

@observer
export class App extends React.Component<RouteComponentProps<{}>> {
  public static insights?: ApplicationInsights;
  public static kanaStore = new KanaStore();
  public static globalStore = new GlobalStore();

  public componentDidUpdate(prevProps: RouteComponentProps<{}>) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0); // Restore scroll
      if (App.insights) {
        App.insights.trackPageView();
      }
    }
  }

  public render() {
    const htmlClass = ClassNames({
      "dark-mode": App.globalStore.darkmode,
      "light-mode": !App.globalStore.darkmode
    });

    return (
      <>
        <Helmet titleTemplate="Portfolio - %s">
          <html lang="en" className={htmlClass} />
          <meta name="description" content="Personal portfolio, by Nick Hummel" />
        </Helmet>
        <Navigation />
        <div className="content">
          <Switch>
            <Route exact={true} path="/"><HomePage /></Route>
            <Route exact={true} path="/about"><AboutPage /></Route>
            <Route exact={true} path="/kana"><KanaPage /></Route>
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