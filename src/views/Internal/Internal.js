import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Box, Flex } from "components";

import { useFirestoreDocument, useFirestoreCollection } from "hooks";
import { auth, firestore } from "database/firebase";

import Sidebar from "./Sidebar";

import Welcome from "views/Internal/Welcome/Welcome";
import Dashboard from "views/Internal/Dashboard/Dashboard";
import Notifications from "./Notifications/Notifications";
import Account from "views/Internal/Account/Account";
import Settings from "views/Internal/Settings/Settings";

import CreateStudy from "views/Internal/Study/CreateStudy/CreateStudy";
import ViewStudy from "views/Internal/Study/ViewStudy/ViewStudy";

function Internal() {
  const [user] = useFirestoreDocument(
    firestore.collection("researchers").doc(auth.currentUser.uid)
  );

  const [studies] = useFirestoreCollection(
    firestore
      .collection("studies")
      .where("researcher.id", "==", auth.currentUser.uid)
      .orderBy("updatedAt", "desc")
  );

  if (user && studies) {
    console.log(user);
    console.log(studies);
  }

  return (
    <Flex bg="#f8f9fa">
      <Sidebar />
      <Box ml="280px" w="100%" minH="100vh">
        <Switch>
          <Route exact path="/">
            <Dashboard studies={studies} />
          </Route>

          <Route exact path="/dashboard">
            <Dashboard studies={studies} />
          </Route>

          <Route exact path="/welcome">
            <Welcome studies={studies} />
          </Route>

          <Route exact path="/study/:nctID">
            <ViewStudy studies={studies} />
          </Route>

          <Route exact path="/create">
            <CreateStudy studies={studies} />
          </Route>

          <Route exact path="/notifications">
            <Notifications />
          </Route>

          <Route exact path="/settings">
            <Settings />
          </Route>

          <Route exact path="/account">
            <Account user={user} />
          </Route>

          <Redirect to="/" />
        </Switch>
      </Box>
    </Flex>
  );
}

export default Internal;
