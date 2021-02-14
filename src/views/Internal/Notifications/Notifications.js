import React, { useState, useEffect } from "react";

import { auth, firestore } from "database/firebase";

import { Heading, Box, Button, Flex, Grid } from "@chakra-ui/react";
import { Loader, Message } from "components";
import Notification from "./Notification";

function Notifications() {
  const { uid } = auth.currentUser;
  const [notifications, setNotifications] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [fetchedAll, setFetchedAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleFetchAdditional = async () => {
    let lastDoc;
    if (documents.length && notifications.length) {
      lastDoc = documents[documents.length - 1];
    } else {
      lastDoc = "";
    }
    try {
      let snapshot;
      snapshot = await firestore
        .collection("researchers")
        .doc(uid)
        .collection("notifications")
        .orderBy("time", "desc")
        .startAfter(lastDoc)
        .limit(10)
        .get();

      const collections = [];
      const docs = [];
      snapshot.forEach((doc) => collections.push({ id: doc.id, ...doc.data() }));
      setNotifications((prev) => prev.concat(collections));
      snapshot.forEach((doc) => docs.push(doc));
      setDocuments((prev) => prev.concat(docs));
      if (collections.length < 10) {
        setFetchedAll(true);
      }
    } catch (e) {
      setError(e);
    }

    setLoading(false);
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

      {notifications && notifications.length ? (
        <Grid gap="20px">
          <Box borderWidth="1px" rounded="md" bg="white">
            {notifications.map((notification, index) => (
              <Notification key={index} notification={notification} />
            ))}
          </Box>
          <Flex justify="center" align="center">
            {fetchedAll ? (
              <></>
            ) : (
              <Button
                isLoading={loading}
                loadingText="Fetching notifications..."
                onClick={handleFetchAdditional}
              >
                Load more notifications
              </Button>
            )}
          </Flex>
        </Grid>
      ) : (
        <Box h="500px">
          <Message
            type="neutral"
            title="Nothing to show"
            description="You do not have any notifications right now"
          />
        </Box>
      )}
    </>
  );
}

export default Notifications;
