import { useHistory, useParams } from "react-router";
import { useParticipantQueryWithFilters } from "hooks";

import { Button } from "@chakra-ui/react";
import { Loader } from "components";

import TabHeader from "../TabHeader";

import ParticipantsList from "./ParticipantsList";
import ParticipantsFilter from "./ParticipantsFilter";
import ParticipantsDrawer from "./ParticipantsDrawer";
import ParticipantsEmpty from "./ParticipantsEmpty";

function Participants({ study }) {
  const { action, studyID, participantID } = useParams();

  const {
    participants,
    loading,
    error,
    loadingMore,
    handleLoadMore,
    fetchedAll,
    filters,
    toggleFilters,
    setToggleFilters,
    handleChangeFilter,
    handleClearFilters,
    areFiltersApplied,
  } = useParticipantQueryWithFilters(study);

  const isOpen = action && participantID;
  const selectedParticipant = participants.find((participant) => participant.id === participantID);

  const history = useHistory();

  const handleOpen = (participantID, action) => {
    history.push(`/study/${studyID}/participants/${action}/${participantID}`);
  };

  const handleClose = () => {
    history.push(`/study/${studyID}/participants`);
  };

  if (loading) {
    return <Loader />;
  }

  return participants.length ? (
    <>
      <TabHeader heading="Participants">
        {areFiltersApplied && (
          <Button colorScheme="red" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        )}
        {toggleFilters ? (
          <Button colorScheme="gray" onClick={() => setToggleFilters(false)}>
            Hide Filters
          </Button>
        ) : (
          <Button colorScheme="blue" onClick={() => setToggleFilters(true)}>
            Show Filters
          </Button>
        )}
      </TabHeader>
      {toggleFilters && (
        <ParticipantsFilter filters={filters} handleChangeFilter={handleChangeFilter} />
      )}
      <ParticipantsList
        participants={participants}
        hasQuestions={!!study.questions.length}
        handleOpen={handleOpen}
        fetchedAll={fetchedAll}
        loadingMore={loadingMore}
        handleLoadMore={handleLoadMore}
      />
      <ParticipantsDrawer
        action={action}
        isOpen={isOpen}
        study={study}
        participant={selectedParticipant}
        handleClose={handleClose}
      />
    </>
  ) : (
    <ParticipantsEmpty />
  );
}

export default Participants;
