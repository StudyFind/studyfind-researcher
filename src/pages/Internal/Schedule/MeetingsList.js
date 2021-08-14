import { SimpleGrid } from "@chakra-ui/react";

import MeetingItem from "components/feature/MeetingItem/MeetingItem";

function MeetingsList({ meetings }) {
  return (
    <SimpleGrid spacing="10px" paddingY="10px">
      {meetings.map((meeting) => (
        <MeetingItem key={meeting.id} meeting={meeting} />
      ))}
    </SimpleGrid>
  );
}

export default MeetingsList;
