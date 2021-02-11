import React from "react";
import { Message } from "components";

function MeetingsError() {
  return (
    <Message
      type="failure"
      title="Connection Error"
      description="We could not load your meetings"
    />
  );
}

export default MeetingsError;
