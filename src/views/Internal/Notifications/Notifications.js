import React, { useState, useEffect } from "react";

import { auth, firestore } from "database/firebase";

import { Heading, Box, Text, Button, Flex } from "@chakra-ui/react";
import { Loader, Message, List } from "components";
import Notification from "./Notification";

function Notifications() {
  const { uid } = auth.currentUser;
  const [notifications, setNotifications] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [fetchedAll, setFetchedAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");

  const handleFetchAdditional = async () => {
    const NOTIFICATIONS_PER_REQUEST = 10;

    const lastDoc =
      documents.length && notifications.length
        ? documents[documents.length - 1]
        : "";

    setLoading(true);

    try {
      const snapshot = await firestore
        .collection("researchers")
        .doc(uid)
        .collection("notifications")
        .orderBy("time", "desc")
        .startAfter(lastDoc)
        .limit(NOTIFICATIONS_PER_REQUEST)
        .get();

      const collections = [];
      const docs = [];

      snapshot.forEach((doc) => {
        docs.push(doc);
        collections.push({ id: doc.id, ...doc.data() });
      });

      setNotifications((prev) => prev.concat(collections));
      setDocuments((prev) => prev.concat(docs));

      if (docs.length < NOTIFICATIONS_PER_REQUEST) {
        setFetchedAll(true);
      }
    } catch (e) {
      setError(e);
    }

    setLoading(false);
    setInitialLoading(false);
  };

  useEffect(() => {
    handleFetchAdditional();
  }, []);

  if (initialLoading) return <Loader />;
  if (error) return <div>Error :(</div>;

  return (
    <>
      <Heading size="lg" mb="25px">
        Notifications
      </Heading>
      <Box>
        {notifications && notifications.length ? (
          <Box>
            <List borderWidth="1px" rounded="md" bg="white">
              {notifications.map((notification, index) => (
                <List.Row key={index}>
                  <Notification notification={notification} />
                </List.Row>
              ))}
            </List>
            <Flex p="20px" justify="center">
              {fetchedAll ? (
                <Text color="gray.400">Showing all notifications</Text>
              ) : (
                <Button
                  size="sm"
                  isLoading={loading}
                  loadingText="Loading..."
                  onClick={handleFetchAdditional}
                >
                  Load more
                </Button>
              )}
            </Flex>
          </Box>
        ) : (
          <Box h="500px" borderWidth="1px" rounded="md" bg="white">
            <Message
              title="Nothing to show"
              description="You do not have any notifications right now"
            />
          </Box>
        )}
      </Box>
    </>
  );
}

export default Notifications;
