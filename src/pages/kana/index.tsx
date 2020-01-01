import * as React from "react";
import { Switch, Route } from "react-router";
import { Helmet } from "react-helmet";

import { KanaStore } from "~/redux/kana";
import { KanaTest } from "./test";
import { KanaHome } from "./home";

export class KanaPage extends React.Component {
  public static kanaStore = new KanaStore();

  public render() {
    return (
      <>
        <Helmet>
          <title>Kana learning tool</title>
          <meta name="description" content="Kana learning tool, by Nick Hummel" />
        </Helmet>
        <Switch>
          <Route exact={true} path="/kana" component={KanaHome}/>
          <Route exact={true} path="/kana/test" component={KanaTest} />
        </Switch>
      </>
    );
  }
}

export default KanaPage;