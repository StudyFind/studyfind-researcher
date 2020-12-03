import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { fetchParticipants } from "database/participants";

import { Heading, Button, Box } from "@chakra-ui/react";
import ParticipantsFilter from "./ParticipantsFilter";
import ParticipantsRow from "./ParticipantsRow";

import { compute } from "functions";

function Participants({ study }) {
  const { id } = useParams();
  const [toggle, setToggle] = useState(false);
  const [participants, setParticipants] = useState([]);
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

  useEffect(() => {
    fetchParticipants(id).then((data) => {
      console.log(data);
      setParticipants(
        data.map(({ id, fakename, status, responses }) => ({
          id,
          fakename,
          status,
          score: compute.eligibilityScore(study.questions, responses),
        }))
      );
    });
  }, []);

  useEffect(() => {
    if (!toggle) {
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
    const initial = [...participants];
    const filteredSearch = filterSearch(initial);
    const filteredStatus = filterStatus(filteredSearch);
    const sorted = sortParticipants(filteredStatus);
    console.log(sorted);
    setParticipantsFiltered(sorted);
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

  return (
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
        {participantsFiltered.map((participant, index) => (
          <ParticipantsRow key={index} participant={participant} />
        ))}
      </Box>
    </>
  );
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

export default Participants;
