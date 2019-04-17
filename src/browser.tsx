/* IE Polyfill (IE 10) */
import "core-js/es6/array";
import "core-js/es6/map";
import "core-js/es6/promise";
import "core-js/es6/set";

/* Imports */
import * as React from "react";
import * as ReactDOM from "react-dom";

import { AppComponent } from "./app";
import { BrowserRouter } from "react-router-dom";


// Start rendering application
ReactDOM.hydrate(
  <BrowserRouter>
    <AppComponent />
  </BrowserRouter>,
  document.getElementById("entry")
);