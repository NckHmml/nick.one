import * as React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export class HomePage extends React.Component {
  public render() {
    return (
      <>
        <Helmet>
          <title>HomePage</title>
        </Helmet>

        <div className="container">
          <div className="g-24">
            <h1>Hello World!</h1>
            <h2>This is the HomePage</h2>
            <Link to="/">Home</Link>
            <br />
            <Link to="/test">Test</Link>
          </div>
        </div>
      </>
    );
  }
}