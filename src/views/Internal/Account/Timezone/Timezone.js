import React, { useState } from "react";

import lodash from "lodash";
import moment from "moment-timezone";

import { firestore } from "database/firebase";

import {
  Flex,
  Grid,
  Heading,
  Text,
  Button,
  Checkbox,
  useToast,
} from "@chakra-ui/react";

import { Select } from "components";

function Timezone({ user }) {
  const original = {
    timezone: user.timezone || "",
    preference: user.preferences?.autodetectTimezone || false,
  };

  const toast = useToast();
  const [inputs, setInputs] = useState(original);
  const [loading, setLoading] = useState(false);

  const isDifferent = !lodash.isEqual(original, inputs);

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setInputs((prev) => ({ ...prev, [name]: checked }));
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
        timezone: inputs.timezone,
        preferences: { autodetectTimezone: inputs.preference },
      })
      .then(() =>
        toast({
          title: "Your timezone information was successfully updated!",
          status: "success",
          duration: 2500,
        })
      )
      .catch(() =>
        toast({
          title:
            "Your timezone information could not be updated. Please try again later!",
          status: "error",
          duration: 2500,
        })
      )
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Grid gap="5px">
        <Heading size="md">Timezone</Heading>
        <Text color="gray.500">
          We use the selected timezone to display meeting times and
          notifications
        </Text>
      </Grid>
      <Grid gap="25px">
        <Checkbox
          mt="1px"
          size="md"
          name="preference"
          isChecked={inputs.preference}
          onChange={handleToggle}
          alignItems="flex-start"
        >
          <Grid gap="2px">
            <Heading size="sm" mt="-1px">
              Auto Detect Timezone
            </Heading>
            <Text fontSize="sm">
              Automatically detects and updates your local timezone each time
              you use StudyFind
            </Text>
          </Grid>
        </Checkbox>
        <Select
          label="Timezone Location"
          name="timezone"
          options={moment.tz.zonesForCountry("US")}
          value={inputs.timezone}
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

export default Timezone;
