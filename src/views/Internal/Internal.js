import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { Page } from "components";

import { auth, firestore } from "database/firebase";
import { useDocument, useCollection } from "hooks";

import Sidebar from "./Sidebar";

import CreateStudy from "views/Internal/Study/CreateStudy/CreateStudy";
import Settings from "views/Internal/Settings/Settings";
import Dashboard from "views/Internal/Dashboard/Dashboard";
import ViewStudy from "views/Internal/Study/ViewStudy/ViewStudy";
import Notifications from "views/Internal/Notifications/Notifications";

function Internal() {
  const { uid } = auth.currentUser;
  const [user] = useDocument(firestore.collection("researchers").doc(uid));
  const [studies, loading, error] = useCollection(
    firestore
      .collection("studies")
      .where("researcher.id", "==", uid)
      .where("published", "==", true)
      .orderBy("updatedAt", "desc")
  );

  console.log({ studies, loading, error });

  return (
    <Flex bg="#f8f9fa">
      <Sidebar />
      <Box ml="280px" w="100%" minH="100vh">
        <Page isLoading={!studies || error || loading}>
          <Switch>
            <Route exact path="/">
              <Dashboard studies={studies} loading={loading} />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard studies={studies} loading={loading} />
            </Route>
            <Route exact path="/study/:nctID">
              <ViewStudy studies={studies} />
            </Route>
            <Route exact path="/create" component={CreateStudy} />
            <Route exact path="/notifications" component={Notifications} />
            <Route exact path="/settings" component={Settings} />
            <Redirect to="/" />
          </Switch>
        </Page>
      </Box>
    </Flex>
  );
}

export default Internal;
