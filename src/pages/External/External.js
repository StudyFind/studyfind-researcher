import { Switch, Route, Redirect } from "react-router-dom";

import Home from "pages/External/Home/Home";
import Auth from "pages/External/Auth/Auth";

function External() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/auth" component={Auth} />
      <Redirect to="/" />
    </Switch>
  );
}

export default External;
