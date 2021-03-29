import React, { useEffect } from "react";

import { useAuthForm } from "hooks";
import { deleteAccount } from "database/auth";

import {
  AuthForm,
  AuthHeading,
  AuthEmail,
  AuthPassword,
  AuthButton,
} from "views/External/Auth/Blocks";
import { Box, useToast } from "@chakra-ui/react";

function ChangePassword() {
  const toast = useToast();

  const { inputs, errors, success, loading, handleChange, handleSubmit } = useAuthForm({
    initial: { email: "", password: "" },
    onSubmit: deleteAccount,
  });

  useEffect(() => {
    if (success) {
      toast({
        title: "Account Deleted",
        description:
          "Your account has been deleted along with all your user data and research studies.",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
    }
  }, [success]);

  return (
    <Box w="350px" bg="white" borderWidth="1px" borderColor="gray" rounded="md">
      <AuthForm onSubmit={() => handleSubmit(inputs.email, inputs.password)}>
        <AuthHeading color="red.500">Delete Account</AuthHeading>
        <AuthEmail value={inputs.email} error={errors.email} onChange={handleChange} />
        <AuthPassword value={inputs.password} error={errors.password} onChange={handleChange} />
        <AuthButton loading={loading} colorScheme="red">
          Confirm Delete Account
        </AuthButton>
      </AuthForm>
    </Box>
  );
}

export default ChangePassword;
