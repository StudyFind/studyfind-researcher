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
  const notificationsRef = firestore
    .collection("researchers")
    .doc(uid)
    .collection("notifications")
    .orderBy("time", "desc");

  const {
    documents: notifications,
    loading,
    loadingMore,
    handleLoadMore,
    fetchedAll,
    error,
  } = usePagination(notificationsRef, 10);

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
          loadingMore={loadingMore}
          handleLoadMore={handleLoadMore}
        />
      ) : (
        <NotificationsEmpty />
      )}
    </>
  );
}

export default Notifications;
