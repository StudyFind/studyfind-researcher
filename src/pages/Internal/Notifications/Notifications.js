import { useEffect, useState } from "react";
import { mockPromiseResolve } from "mock";
import { notifications } from "data";
import { notification } from "data";

import { Button, Flex, Heading } from "@chakra-ui/react";
import { Link, Loader } from "components";

import NotificationsList from "./NotificationsList";
import NotificationsEmpty from "./NotificationsEmpty";
import NotificationsError from "./NotificationsError";
import { FaCog } from "react-icons/fa";

function Notifications() {
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [additionalLoading, setAdditionalLoading] = useState(false);

  const error = false;
  const fetchedAll = true;

  const handleFetchInitial = () => {
    mockPromiseResolve().then(() => {
      setNotifs(notifications);
      setLoading(false);
    });
  };

  const handleFetchAdditional = () => {
    setAdditionalLoading(true);
    mockPromiseResolve().then(() => {
      setNotifs((prev) => prev.concat(notification));
      setAdditionalLoading(false);
    });
  };

  useEffect(() => {
    handleFetchInitial();
  }, []);

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
          notifications={notifs}
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
