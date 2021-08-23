import { usePathParams } from "hooks";

import { Message, Link } from "components";
import { Button } from "@chakra-ui/react";

function ParticipantsEmpty() {
  const { studyID } = usePathParams();

  return (
    <Message
      title="No Participants"
      description="Make your study title and description more readable to make it more accessible to participants"
      height="400px"
      showBackground
    >
      <Link to={`/study/${studyID}/details`}>
        <Button>Edit Details</Button>
      </Link>
    </Message>
  );
}

export default ParticipantsEmpty;
