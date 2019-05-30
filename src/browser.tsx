/* IE Polyfill (IE 10) */
import "core-js/es6/array";
import "core-js/es6/map";
import "core-js/es6/promise";
import "core-js/es6/set";

/* Imports */
import * as React from "react";
import * as ReactDOM from "react-dom";

import { App, HotApp } from "./app";
import { BrowserRouter } from "react-router-dom";

// Check if HMR should be enabled
const Entry = global.DEBUG ? HotApp : App;

// Start rendering application
ReactDOM.hydrate(
  <BrowserRouter>
    <Entry />
  </BrowserRouter>,
  document.getElementById("entry")
);