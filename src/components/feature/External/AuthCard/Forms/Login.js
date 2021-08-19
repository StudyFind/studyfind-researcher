import { useContext } from "react";
import { useAuth } from "hooks";

import AuthContext from "context/AuthContext";

import { EmailInput, PasswordInput } from "components";
import {
  AuthForm,
  AuthHeading,
  AuthInput,
  AuthButton,
  AuthTabLink,
} from "components/feature/External/AuthCard/Blocks";

function Login({ setTab }) {
  const { handleLogin } = useContext(AuthContext);

  const { values, errors, loading, handleChange, handleSubmit } = useAuth(
    {
      email: "",
      password: "",
    },
    handleLogin
  );

  return (
    <AuthForm onSubmit={handleSubmit}>
      <AuthHeading>Welcome Back!</AuthHeading>
      <AuthInput
        as={EmailInput}
        name="email"
        value={values.email}
        error={errors.email}
        placeholder="Email"
        onChange={handleChange}
      />
      <AuthInput
        as={PasswordInput}
        name="password"
        value={values.password}
        error={errors.password}
        placeholder="Password"
        onChange={handleChange}
      />
      <AuthButton loading={loading}>Login</AuthButton>
      <AuthTabLink onClick={() => setTab("forgotPassword")}>Forgot Password?</AuthTabLink>
    </AuthForm>
  );
}

export default Login;
