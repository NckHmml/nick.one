import * as React from "react";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { observer } from "mobx-react";
// @ts-ignore
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import Helmet from "react-helmet";

import { GlobalStore } from "./redux/global";

import { Background } from "./components/background";
import { NavigationComponent as Navigation } from "./components/navigation";

import { ClassNames } from "./helpers/global";

@observer
export class App extends React.Component<RouteComponentProps<{}>> {
  public static insights?: ApplicationInsights;
  public static globalStore = new GlobalStore();
  public static I18N: I18NJSON;

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
          <div>{this.props.children}</div>
          <div key="content-bottom" className="g-24 content-bottom" />
        </div>
        <Background />
      </>
    );
  }
}

export const AppComponent = withRouter(App);