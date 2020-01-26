import * as React from "react";
import { Switch, Route } from "react-router-dom";

/**
 * Shared routes function so we can have all routes in one file
 */
export const PageRoutes = ({ HomePage, AboutPage, KanaPage, SudokuPage, NotFoundPage }: { [key: string]: React.LazyExoticComponent<any> | React.ComponentClass }) => (
  <Switch>
    <Route exact={true} path="/" component={HomePage} />
    <Route exact={true} path="/about" component={AboutPage} />
    <Route exact={true} path="/kana(/test)?" component={KanaPage} />
    <Route exact={true} path="/sudoku" component={SudokuPage} />
    <Route component={NotFoundPage} />
  </Switch>
);