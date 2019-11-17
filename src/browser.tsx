/* IE Polyfill (IE 10) */
import "core-js/features/map";
import "core-js/features/set";

import "systemjs/dist/s.min.js";

/* Imports */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AppEntry } from "./app";

// Start rendering application
if (global.DEBUG) {
  ReactDOM.render(
    <BrowserRouter>
      <AppEntry />
    </BrowserRouter>,
    document.getElementById("entry")
  );
} else {
  ReactDOM.hydrate(
    <BrowserRouter>
      <AppEntry />
    </BrowserRouter>,
    document.getElementById("entry")
  );
}