import { Grid } from "@chakra-ui/react";

import AccountHeader from "../AccountHeader";
import Categories from "./Categories";
import Methods from "./Methods";

function Notifications({ inputs, handleNotifications, handleCategories }) {
  return (
    <Grid gap="20px">
      <AccountHeader
        title="Notification"
        description="The notification section allows you to change what notifications you want to see and where you want to receive them"
      />
      <Grid gap="20px">
        <Categories
          categories={inputs.notifications.categories}
          handleCategories={handleCategories}
        />
        <Methods notifications={inputs.notifications} handleNotifications={handleNotifications} />
      </Grid>
    </Grid>
  );
}

export default Notifications;
