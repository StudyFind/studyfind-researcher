import React, { useEffect } from "react";

import { useAuthForm } from "hooks";
import { verifyUser } from "database";

import { Button, Message } from "components";

function VerifyEmail({ setTab }) {
  const url = new URL(window.location.href);
  const actionCode = url.searchParams.get("oobCode");

  const { success, handleSubmit } = useAuthForm({
    initial: {},
    onSubmit: verifyUser,
  });

  useEffect(() => {
    handleSubmit(actionCode);
  }, []);

  if (success !== undefined) {
    if (success) {
      return (
        <Message type="success" title="Verification successful!">
          Your email has now been verified!
          <div>
            <Button onClick={() => setTab("login")}> Back to login </Button>
          </div>
        </Message>
      );
    } else {
      return (
        <Message type="failure" title="Verification expired">
          Your email verification was unsuccessful
          <div>
            <Button onClick={() => setTab("login")}> Back to login </Button>
          </div>
        </Message>
      );
    }
  }

  return <div>Loading...</div>;
}

export default VerifyEmail;
