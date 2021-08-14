import { Message } from "components";

function MeetingsEmpty() {
  return (
    <Message
      title="Nothing to see here"
      description="You don't have any meetings on this day"
      marginY="10px"
      height="250px"
    />
  );
}

export default MeetingsEmpty;
