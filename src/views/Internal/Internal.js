import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import Settings from "views/Internal/Settings/Settings";

function Internal() {
  return (
    <Switch>
      <Route exact path="/" component={Settings} />
      <Redirect to="/" />
    </Switch>
  );
}

export default Internal;
