import { Grid } from "@chakra-ui/react";
import { TextInput, TextareaInput } from "components";

import AccountHeader from "../AccountHeader";

function ProfileResearcher({ inputs, handleSetProfileAttribute }) {
  return (
    <>
      <AccountHeader
        title="Profile"
        description="The profile section contains personal information like your organization and background"
      />
      <Grid gap="25px">
        <TextInput
          label="Organization"
          name="organization"
          value={inputs.organization}
          onChange={handleSetProfileAttribute}
        />
        <TextareaInput
          label="Background"
          name="background"
          height="108px"
          value={inputs.background}
          onChange={handleSetProfileAttribute}
        />
      </Grid>
    </>
  );
}

export default ProfileResearcher;
