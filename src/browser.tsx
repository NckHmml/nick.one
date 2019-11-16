/* IE Polyfill (IE 10) */
import "core-js/features/map";
import "core-js/features/set";

import "systemjs/dist/s.min.js";

/* Imports */
import * as React from "react";
import * as ReactDOM from "react-dom";

import { AppComponent, HotApp } from "./app";
import { BrowserRouter } from "react-router-dom";

// Check if HMR should be enabled
const Entry = global.DEBUG ? HotApp : AppComponent;

// Start rendering application
ReactDOM.hydrate(
  <BrowserRouter>
    <Entry />
  </BrowserRouter>,
  document.getElementById("entry")
);