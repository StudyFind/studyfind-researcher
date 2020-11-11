import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { firestore } from "database/firebase";

import { Spinner, PseudoBox } from "@chakra-ui/core";

import Details from "./Details";
import Survey from "./Survey";
import Participants from "./Participants";
import Settings from "./Settings";

function Study() {
  const { id } = useParams();
  const [selected, setSelected] = useState("Details");
  const [study, setStudy] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudy = async () => {
    firestore
      .collection("studies")
      .doc(id)
      .get()
      .then((doc) => {
        setStudy(doc.data());
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    id && fetchStudy();
  }, [id]);

  const render = {
    Details: <Details study={study} />,
    Survey: <Survey study={study} />,
    Participants: <Participants study={study} />,
    Settings: <Settings study={study} />,
  };

  const tabs = ["Details", "Survey", "Participants", "Settings"];
  const TABS = (
    <Tabs>
      {tabs.map((tab, index) => (
        <PseudoBox
          key={index}
          as="button"
          color={tab === selected ? "white" : "gray.500"}
          bg={tab === selected ? "teal.500" : "transparent"}
          fontWeight="semibold"
          py={2}
          px={4}
          rounded="md"
          onClick={() => setSelected(tab)}
          _hover={{ bg: tab === selected ? "teal.600" : "gray.200" }}
        >
          {tab}
        </PseudoBox>
      ))}
    </Tabs>
  );

  const LOAD = (
    <PageLoader>
      <Spinner thickness="4px" speed="0.5s" emptyColor="gray.200" color="teal.500" size="lg" />
    </PageLoader>
  );

  const BODY = (
    <div>
      {TABS}
      {render[selected]}
    </div>
  );

  return <Page>{loading ? LOAD : BODY}</Page>;
}

const Page = styled.div`
  padding: 30px;
  height: 100%;
  background: #f8f9fa;
`;

const Tabs = styled.div`
  display: flex;
  grid-gap: 10px;
  margin-bottom: 10px;
`;

const PageLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default Study;
