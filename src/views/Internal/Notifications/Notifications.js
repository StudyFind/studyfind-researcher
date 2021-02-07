import React from "react";

import { auth, firestore } from "database/firebase";
import { useCollection } from "hooks";

import { Heading, Box } from "@chakra-ui/react";
import { Spinner } from "components";
import Notification from "./Notification";

function Notifications() {
  const { uid } = auth.currentUser;
  const [notifications, loading, error] = useCollection(
    firestore
      .collection("researchers")
      .doc(uid)
      .collection("notifications")
      .orderBy("timestamp", "desc")
  );

  if (loading) return <Spinner />;
  if (error) return <div>Error :(</div>;

  return (
    <>
      <Heading size="lg" mb="25px">
        Notifications
      </Heading>
      <Box borderWidth="1px" rounded="md" bg="white">
        {notifications &&
          notifications.map((notification, index) => (
            <Notification key={index} notification={notification} />
          ))}
      </Box>
    </>
  );
}

export default Notifications;
