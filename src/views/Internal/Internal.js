import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { Page } from "components";

import { auth, firestore } from "database/firebase";
import { useDocument, useCollection } from "hooks";

import Sidebar from "./Sidebar";

import FetchStudy from "views/Internal/Study/FetchStudy/FetchStudy";
import CreateStudy from "views/Internal/Study/CreateStudy/CreateStudy";
import Settings from "views/Internal/Settings/Settings";
import Dashboard from "views/Internal/Dashboard/Dashboard";
import ViewStudy from "views/Internal/Study/ViewStudy/ViewStudy";
import Notifications from "views/Internal/Notifications/Notifications";
import Welcome from "views/Internal/Welcome/Welcome";

function Internal() {
  const { uid } = auth.currentUser;

  const [user] = useDocument(firestore.collection("researchers").doc(uid));
  const [studies] = useCollection(
    firestore
      .collection("studies")
      .where("researcher.id", "==", uid)
      .where("published", "==", true)
      .orderBy("updatedAt", "desc")
  );

  const pages = [
    { path: "/", component: <Dashboard studies={studies} /> },
    { path: "/dashboard", component: <Dashboard studies={studies} /> },
    { path: "/welcome", component: <Welcome studies={studies} /> },
    { path: "/fetch", component: <FetchStudy /> },
    { path: "/create/:nctID/:tab", component: <CreateStudy studies={studies} /> },
    { path: "/study/:nctID", component: <ViewStudy studies={studies} /> },
    { path: "/notifications", component: <Notifications studies={studies} /> },
    { path: "/settings", component: <Settings studies={studies} /> },
  ];

  return (
    <Flex>
      <Sidebar user={user} />
      <Box ml="280px" w="100%" minH="100vh">
        <Page isLoading={!studies}>
          <Switch>
            {pages.map(({ path, component }, index) => (
              <Route exact path={path} key={index}>
                {component}
              </Route>
            ))}
            <Redirect to="/" />
          </Switch>
        </Page>
      </Box>
    </Flex>
  );
}

export default Internal;
