import React, { useEffect } from "react";

import { useAuthForm } from "hooks";
import { deleteAccount } from "database/auth";

import { Grid, Heading, Text, Button, useToast } from "@chakra-ui/react";
import { Form, Input } from "components";

import PasswordInput from "./PasswordInput";

function DeleteAccount() {
  const toast = useToast();

  const {
    inputs,
    errors,
    success,
    loading,
    handleChange,
    handleSubmit,
  } = useAuthForm({
    initial: { password: "", newPassword: "" },
    onSubmit: deleteAccount,
  });

  useEffect(() => {
    if (success) {
      toast({
        title: "Account Deleted",
        description:
          "Your account has been deleted along with all your user data and research studies.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }, [success]);

  return (
    <>
      <Grid gap="5px">
        <Heading size="md">Delete Account</Heading>
        <Text color="gray.500">
          Deleting your account is a permenant action which will delete all your
          user information and research studies
        </Text>
      </Grid>
      <Form onSubmit={() => handleSubmit(inputs.email, inputs.password)}>
        <Grid gap="15px">
          <Input
            name="email"
            label="Email"
            value={inputs.email}
            error={errors.email}
            onChange={handleChange}
          />
          <PasswordInput
            name="password"
            label="Password"
            value={inputs.password}
            error={errors.password}
            onChange={handleChange}
          />
          <Button type="submit" colorScheme="red" isLoading={loading}>
            Delete Account
          </Button>
        </Grid>
      </Form>
    </>
  );
}

export default DeleteAccount;
