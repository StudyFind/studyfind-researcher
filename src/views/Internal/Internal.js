import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { Page } from "components";

import { auth, firestore } from "database/firebase";
import { useDocument, useCollection } from "hooks";

import Sidebar from "./Sidebar";
import Verification from "./Verification/Verification";

import FetchStudy from "views/Internal/Study/FetchStudy/FetchStudy";
import CreateStudy from "views/Internal/Study/CreateStudy/CreateStudy";
import Settings from "views/Internal/Settings/Settings";
import Dashboard from "views/Internal/Dashboard/Dashboard";
import ViewStudy from "views/Internal/Study/ViewStudy/ViewStudy";
import Notifications from "views/Internal/Notifications/Notifications";
import Schedule from "views/Internal/Schedule/Schedule";
import Welcome from "views/Internal/Welcome/Welcome";
import Account from "views/Internal/Account/Account";
import Feedback from "views/Internal/Feedback/Feedback";

function Internal() {
  const cred = auth.currentUser;

  const [user] = useDocument(firestore.collection("researchers").doc(user.uid));
  const [studies] = useCollection(
    firestore
      .collection("studies")
      .where("researcher.id", "==", user.uid)
      .orderBy("updatedAt", "desc")
  );

  const pages = [
    { path: "/", component: <Dashboard studies={studies} /> },
    { path: "/dashboard", component: <Dashboard studies={studies} /> },
    { path: "/welcome", component: <Welcome studies={studies} /> },
    { path: "/fetch", component: <FetchStudy /> },
    { path: "/create/:nctID/:tab", component: <CreateStudy studies={studies} /> },
    { path: "/study/:nctID", component: <ViewStudy studies={studies} /> },
    { path: "/notifications", component: <Notifications user={user} /> },
    { path: "/schedule", component: <Schedule studies={studies} /> },
    { path: "/settings", component: <Settings /> },
    { path: "/account", component: <Account user={user} /> },
    { path: "/feedback", component: <Feedback /> },
  ];

  return (
    <Flex>
      <Sidebar cred={cred} user={user} />
      <Box
        ml="280px"
        w="100%"
        minH={cred.emailVerified ? "100vh" : "calc(100vh - 56px)"}
        mt={cred.emailVerified ? "" : "40px"}
      >
        {cred.emailVerified || <Verification email={cred.email} />}
        <Page isLoading={!(user && studies)}>
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
