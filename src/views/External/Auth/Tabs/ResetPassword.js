import React from "react";

import { useAuthForm } from "hooks";
import { resetPassword } from "database";
import { Form, Heading, Password, Button, TabLink, Message } from "views/External/Auth/Blocks";

function ResetPassword({ setTab }) {
  const url = new URL(window.location.href);
  const actionCode = url.searchParams.get("oobCode");

  const { inputs, errors, success, loading, handleInput, handleSubmit } = useAuthForm({
    initial: { password: "" },
    onSubmit: resetPassword,
  });

  if (success) {
    return (
      <Message
        type="success"
        title="Password Reset!"
        description="You can now use your new password to log in"
      >
        <TabLink onClick={() => setTab("login")}> Back to login </TabLink>
      </Message>
    );
  }

  return (
    <Form onSubmit={() => handleSubmit(actionCode, inputs.password)}>
      <Heading>Reset Password</Heading>
      <Password value={inputs.password} error={errors.password} onChange={handleInput} />
      <Button loading={loading}>Confirm Reset Password</Button>
      <TabLink onClick={() => setTab("login")}>Back to login</TabLink>
    </Form>
  );
}

export default ResetPassword;
