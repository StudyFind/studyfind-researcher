import React from "react";
import styled from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";

import Sidebar from "./Sidebar";

import CreateStudy from "views/Internal/CreateStudy/CreateStudy";
import Settings from "views/Internal/Settings/Settings";
import Studies from "views/Internal/Studies/Studies";
import Study from "views/Internal/Study/Study";
import Notifications from "./Notifications/Notifications";

function Internal() {
  return (
    <Screen>
      <Sidebar />
      <Page>
        <Switch>
          <Route exact path="/" component={CreateStudy} />
          <Route exact path="/studies" component={Studies} />
          <Route exact path="/study/:nctID" component={Study} />
          <Route exact path="/create" component={CreateStudy} />
          <Route exact path="/notifications" component={Notifications} />
          <Route exact path="/settings" component={Settings} />
          <Redirect to="/" />
        </Switch>
      </Page>
    </Screen>
  );
}

const Screen = styled.div`
  display: flex;
  background: #f8f9fa;
`;

const Page = styled.div`
  margin-left: 280px;
  width: 100%;
  min-height: 100vh;
`;

export default Internal;
