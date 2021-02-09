import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { compute } from "functions";
import { firestore } from "database/firebase";
import { useCollection } from "hooks";
import { useParams } from "react-router-dom";

import { Heading, Button, Box, useDisclosure } from "@chakra-ui/react";
import { Message, Loader } from "components";

import ParticipantDrawer from "./ParticipantDrawer";
import ParticipantsFilter from "./ParticipantsFilter";
import ParticipantsRow from "./ParticipantsRow";
import Eligibility from "./Eligibility/Eligibility";
import Reminders from "./Reminders/Reminders";
import Notes from "./Notes/Notes";
import Meetings from "./Meetings/Meetings";

function Participants({ study }) {
  const { nctID } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [drawer, setDrawer] = useState({ action: "", participant: {} });
  const [toggle, setToggle] = useState(false);
  const [participants, loading, error] = useCollection(
    firestore.collection("studies").doc(nctID).collection("participants")
  );
  const [participantsFiltered, setParticipantsFiltered] = useState([]);

  const [sort, setSort] = useState("fakename");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState({
    interested: true,
    screened: true,
    consented: true,
    accepted: true,
    rejected: true,
  });

  const handleDrawer = (action, participantID) => {
    const participant = participants.find((participant) => participant.id === participantID) || {
      responses: [],
      reminders: [],
    };
    setDrawer({ action, participant });
    onOpen();
  };

  useEffect(() => {
    if (!toggle) {
      setSearch("");
      setSort("fakename");
      setStatus({
        interested: true,
        screened: true,
        consented: true,
        accepted: true,
        rejected: true,
      });
    }
  }, [toggle]);

  useEffect(() => {
    if (participants) {
      const initial = participants.map((p) => ({
        ...p,
        score: compute.eligibilityScore(study.questions, p.responses),
      }));
      const filteredSearch = filterSearch(initial);
      const filteredStatus = filterStatus(filteredSearch);
      const sorted = sortParticipants(filteredStatus);
      setParticipantsFiltered(sorted);
    }
  }, [sort, status, search, participants]);

  const sortParticipants = (participants) => {
    switch (sort) {
      case "fakename":
        return sortByFakename(participants);
      case "status":
        return sortByStatus(participants);
      case "eligibility":
        return sortByEligiblity(participants);
      default:
        return participants;
    }
  };

  const sortByStatus = (participants) => {
    const order = ["interested", "screened", "consented", "accepted", "rejected"];
    participants.sort((a, b) => {
      const statusA = order.indexOf(a.status);
      const statusB = order.indexOf(b.status);
      if (statusA > statusB) {
        return 1;
      } else if (statusA < statusB) {
        return -1;
      } else {
        return 0;
      }
    });
    return participants;
  };

  const sortByFakename = (participants) => {
    participants.sort((a, b) => {
      if (a.fakename > b.fakename) {
        return 1;
      } else if (a.fakename < b.fakename) {
        return -1;
      } else {
        return 0;
      }
    });
    return participants;
  };

  const sortByEligiblity = (participants) => {
    participants.sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      } else if (a.score > b.score) {
        return -1;
      } else {
        return 0;
      }
    });
    return participants;
  };

  const filterStatus = (participants) => {
    return participants.filter((p) => status[p.status]);
  };

  const filterSearch = (participants) => {
    return participants.filter((p) => p.fakename.toLowerCase().includes(search));
  };

  const LOAD = (
    <Box h="500px">
      <Loader />
    </Box>
  );

  const EMPTY = (
    <Box h="500px">
      <Message
        type="neutral"
        title="Find Participants"
        description="Your study does not have any participants yet!"
      />
    </Box>
  );

  const FILTER_EMPTY = (
    <Box h="500px">
      <Message
        type="failure"
        title="Empty Filter Results"
        description="Your filters matched no participants"
      />
    </Box>
  );

  const LIST = (
    <>
      <Head>
        <Heading fontSize="28px">Participants</Heading>
        {toggle ? (
          <Button colorScheme="gray" onClick={() => setToggle(false)}>
            Clear Filters
          </Button>
        ) : (
          <Button colorScheme="blue" onClick={() => setToggle(true)}>
            Filter Participants
          </Button>
        )}
      </Head>
      {toggle && (
        <ParticipantsFilter
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          sort={sort}
          setSort={setSort}
        />
      )}
      <Box borderWidth="1px" rounded="md" overflow="hidden" bg="white">
        {participantsFiltered && participantsFiltered.length
          ? participantsFiltered.map((participant, index) => (
              <ParticipantsRow key={index} participant={participant} handleDrawer={handleDrawer} />
            ))
          : FILTER_EMPTY}
      </Box>
      <ParticipantDrawer
        action={drawer.action}
        fakename={drawer.participant.fakename}
        onClose={onClose}
        isOpen={isOpen}
      >
        {drawer.action === "eligibility" && (
          <Eligibility questions={study.questions} responses={drawer.participant.responses} />
        )}
        {drawer.action === "reminders" && (
          <Reminders participant={drawer.participant} study={study} />
        )}
        {drawer.action === "notes" && <Notes id={drawer.participant.id} />}
        {drawer.action === "meetings" && (
          <Meetings participant={drawer.participant} study={study} />
        )}
      </ParticipantDrawer>
    </>
  );
  return loading || !participants ? LOAD : participants.length ? LIST : EMPTY;
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

export default Participants;
