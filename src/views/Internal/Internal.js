import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Box, Flex } from "components";

import Sidebar from "./Sidebar";

import CreateStudy from "views/Internal/Study/CreateStudy/CreateStudy";
import Settings from "views/Internal/Settings/Settings";
import Dashboard from "views/Internal/Dashboard/Dashboard";
import Study from "views/Internal/Study/Study";
import Notifications from "views/Internal/Notifications/Notifications";

function Internal() {
  return (
    <Flex bg="#f8f9fa">
      <Sidebar />
      <Box ml="280px" w="100%" minH="100vh">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/study/:nctID" component={Study} />
          <Route exact path="/create" component={CreateStudy} />
          <Route exact path="/notifications" component={Notifications} />
          <Route exact path="/settings" component={Settings} />
          <Redirect to="/" />
        </Switch>
      </Box>
    </Flex>
  );
}

export default Internal;
