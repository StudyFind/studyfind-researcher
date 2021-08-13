import { Switch, Route, Redirect } from "react-router-dom";

import Home from "views/External/Home/Home";
import Auth from "components/feature/Auth/Auth";
import { Flex } from "@chakra-ui/react";

function External() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/auth">
        <Flex height="100vh" width="100vw" justify="center" align="center">
          <Auth />
        </Flex>
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default External;
