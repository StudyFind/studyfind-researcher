import { Switch, Route, Redirect } from "react-router-dom";

import Auth from "views/External/Auth/Auth";
import Team from "views/External/Home/Team";
import Landing from "views/External/Home/Landing";
import styled from "styled-components";
import Bg from "images/sf-hero-background.png";
import { createGlobalStyle } from "styled-components";

function External() {
  return (
    <Switch>
      <Route exact path="/">
        <Global />
        <Background src={Bg} />
        <Landing />
      </Route>
      <Route exact path="/auth" component={Auth} />
      <Route exact path="/team" component={Team} />
      <Redirect to="/" />
    </Switch>
  );
}
const Global = createGlobalStyle`
body{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
`;
const Background = styled.img`
  position: absolute;
  top: 50px;
  right: 0;
  width: 90vw;

  z-index: -1;
`;
export default External;
