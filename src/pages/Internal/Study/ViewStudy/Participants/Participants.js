import { useState } from "react";
import { usePagination } from "hooks";
import { useHistory, useParams } from "react-router";
import { firestore } from "database/firebase";

import { Button } from "@chakra-ui/react";
import { Loader } from "components";

import TabHeader from "../TabHeader";

import ParticipantsList from "./ParticipantsList";
import ParticipantsFilter from "./ParticipantsFilter";
import ParticipantsDrawer from "./ParticipantsDrawer";
import ParticipantsEmpty from "./ParticipantsEmpty";

function Participants() {
  const { action, studyID, participantID } = useParams();

  const initialFilters = {
    status: ["interested", "screened", "consented", "accepted", "rejected"],
    sort: "eligibility",
  };

  const [toggle, setToggle] = useState(false);
  const [values, setValues] = useState(initialFilters);

  const areFiltersApplied = JSON.stringify(initialFilters) !== JSON.stringify(values);

  const participantsQuery = firestore.collection("studies").doc(studyID).collection("participants");

  const {
    documents: participants,
    loading,
    error,
    loadingMore,
    handleLoadMore,
    fetchedAll,
  } = usePagination(participantsQuery, 10);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // const participants = [
  //   {
  //     id: "UWGOEHUHHI",
  //     fakename: "UWGOEHUHHI",
  //     timezone: "PST",
  //     status: "interested",
  //     score: 40,
  //   },
  //   {
  //     id: "VREIOFJHUU",
  //     fakename: "VREIOFJHUU",
  //     timezone: "EST",
  //     status: "screened",
  //     score: 10,
  //   },
  //   {
  //     id: "REWIGUHIEW",
  //     fakename: "REWIGUHIEW",
  //     timezone: "MST",
  //     status: "accepted",
  //     score: 18,
  //   },
  //   {
  //     id: "PFDIUHWEUH",
  //     fakename: "PFDIUHWEUH",
  //     timezone: "CST",
  //     status: "rejected",
  //     score: 52,
  //   },
  //   {
  //     id: "BGUIHAIHEVE",
  //     fakename: "BGUIHAIHEVE",
  //     timezone: "GST",
  //     status: "consented",
  //     score: 43,
  //   },
  // ];

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
          <Button colorScheme="red" onClick={() => setValues(initialFilters)}>
            Clear Filters
          </Button>
        )}
        {toggle ? (
          <Button colorScheme="gray" onClick={() => setToggle(false)}>
            Hide Filters
          </Button>
        ) : (
          <Button colorScheme="blue" onClick={() => setToggle(true)}>
            Show Filters
          </Button>
        )}
      </TabHeader>
      {toggle && <ParticipantsFilter values={values} handleChange={handleChange} />}
      <ParticipantsList
        participants={participants}
        handleOpen={handleOpen}
        fetchedAll={fetchedAll}
        loadingMore={loadingMore}
        handleLoadMore={handleLoadMore}
      />
      <ParticipantsDrawer
        action={action}
        participant={selectedParticipant}
        isOpen={isOpen}
        handleClose={handleClose}
      />
    </>
  ) : (
    <ParticipantsEmpty />
  );
}

export default Participants;
