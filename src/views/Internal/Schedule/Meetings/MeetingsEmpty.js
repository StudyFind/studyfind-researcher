import { Message } from "components";

function MeetingsEmpty() {
  return (
    <Message
      title="Nothing to see here"
      description="You don't have any meetings on this day"
      my="10px"
      h="250px"
    />
  );
}

export default MeetingsEmpty;
