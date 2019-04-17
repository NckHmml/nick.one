/* IE Polyfill (IE 10) */
import "core-js/es6/array";
import "core-js/es6/map";
import "core-js/es6/promise";
import "core-js/es6/set";

/* Imports */
import * as React from "react";
import * as ReactDOM from "react-dom";

import { AppComponent } from "./app";


// Start rendering application
ReactDOM.hydrate(
  <AppComponent />,
  document.getElementById("entry")
);