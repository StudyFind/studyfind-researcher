import React, { useEffect } from "react";

import { useAuthForm } from "hooks";
import { changePassword } from "database/auth";

import { AuthForm, AuthHeading, AuthPassword, AuthButton } from "views/External/Auth/Blocks";
import { Box, useToast } from "@chakra-ui/react";

function ChangePassword() {
  const toast = useToast();

  const { inputs, errors, success, loading, handleChange, handleSubmit } = useAuthForm({
    initial: { password: "", newPassword: "" },
    onSubmit: changePassword,
  });

  useEffect(() => {
    if (success) {
      toast({
        title: "Password Changed!",
        description: "You can now use your new password to log in",
        status: "success",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
    }
  }, [success]);

  return (
    <Box w="350px" bg="white" borderWidth="1px" rounded="md">
      <AuthForm onSubmit={() => handleSubmit(inputs.password, inputs.newPassword)}>
        <AuthHeading>Change Password</AuthHeading>
        <AuthPassword
          value={inputs.password}
          placeholder="Old Password"
          error={errors.password}
          onChange={handleChange}
        />
        <AuthPassword
          name="newPassword"
          placeholder="New Password"
          value={inputs.newPassword}
          error={errors.newPassword}
          onChange={handleChange}
        />
        <AuthButton loading={loading}>Confirm Change Password</AuthButton>
      </AuthForm>
    </Box>
  );
}

export default ChangePassword;
