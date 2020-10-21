import React, { useEffect } from "react";

import { verifyUser } from "database";

function VerifyEmail({ setTab, setMessage }) {
  const url = new URL(window.location.href);
  const actionCode = url.searchParams.get("oobCode");

  useEffect(() => {
    handleVerifyEmail();
  }, []);

  const handleSubmit = () => verifyUser(actionCode);

  const handleSuccess = () => {
    setMessage({
      type: "success",
      title: "Verification successful!",
      text: "Your email has now been verified!",
    });
  };

  const handleFailure = () => {
    setMessage({
      type: "failure",
      title: "Verification expired",
      text: "Your email verification was unsuccessful!",
    });
  };

  const handleVerifyEmail = () => {
    verifyUser(actionCode).then(handleSuccess).catch(handleFailure);
  };

  return <div>Loading...</div>;
}

export default VerifyEmail;
