import * as React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export class TestPage extends React.Component {
  public render() {
    return (
      <>
        <Helmet>
          <title>TestPages</title>
        </Helmet>

        <h1>Hello World!</h1>
        <h2>This is the TestPage</h2>
        <Link to="/">Home</Link>
        <br />
        <Link to="/test">Test</Link>
      </>
    );
  }
}