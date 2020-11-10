import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { auth, firestore } from "database/firebase";

import StudyCard from "./StudyCard";
import { Heading, Button, Spinner } from "@chakra-ui/core";
import { FaPlusCircle } from "react-icons/fa";

function Studies() {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudy = async () => {
    const { currentUser } = await auth;
    firestore
      .collection("studies")
      .where("researcher.id", "==", currentUser.uid)
      .get()
      .then((snapshot) => {
        const studies = [];
        snapshot.forEach((doc) => studies.push(doc.data()));
        setStudies(studies);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStudy();
  }, []);

  const GRID = (
    <StudyGrid n={studies.length}>
      {studies.map((study, index) => (
        <StudyCard key={index} study={study} />
      ))}
    </StudyGrid>
  );

  const LOAD = (
    <PageLoader n={studies.length}>
      <Spinner thickness="4px" speed="0.5s" emptyColor="gray.200" color="teal.500" size="lg" />
    </PageLoader>
  );

  return (
    <Page>
      <Head>
        <Heading>Your Studies</Heading>
        <Button leftIcon={FaPlusCircle} variantColor="teal">
          Create Study
        </Button>
      </Head>
      {loading ? LOAD : GRID}
    </Page>
  );
}

const Page = styled.div`
  padding: 30px;
  height: 100%;
  background: #f8f9fa;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

const StudyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: ${(props) => "270px".repeat(Math.floor(props.n / 2))};
  grid-gap: 25px;
  align-items: flex-start;
`;

const PageLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

export default Studies;
