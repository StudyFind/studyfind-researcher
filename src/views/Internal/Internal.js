import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { Page } from "components";

import { auth, firestore } from "database/firebase";
import { useDocument, useCollection } from "hooks";

import Sidebar from "./Sidebar";
import Verification from "./Verification/Verification";

import Welcome from "views/Internal/Welcome/Welcome";
import Dashboard from "views/Internal/Dashboard/Dashboard";
import FetchStudy from "views/Internal/Study/FetchStudy/FetchStudy";
import CreateStudy from "views/Internal/Study/CreateStudy/CreateStudy";
import ViewStudy from "views/Internal/Study/ViewStudy/ViewStudy";
import Notifications from "views/Internal/Notifications/Notifications";
import Schedule from "views/Internal/Schedule/Schedule";
import Account from "views/Internal/Account/Account";
import Feedback from "views/Internal/Feedback/Feedback";

import { UserContext, StudiesContext } from "context";

function Internal() {
  const { uid, email, emailVerified } = auth.currentUser;

  const [user] = useDocument(firestore.collection("researchers").doc(uid));
  const [studies] = useCollection(
    firestore
      .collection("studies")
      .where("researcher.id", "==", uid)
      .orderBy("updatedAt", "desc")
  );

  const pages = [
    { path: "/", component: <Dashboard /> },
    { path: "/dashboard", component: <Dashboard /> },
    { path: "/welcome", component: <Welcome /> },
    { path: "/fetch", component: <FetchStudy /> },
    { path: "/create/:nctID/:tab", component: <CreateStudy /> },
    { path: "/study/:nctID", component: <ViewStudy /> },
    { path: "/notifications", component: <Notifications /> },
    { path: "/schedule", component: <Schedule /> },
    { path: "/account", component: <Account /> },
    { path: "/feedback", component: <Feedback /> },
  ];

  return (
    <Flex>
      <UserContext.Provider value={user}>
        <StudiesContext.Provider value={studies}>
          <Sidebar user={user} />
          <Box
            ml="280px"
            w="100%"
            minH={emailVerified ? "100vh" : "calc(100vh - 56px)"}
            mt={emailVerified ? "" : "40px"}
          >
            {emailVerified || <Verification email={email} />}
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
        </StudiesContext.Provider>
      </UserContext.Provider>
    </Flex>
  );
}

export default Internal;
