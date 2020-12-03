import React from "react";

import { useAuthForm } from "hooks";
import { sendPasswordResetEmail } from "database";
import { Form, Heading, Email, Button, TabLink, Message } from "views/External/Auth/Blocks";

function ForgotPassword({ setTab }) {
  const { inputs, errors, success, loading, handleInput, handleSubmit } = useAuthForm({
    initial: { email: "" },
    onSubmit: sendPasswordResetEmail,
  });

  if (success) {
    return (
      <Message type="success" title="Email Sent!">
        Check your email for a password reset link
        <div>
          <Button onClick={() => setTab("login")}> Back to login </Button>
        </div>
      </Message>
    );
  }

  return (
    <Form onSubmit={() => handleSubmit(inputs.email)}>
      <Heading>Forgot Password</Heading>
      <Email value={inputs.email} error={errors.email} onChange={handleInput} />
      <Button loading={loading}>Request Password Reset Email</Button>
      <TabLink onClick={() => setTab("login")}>Back to login</TabLink>
    </Form>
  );
}

export default ForgotPassword;
