import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import Home from "views/External/Home/Home";
import Auth from "views/External/Auth/Auth";
import Terms from "views/External/Docs/Terms";
import Privacy from "views/External/Docs/Privacy";

function External() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/auth" component={Auth} />
      <Route exact path="/terms" component={Terms} />
      <Route exact path="/privacy" component={Privacy} />
      <Redirect to="/" />
    </Switch>
  );
}

export default External;
