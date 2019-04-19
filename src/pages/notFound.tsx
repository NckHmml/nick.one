import * as React from "react";
import { Helmet } from "react-helmet";

import { Status } from "~/components/status";

export class NotFoundPage extends React.Component {
  public render() {
    return (
      <Status code={404}>
        <Helmet>
          <title>page not found</title>
        </Helmet>

        <div className="g-24">
          <h1>404 - Page not found</h1>
        </div>
      </Status>
    );
  }
}