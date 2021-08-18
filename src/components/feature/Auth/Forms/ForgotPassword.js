import { useContext } from "react";
import { useAuth } from "hooks";

import AuthContext from "context/AuthContext";

import { Message, EmailInput } from "components";
import {
  AuthForm,
  AuthHeading,
  AuthInput,
  AuthButton,
  AuthTabLink,
} from "components/feature/Auth/Blocks";

function ForgotPassword({ setTab }) {
  const { handleForgotPassword } = useContext(AuthContext);

  const { values, errors, loading, success, handleChange, handleSubmit } = useAuth(
    {
      email: "",
    },
    handleForgotPassword
  );

  if (success) {
    return (
      <Message
        status="success"
        title="Email Sent!"
        description="Check your email for a password reset link"
        padding="40px 60px"
      >
        <AuthTabLink onClick={() => setTab("login")}>Back to login</AuthTabLink>
      </Message>
    );
  }

  return (
    <AuthForm onSubmit={handleSubmit}>
      <AuthHeading>Forgot Password</AuthHeading>
      <AuthInput
        as={EmailInput}
        name="email"
        value={values.email}
        error={errors.email}
        placeholder="Email"
        onChange={handleChange}
      />
      <AuthButton loading={loading}>Send Password Reset Email</AuthButton>
      <AuthTabLink onClick={() => setTab("login")}>Back to login</AuthTabLink>
    </AuthForm>
  );
}

export default ForgotPassword;
