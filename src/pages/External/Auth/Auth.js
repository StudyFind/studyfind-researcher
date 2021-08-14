import AuthBox from "components/feature/Auth/Auth";
import { signin, signup, forgotPassword } from "database/auth";

function Auth() {
  return (
    <AuthBox handleLogin={signin} handleSignup={signup} handleForgotPassword={forgotPassword} />
  );
}

export default Auth;
