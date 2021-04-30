import React from "react";

import { List } from "components";

import NotificationItem from "./NotificationItem";
import NotificationLoadMore from "./NotificationLoadMore";

function NotificationList({ notifications, fetchedAll, additionalLoading, handleFetchAdditional }) {
  return (
    <>
      <List borderWidth="1px" rounded="md" bg="white">
        {notifications.map((notification, i) => (
          <List.Row key={i}>
            <NotificationItem notification={notification} />
          </List.Row>
        ))}
      </List>
      <NotificationLoadMore
        fetchedAll={fetchedAll}
        additionalLoading={additionalLoading}
        handleFetchAdditional={handleFetchAdditional}
      />
    </>
  );
}

export default NotificationList;
