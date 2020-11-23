import React, { useEffect } from "react";

import { useAuthForm } from "hooks";
import { verifyUser } from "database";

import { Message, TabLink } from "views/External/Auth/Blocks";
import { Flex, Spinner } from "components";

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
        <Message
          type="success"
          title="Verification successful!"
          description="Your email has now been verified!"
        >
          <TabLink onClick={() => setTab("login")}> Back to login </TabLink>
        </Message>
      );
    } else {
      return (
        <Message
          type="failure"
          title="Verification expired"
          description="Your email verification was unsuccessful"
        >
          <TabLink onClick={() => setTab("login")}> Back to login </TabLink>
        </Message>
      );
    }
  }

  return (
    <Flex py="120px" w="100%" justify="center">
      <Spinner />
    </Flex>
  );
}

export default VerifyEmail;
