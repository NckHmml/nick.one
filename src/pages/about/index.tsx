import * as React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export class AboutPage extends React.Component {
  public render() {
    return (
      <>
        <Helmet>
          <title>About</title>
        </Helmet>

        <div className="g-24">
          <h1>Hello World!</h1>
          <h2>This is the AboutPage</h2>
          <Link to="/">Home</Link>
          <br />
          <Link to="/test">Test</Link>
        </div>
      </>
    );
  }
}