import React, { useState } from "react";

import lodash from "lodash";

import { firestore } from "database/firebase";

import { Flex, Grid, Heading, Text, Button, useToast } from "@chakra-ui/react";
import { Input, Textarea } from "components";

function Profile({ user }) {
  const original = {
    organization: user.organization || "",
    background: user.background || "",
  };

  const toast = useToast();
  const [inputs, setInputs] = useState(original);
  const [loading, setLoading] = useState(false);

  const isDifferent = !lodash.isEqual(original, inputs);

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setInputs(original);
  };

  const handleUpdate = () => {
    setLoading(true);

    firestore
      .collection("researchers")
      .doc(user.id)
      .update({
        organization: inputs.organization,
        background: inputs.background,
      })
      .then(() =>
        toast({
          title: "Your profile information was successfully updated!",
          status: "success",
          duration: 2500,
        })
      )
      .catch(() =>
        toast({
          title:
            "Your profile information could not be updated. Please try again later!",
          status: "error",
          duration: 2500,
        })
      )
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Grid gap="5px">
        <Heading size="md">Profile</Heading>
        <Text color="gray.500">
          The profile section contains information like your organization and
          background
        </Text>
      </Grid>
      <Grid gap="25px">
        <Input
          label="Organization"
          name="organization"
          value={inputs.organization}
          onChange={handleChange}
        />
        <Textarea
          label="Background"
          name="background"
          height="108px"
          value={inputs.background}
          onChange={handleChange}
        />
        {isDifferent && (
          <Flex gridGap="10px" justify="flex-end">
            <Button
              variant="outline"
              color="gray.500"
              onClick={handleCancel}
              isDisabled={loading}
            >
              Cancel
            </Button>
            <Button
              colorScheme="green"
              onClick={handleUpdate}
              isLoading={loading}
              loadingText="Save Changes"
            >
              Save Changes
            </Button>
          </Flex>
        )}
      </Grid>
    </>
  );
}

export default Profile;
