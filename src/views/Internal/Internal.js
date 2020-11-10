import React from "react";
import styled from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";

import Sidebar from "./Sidebar";

import CreateStudy from "views/Internal/CreateStudy/CreateStudy";
import Settings from "views/Internal/Settings/Settings";
import Studies from "views/Internal/Studies/Studies";

function Internal() {
  return (
    <Screen>
      <Sidebar />
      <Page>
        <Switch>
          <Route exact path="/" component={CreateStudy} />
          <Route exact path="/studies" component={Studies} />
          <Route exact path="/settings" component={Settings} />
        </Switch>
      </Page>
    </Screen>
  );
}

const Screen = styled.div`
  display: flex;
`;

const Page = styled.div`
  margin-left: 250px;
  width: 100%;
  min-height: 100vh;
`;

export default Internal;
