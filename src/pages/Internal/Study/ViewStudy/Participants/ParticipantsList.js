import { Card, LoadMoreButton } from "components";
import { VStack } from "@chakra-ui/react";

import ParticipantsItem from "./ParticipantsItem";

function ParticipantsList({ participants, handleOpen, fetchedAll, loadingMore, handleLoadMore }) {
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
        isLoading={loadingMore}
        onClick={handleLoadMore}
      />
    </VStack>
  );
}

export default ParticipantsList;
