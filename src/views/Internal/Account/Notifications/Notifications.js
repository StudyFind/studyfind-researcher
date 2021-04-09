import React, { useState } from "react";

import lodash from "lodash";

import { auth, firestore } from "database/firebase";

import {
  Flex,
  Grid,
  Heading,
  Text,
  Switch,
  Checkbox,
  Button,
  useToast,
} from "@chakra-ui/react";

function Notifications({ user }) {
  const original = {
    email: user.notifications.email,
    ...user.notifications.categories,
  };

  const toast = useToast();
  const [inputs, setInputs] = useState(original);
  const [loading, setLoading] = useState(false);

  const isDifferent = !lodash.isEqual(original, inputs);

  const handleChange = (e) => {
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
        notifications: {
          categories: {
            account: inputs.account,
            studies: inputs.studies,
            participants: inputs.participants,
            meetings: inputs.meetings,
          },
          email: inputs.email,
        },
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

  const { email } = auth.currentUser;

  return (
    <>
      <Grid gap="10px">
        <Grid gap="5px">
          <Heading size="md">Notifications</Heading>
          <Text color="gray.500">
            Select what notifications you would like to see and where you
            recieve them
          </Text>
        </Grid>
        <Grid gap="4px">
          <Flex align="center" gridGap="8px">
            <Switch
              name="account"
              isChecked={inputs.account}
              onChange={handleChange}
            />
            <Text>Account</Text>
          </Flex>
          <Flex align="center" gridGap="8px">
            <Switch
              name="studies"
              isChecked={inputs.studies}
              onChange={handleChange}
            />
            <Text>Studies</Text>
          </Flex>
          <Flex align="center" gridGap="8px">
            <Switch
              name="participants"
              isChecked={inputs.participants}
              onChange={handleChange}
            />
            <Text>Participants</Text>
          </Flex>
          <Flex align="center" gridGap="8px">
            <Switch
              name="meetings"
              isChecked={inputs.meetings}
              onChange={handleChange}
            />
            <Text>Meetings</Text>
          </Flex>
        </Grid>
      </Grid>
      <Checkbox
        mt="1px"
        size="md"
        alignItems="flex-start"
        name="email"
        isChecked={inputs.email}
        onChange={handleChange}
      >
        <Grid gap="2px">
          <Heading size="sm" mt="-1px">
            Receive Email Notifications
          </Heading>
          <Text fontSize="sm">
            Sends notifications to your inbox at {email}
          </Text>
        </Grid>
      </Checkbox>
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
    </>
  );
}

export default Notifications;
