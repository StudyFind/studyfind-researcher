import { Grid } from "@chakra-ui/react";
import { TextInput, TextareaInput } from "@studyfind/components";

import AccountHeader from "../AccountHeader";

function Profile({ inputs, handleChange }) {
  return (
    <>
      <AccountHeader
        title="Profile"
        description="The profile section contains information like your organization and background"
      />
      <Grid gap="25px">
        <TextInput
          label="Organization"
          name="organization"
          value={inputs.organization}
          onChange={handleChange}
        />
        <TextareaInput
          label="Background"
          name="background"
          height="108px"
          value={inputs.background}
          onChange={handleChange}
        />
      </Grid>
    </>
  );
}

export default Profile;
