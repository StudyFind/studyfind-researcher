import { useState } from "react";

import { auth, firestore } from "database/firebase";
import { useDocument, useCollection, useDetectTimezone } from "hooks";
import { UserContext, StudiesContext, ConfirmContext } from "context";

import { Switch, Route, Redirect } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { Page } from "@studyfind/components";

import Confirm from "./Confirm";
import Sidebar from "./Sidebar";
import Verification from "views/Internal/Verification/Verification";
import Dashboard from "views/Internal/Dashboard/Dashboard";
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
  const [confirm, setConfirm] = useState(null);

  useDetectTimezone(user);

  return (
    <Flex>
      <UserContext.Provider value={user}>
        <StudiesContext.Provider value={studies}>
          <ConfirmContext.Provider value={setConfirm}>
            <Sidebar name={user?.name} email={email} />
            <Box
              ml="280px"
              w="100%"
              minH={emailVerified ? "100vh" : "calc(100vh - 56px)"}
              mt={emailVerified ? "" : "40px"}
            >
              {emailVerified || <Verification />}
              {confirm && <Confirm {...confirm} handleClose={() => setConfirm(null)} />}
              <Page isLoading={!(user && studies)}>
                <Switch>
                  <Route exact path="/" component={Dashboard} />
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/create/:studyID?" component={CreateStudy} />
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
