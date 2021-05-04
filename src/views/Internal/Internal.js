import React, { useState } from "react";

import { auth, firestore } from "database/firebase";
import { useDocument, useCollection, useTimezone, useNotificationToast } from "hooks";
import { UserContext, StudiesContext, ConfirmContext } from "context";

import { Switch, Route, Redirect } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { Page } from "components";

import Confirm from "./Confirm";
import Sidebar from "./Sidebar";
import Verification from "views/Internal/Verification/Verification";
import Welcome from "views/Internal/Welcome/Welcome";
import Dashboard from "views/Internal/Dashboard/Dashboard";
import FetchStudy from "views/Internal/Study/FetchStudy/FetchStudy";
import CreateStudy from "views/Internal/Study/CreateStudy/CreateStudy";
import ViewStudy from "views/Internal/Study/ViewStudy/ViewStudy";
import Notifications from "views/Internal/Notifications/Notifications";
import Schedule from "views/Internal/Schedule/Schedule";
import Account from "views/Internal/Account/Account";
import Feedback from "views/Internal/Feedback/Feedback";

function Internal() {
  const { uid, email, emailVerified } = auth.currentUser;

  const userRef = firestore.collection("researchers").doc(uid);
  const studiesRef = firestore
    .collection("studies")
    .where("researcher.id", "==", uid)
    .orderBy("updatedAt", "desc");

  const [user] = useDocument(userRef);
  const [studies] = useCollection(studiesRef);

  useTimezone(user);
  useNotificationToast();

  const [confirm, setConfirm] = useState(null);

  const handleClose = () => {
    setConfirm(null);
  };

  return (
    <Flex>
      <UserContext.Provider value={user}>
        <StudiesContext.Provider value={studies}>
          <ConfirmContext.Provider value={setConfirm}>
            <Sidebar name={user && user.name} email={email} />
            <Box
              ml="280px"
              w="100%"
              minH={emailVerified ? "100vh" : "calc(100vh - 56px)"}
              mt={emailVerified ? "" : "40px"}
            >
              {emailVerified || <Verification email={email} />}
              {confirm && <Confirm {...confirm} handleClose={handleClose} />}
              <Page isLoading={!(user && studies)}>
                <Switch>
                  <Route exact path="/" component={Dashboard} />
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/welcome" component={Welcome} />
                  <Route path="/fetch" component={FetchStudy} />
                  <Route path="/create/:studyID/:tab" component={CreateStudy} />
                  <Route
                    path="/study/:studyID/:tab/:action?/:participantID?"
                    component={ViewStudy}
                  />
                  <Route path="/notifications" component={Notifications} />
                  <Route path="/schedule" component={Schedule} />
                  <Route path="/account/:tab" component={Account} />
                  <Route path="/feedback" component={Feedback} />
                  <Redirect to="/" />
                </Switch>
              </Page>
            </Box>
          </ConfirmContext.Provider>
        </StudiesContext.Provider>
      </UserContext.Provider>
    </Flex>
  );
}

export default Internal;
