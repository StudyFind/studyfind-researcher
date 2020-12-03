import React from "react";
import styled from "styled-components";

import { useAuthForm } from "hooks";
import { changePassword } from "database";
import { Form, Heading, Password, Button, Message } from "views/External/Auth/Blocks";
import { Box } from "components";

function ChangePassword() {
  const { inputs, errors, success, loading, handleInput, handleSubmit } = useAuthForm({
    initial: { password: "", newPassword: "" },
    onSubmit: changePassword,
  });

  if (success) {
    return (
      <Message
        type="success"
        title="Password Changed!"
        description="You can now use your new password to log in"
      />
    );
  }

  return (
    <Box w="350px" bg="#f8f9fa" borderWidth="1px" borderColor="gray" rounded="md">
      <Form onSubmit={() => handleSubmit(inputs.password, inputs.newPassword)}>
        <Heading>Change Password</Heading>
        <Password
          value={inputs.password}
          placeholder="Old Password"
          error={errors.password}
          onChange={handleInput}
        />
        <Password
          name="newPassword"
          placeholder="New Password"
          value={inputs.newPassword}
          error={errors.newPassword}
          onChange={handleInput}
        />
        <Button loading={loading}>Confirm Change Password</Button>
      </Form>
    </Box>
  );
}

export default ChangePassword;
