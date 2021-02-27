import React, { useState } from "react";
import lodash from "lodash";
import moment from "moment-timezone";

import { signout } from "database/auth";
import { auth, firestore } from "database/firebase";

import { Heading, Button, Grid, Flex } from "@chakra-ui/react";
import { Input, Textarea, Select } from "components";
import { FaDoorOpen } from "react-icons/fa";

function Account({ user }) {
  const { uid } = auth.currentUser;

  const original = {
    timezone: user.timezone || "",
    bio: user.bio || "",
    organization: user.organization || "",
  };

  const [inputs, setInputs] = useState(original);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
    if (name === "timezone") setErrors({ timezone: !value });
  };

  const handleCancel = () => {
    setInputs(original);
  };

  const handleUpdate = () => {
    firestore.collection("researchers").doc(uid).update({
      timezone: inputs.timezone,
      organization: inputs.organization,
      bio: inputs.bio,
    });
  };

  return (
    <>
      <Flex justify="space-between" align="center" mb="25px">
        <Heading size="lg">Account</Heading>
        <Button colorScheme="red" onClick={signout} leftIcon={<FaDoorOpen />}>
          Sign out
        </Button>
      </Flex>
      <hr />

      <Grid gap="25px" p="25px 0" w="400px">
        <Select
          label="Timezone"
          name="timezone"
          value={inputs.timezone}
          error={errors.timezone}
          options={moment.tz.zonesForCountry("US")}
          onChange={handleChange}
        />
        <Input
          label="Organization"
          name="organization"
          value={inputs.organization}
          onChange={handleChange}
        />
        <Textarea
          label="Bio"
          name="bio"
          value={inputs.bio}
          onChange={handleChange}
          height="108px"
        />
        {!lodash.isEqual(original, inputs) && (
          <Flex gridGap="10px" justify="flex-end">
            <Button color="gray.500" onClick={handleCancel}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleUpdate}>
              Save Changes
            </Button>
          </Flex>
        )}
      </Grid>
    </>
  );
}

export default Account;
