/* IE Polyfill (IE 10) */
import "core-js/features/map";
import "core-js/features/set";

import "systemjs/dist/s.min.js";

/* Imports */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AppComponent } from "./app";

// Start rendering application
if (global.DEBUG) {
  ReactDOM.render(
    <BrowserRouter>
      <AppComponent />
    </BrowserRouter>,
    document.getElementById("entry")
  );
} else {
  ReactDOM.hydrate(
    <BrowserRouter>
      <AppComponent />
    </BrowserRouter>,
    document.getElementById("entry")
  );
}