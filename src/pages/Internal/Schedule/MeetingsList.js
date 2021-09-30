import { SimpleGrid } from "@chakra-ui/react";

import MeetingItem from "components/feature/MeetingItem/MeetingItem";

import { meeting as meetingMutator } from "database/mutations";

function MeetingsList({ meetings }) {
  return (
    <SimpleGrid spacing="10px" paddingY="10px">
      {meetings.map((meeting) => (
        <MeetingItem
          key={meeting.id}
          meeting={meeting}
          handleDelete={() => meetingMutator.delete(meeting.id)}
        />
      ))}
    </SimpleGrid>
  );
}

export default MeetingsList;
