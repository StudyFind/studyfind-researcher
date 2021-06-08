import { Grid } from "@chakra-ui/react";

import AccountSubHeader from "../AccountSubHeader";
import AccountToggle from "../AccountToggle";

function Categories({ categories, handleCategories }) {
  return (
    <Grid gap="8px">
      <AccountSubHeader
        subtitle="Categories"
        subdescription="Notification categories you care about"
      />
      <Grid gap="4px">
        <AccountToggle
          label="Account"
          name="account"
          value={categories?.account}
          onChange={handleCategories}
        />
        <AccountToggle
          label="Studies"
          name="studies"
          value={categories?.studies}
          onChange={handleCategories}
        />
        <AccountToggle
          label="Participants"
          name="participants"
          value={categories?.participants}
          onChange={handleCategories}
        />
        <AccountToggle
          label="Meetings"
          name="meetings"
          value={categories?.meetings}
          onChange={handleCategories}
        />
        <AccountToggle
          label="Messages"
          name="messages"
          value={categories?.messages}
          onChange={handleCategories}
        />
      </Grid>
    </Grid>
  );
}

export default Categories;
