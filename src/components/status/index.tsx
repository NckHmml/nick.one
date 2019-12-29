import * as React from "react";
import { Route, RouteComponentProps, StaticContext } from "react-router";

interface IStatusProps {
  code: number;
}

export class Status extends React.Component<IStatusProps> {
  private renderWithStatus = (routeProps: RouteComponentProps<{}, StaticContext>) => {
    const { code, children } = this.props;
    if (!process.env.BROWSER) {
      routeProps.staticContext.statusCode = code;
    }
    return children;
  }

  public render() {
    return <Route render={this.renderWithStatus} />;
  }
}