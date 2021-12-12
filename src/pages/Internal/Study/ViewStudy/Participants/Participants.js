import { useHistory } from "react-router-dom";
import { useParticipantQueryWithFilters, usePathParams } from "hooks";

import { Loader } from "components";

import TabHeader from "../TabHeader";

import ParticipantsList from "./ParticipantsList";
import ParticipantsDrawer from "./ParticipantsDrawer";
import ParticipantsEmpty from "./ParticipantsEmpty";

function Participants({ study }) {
  const { action, studyID, participantID } = usePathParams();

  const {
    participants,
    loading,
    loadingMore,
    handleLoadMore,
    fetchedAll,
  } = useParticipantQueryWithFilters(study);

  const selectedParticipant = participants.find(
    (participant) => participant.id === participantID
  );
  const isOpen = action && participantID && selectedParticipant;

  const history = useHistory();

  const handleOpen = (participantID, action) => {
    history.push(`/study/${studyID}/participants/${participantID}/${action}`);
  };

  const handleClose = () => {
    history.push(`/study/${studyID}/participants`);
  };

  if (loading) {
    return <Loader height="calc(100vh - 80px)" />;
  }

  return participants.length ? (
    <>
      <TabHeader heading="Participants">
        {/* {areFiltersApplied && (
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
        )} */}
      </TabHeader>
      {/* {toggleFilters && (
        <ParticipantsFilter filters={filters} handleChangeFilter={handleChangeFilter} />
      )} */}
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
