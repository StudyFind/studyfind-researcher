import { Switch, Route, Redirect } from "react-router-dom";

import Auth from "views/External/Auth/Auth";
import Team from "views/External/Home/Team";
import Landing from "views/External/Home/Landing";
function External() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/auth" component={Auth} />
      <Route exact path="/team" component={Team} />
      <Redirect to="/" />
    </Switch>
  );
}

export default External;
