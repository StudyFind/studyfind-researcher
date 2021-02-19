import React, { useState } from "react";
import lodash from "lodash";

import { signout } from "database/auth";
import { auth, firestore } from "database/firebase";

import { Heading, Button, Grid, Flex } from "@chakra-ui/react";
import { Input, Textarea } from "components";
import { FaDoorOpen } from "react-icons/fa";

function Account({ user }) {
  const { uid, email } = auth.currentUser;

  const original = {
    bio: user.bio || "",
    organization: user.organization || "",
  };

  const [inputs, setInputs] = useState(original);

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };

  const handleCancel = () => {
    setInputs(original);
  };

  const handleUpdate = () => {
    firestore.collection("researchers").doc(uid).update({
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

      <Grid gap="20px" p="20px 0" w="400px">
        <Input label="Email" value={email} disabled />
        <Input label="Name" value={user.name} disabled />
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
