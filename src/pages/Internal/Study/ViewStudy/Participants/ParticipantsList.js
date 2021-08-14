import { Card, LoadMoreButton } from "components";
import { Box, VStack } from "@chakra-ui/react";

import ParticipantsItem from "./ParticipantsItem";

function ParticipantsList({
  participants,
  handleOpen,
  fetchedAll,
  additionalLoading,
  handleFetchAdditional,
}) {
  return (
    <VStack spacing="20px">
      <Card width="100%">
        {participants.map((participant) => (
          <ParticipantsItem
            key={participant.id}
            participant={participant}
            handleOpen={handleOpen}
          />
        ))}
      </Card>
      <LoadMoreButton
        fetchedAll={fetchedAll}
        fetchedAllText={`Showing all ${participants.length} participants`}
        isLoading={additionalLoading}
        onClick={handleFetchAdditional}
      />
    </VStack>
  );
}

export default ParticipantsList;
