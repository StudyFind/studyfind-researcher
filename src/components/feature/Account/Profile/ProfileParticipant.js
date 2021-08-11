import { Grid } from "@chakra-ui/react";
import { RadioInput, TextInput, TextareaInput } from "components";

import AccountHeader from "../AccountHeader";

function ProfileParticipant({ inputs, handleSetProfileAttribute }) {
  return (
    <>
      <AccountHeader
        title="Profile"
        description="The profile section contains personal information like your sex, birthdate, and availability"
      />
      <Grid gap="25px">
        <RadioInput
          label="Biological Sex"
          name="sex"
          value={inputs.sex}
          options={[
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
          ]}
          onChange={handleSetProfileAttribute}
          allowUnselect
        />
        <TextInput
          type="date"
          name="birthdate"
          label="Birthdate"
          value={inputs.birthdate}
          onChange={handleSetProfileAttribute}
        />
        <TextareaInput
          label="Availability"
          name="availability"
          limit={500}
          height="100px"
          value={inputs.availability}
          onChange={handleSetProfileAttribute}
          placeholder="Put a little something about your weekly availability"
        />
      </Grid>
    </>
  );
}

export default ProfileParticipant;
