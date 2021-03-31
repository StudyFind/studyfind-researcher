import React, { useState, useEffect } from "react";
import { useArray } from "hooks";
import { compute } from "functions";
import { firestore } from "database/firebase";
import { useCollection } from "hooks";
import { useParams } from "react-router-dom";
import { updateStudy } from "database/studies";

import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import { Message, Loader } from "components";

import ParticipantsFilter from "./ParticipantsFilter";
import ParticipantsRow from "./ParticipantsRow";

function Participants({ study }) {
  const { nctID } = useParams();
  const [toggle, setToggle] = useState(false);
  const [participants, loading, error] = useCollection(
    firestore.collection("studies").doc(nctID).collection("participants")
  );
  const [participantsFiltered, setParticipantsFiltered] = useState([]);

  const [sort, setSort] = useState("fakename");
  const [search, setSearch] = useState("");

  if (!study.allStatuses) {
    updateStudy(study.id, {
      allStatuses: [
        { name: "interested", color: "gray" },
        { name: "screened", color: "purple" },
        { name: "consented", color: "cyan" },
        { name: "accepted", color: "green" },
        { name: "rejected", color: "red" },
      ],
    });
  }
  const [status, setStatus, { appendElement, updateElement, deleteElement, clearArray }] = useArray(
    study.allStatuses
      ? study.allStatuses.map((status) => ({
          name: status.name,
          checked: true,
        }))
      : {}
  );
  console.log(status);
  useEffect(() => {
    if (!toggle) {
      setSearch("");
      setSort("fakename");
      setStatus(
        study.allStatuses
          ? study.allStatuses.map((status) => ({
              name: status.name,
              checked: true,
            }))
          : {}
      );
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
    return participants.filter((p) => status.find((value) => p.status === value.name).checked);
  };

  const filterSearch = (participants) => {
    return participants.filter((p) => p.fakename.toLowerCase().includes(search));
  };

  if (loading) {
    return (
      <Box h="500px">
        <Loader />
      </Box>
    );
  }

  if (!participants || !participants.length) {
    return (
      <Box h="500px">
        <Message
          type="neutral"
          title="Find Participants"
          description="Your study does not have any participants yet!"
        />
      </Box>
    );
  }

  return (
    <>
      <Flex justify="space-between" align="center" my="15px">
        <Heading fontSize="28px">Participants</Heading>
        {toggle ? (
          <Button color="gray.500" onClick={() => setToggle(false)}>
            Clear Filters
          </Button>
        ) : (
          <Button colorScheme="blue" onClick={() => setToggle(true)}>
            Filter Participants
          </Button>
        )}
      </Flex>
      {toggle && (
        <ParticipantsFilter
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          sort={sort}
          setSort={setSort}
          updateStatus={updateElement}
        />
      )}
      <Box borderWidth="1px" rounded="md" overflow="hidden" bg="white">
        {participantsFiltered && participantsFiltered.length ? (
          participantsFiltered.map((participant, index) => (
            <ParticipantsRow key={index} study={study} participant={participant} />
          ))
        ) : (
          <Box h="500px">
            <Message
              type="failure"
              title="Empty Filter Results"
              description="Your filters matched no participants"
            />
          </Box>
        )}
      </Box>
    </>
  );
}

export default Participants;
