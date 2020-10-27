import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import CreateStudy from "views/Internal/CreateStudy/CreateStudy";
import Settings from "views/Internal/Settings/Settings";

function Internal() {
  return (
    <Switch>
      <Route exact path="/" component={CreateStudy} />
      <Route exact path="/settings" component={Settings} />
      <Redirect to="/" />
    </Switch>
  );
}

export default Internal;
