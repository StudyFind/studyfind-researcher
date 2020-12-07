import React from "react";
import styled from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";

import Sidebar from "./Sidebar";

import CreateStudy from "views/Internal/CreateStudy/CreateStudy";
import Settings from "views/Internal/Settings/Settings";
import Studies from "views/Internal/Studies/Studies";
import Study from "views/Internal/Study/Study";
import Notifications from "./Notifications/Notifications";
import Screen from "./Study/Participants/Screen/Screen";
function Internal() {
  return (
    <ThisScreen>
      <Sidebar />
      <Page>
        <Switch>
          <Route exact path="/" component={CreateStudy} />
          <Route exact path="/studies" component={Studies} />
          <Route exact path="/study/:id" component={Study} />
          <Route exact path="/create" component={CreateStudy} />
          <Route exact path="/notifications" component={Notifications} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/study/:id/participant/:participantid" component={Screen} />
          <Redirect to="/" />
        </Switch>
      </Page>
    </ThisScreen>
  );
}

const ThisScreen = styled.div`
  display: flex;
  background: #f8f9fa;
`;

const Page = styled.div`
  margin-left: 280px;
  width: 100%;
  min-height: 100vh;
`;

export default Internal;
