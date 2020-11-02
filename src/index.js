import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { theme } from "@chakra-ui/core";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import "styles.scss";

import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CSSReset />
    <Router>
      <App />
    </Router>
  </ThemeProvider>,
  document.getElementById("root")
);
