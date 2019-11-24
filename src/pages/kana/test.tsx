import * as React from "react";
import { Helmet } from "react-helmet";
import { observer } from "mobx-react";

@observer
export class KanaTest extends React.Component {
  public render() {
    return (
      <>
        <Helmet>
          <title>Kana learning tool</title>
          <meta name="description" content="Kana learning tool, by Nick Hummel" />
        </Helmet>
      </>
    );
  }
}