import React from "react";
import { Message } from "components";

function ScheduleError() {
  return (
    <Message type="failure" title="Connection Error" description="We could not load your notes" />
  );
}

export default ScheduleError;
