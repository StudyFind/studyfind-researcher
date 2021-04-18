import React from "react";

import { useRealtimePagination } from "hooks";

import { auth, firestore } from "database/firebase";

import { Heading, Box, Text, Button, Flex } from "@chakra-ui/react";
import { Loader, Message, List } from "components";
import Notification from "./Notification";

function Notifications() {
  const { uid } = auth.currentUser;

  const NOTIFICATIONS_PER_REQUEST = 10;
  const notificationsRef = firestore
    .collection("researchers")
    .doc(uid)
    .collection("notifications")
    .orderBy("time", "desc");

  const [
    notifications,
    loading,
    error,
    handleFetchAdditional,
    additionalLoading,
    fetchedAll,
  ] = useRealtimePagination(notificationsRef, NOTIFICATIONS_PER_REQUEST);

  if (loading) return <Loader />;
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
                  onClick={handleFetchAdditional}
                  isLoading={additionalLoading}
                  variant="outline"
                  color="gray.500"
                  bg="white"
                  size="sm"
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
