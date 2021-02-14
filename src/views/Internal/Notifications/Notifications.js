import React, { useState, useEffect } from "react";

import { auth, firestore } from "database/firebase";

import { Heading, Box, Button } from "@chakra-ui/react";
import { Loader, Message } from "components";
import Notification from "./Notification";

function Notifications() {
  const { uid } = auth.currentUser;
  const [notifications, setNotifications] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [fetchedAll, setFetchedAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleFetchAdditional = async () => {
    if (documents.length && notifications.length) {
      console.log("Fetched additional round of notifications");
      console.log(documents);
      try {
        const lastDoc = documents[documents.length - 1];
        const snapshot = await firestore
          .collection("researchers")
          .doc(uid)
          .collection("notifications")
          .orderBy("time", "desc")
          .startAfter(lastDoc)
          .limit(1)
          .get();

        const collections = [];
        const docs = [];
        snapshot.forEach((doc) => collections.push({ id: doc.id, ...doc.data() }));
        setNotifications((prev) => prev.concat(collections));
        snapshot.forEach((doc) => docs.push(doc));
        setDocuments((prev) => prev.concat(docs));
      } catch (e) {
        console.log(e);
        setError(e);
      }
    } else {
      console.log("Fetched first round of notifications");
      try {
        setLoading(true);
        const snapshot = await firestore
          .collection("researchers")
          .doc(uid)
          .collection("notifications")
          .orderBy("time", "desc")
          .limit(1)
          .get();

        const collections = [];
        const docs = [];
        snapshot.forEach((doc) => collections.push({ id: doc.id, ...doc.data() }));
        setNotifications(collections);
        snapshot.forEach((doc) => docs.push(doc));
        setDocuments(docs);
      } catch (e) {
        console.log(e);
        setError(e);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchAdditional();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div>Error :(</div>;

  return (
    <>
      <Heading size="lg" mb="25px">
        Notifications
      </Heading>
      <Box borderWidth="1px" rounded="md" bg="white">
        {notifications && notifications.length ? (
          notifications.map((notification, index) => (
            <Notification key={index} notification={notification} />
          ))
        ) : (
          <Box h="500px">
            <Message
              type="neutral"
              title="Nothing to show"
              description="You do not have any notifications right now"
            />
          </Box>
        )}
      </Box>
      <Button
        isLoading={loading}
        loadingText="Fetching notifications..."
        onClick={handleFetchAdditional}
      >
        Load more notifications
      </Button>
    </>
  );
}

export default Notifications;
