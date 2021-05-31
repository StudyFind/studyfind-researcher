import React from "react";

import { List, ListRow } from "components";

import NotificationItem from "./NotificationItem";
import NotificationLoadMore from "./NotificationLoadMore";

function NotificationList({ notifications, fetchedAll, additionalLoading, handleFetchAdditional }) {
  return (
    <>
      <List borderWidth="1px" rounded="md" bg="white">
        {notifications.map((notification) => (
          <ListRow key={notification.id}>
            <NotificationItem notification={notification} />
          </ListRow>
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
