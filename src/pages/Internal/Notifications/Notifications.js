import { Button, Flex, Heading } from "@chakra-ui/react";
import { Link, Loader } from "components";

import NotificationsList from "./NotificationsList";
import NotificationsEmpty from "./NotificationsEmpty";
import NotificationsError from "./NotificationsError";
import { FaCog } from "react-icons/fa";
import { usePagination } from "hooks";
import { auth, firestore } from "database/firebase";

function Notifications() {
  const { uid } = auth.currentUser;

  const NOTIFICATIONS_PER_REQUEST = 10;
  const notificationsRef = firestore
    .collection("researchers")
    .doc(uid)
    .collection("notifications")
    .orderBy("time", "desc");

  const [notifications, loading, error, handleFetchAdditional, additionalLoading, fetchedAll] =
    usePagination(notificationsRef, NOTIFICATIONS_PER_REQUEST);

  if (loading) return <Loader />;
  if (error) return <NotificationsError />;

  return (
    <>
      <Flex justify="space-between" align="center" mb="25px">
        <Heading size="lg">Notifications</Heading>
        <Link to="/account/notifications" isWrapper>
          <Button leftIcon={<FaCog />}>Change Preferences</Button>
        </Link>
      </Flex>
      {notifications.length ? (
        <NotificationsList
          notifications={notifications}
          fetchedAll={fetchedAll}
          additionalLoading={additionalLoading}
          handleFetchAdditional={handleFetchAdditional}
        />
      ) : (
        <NotificationsEmpty />
      )}
    </>
  );
}

export default Notifications;
