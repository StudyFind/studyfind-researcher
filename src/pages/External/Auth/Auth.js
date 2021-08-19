import AuthCard from "components/feature/External/AuthCard/AuthCard";
import { signin, signup, forgotPassword } from "database/auth";

function Auth() {
  return (
    <AuthCard handleLogin={signin} handleSignup={signup} handleForgotPassword={forgotPassword} />
  );
}

export default Auth;
