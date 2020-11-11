import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { auth, firestore } from "database/firebase";

import NoStudies from "./NoStudies";
import StudyCardSmall from "views/Internal/StudyCardSmall";

import { Link } from "react-router-dom";
import { Heading, Button, Spinner } from "@chakra-ui/core";
import { FaPlusCircle } from "react-icons/fa";

function Studies() {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudies = async () => {
    const { currentUser } = await auth;
    firestore
      .collection("studies")
      .where("researcher.id", "==", currentUser.uid)
      .get()
      .then((snapshot) => {
        const studies = [];
        snapshot.forEach((doc) => studies.push(doc.data()));
        setStudies(studies);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStudies();
  }, []);

  const GRID = studies.length ? (
    <>
      <Head>
        <Heading>Your Studies</Heading>
        <Link to="/create">
          <Button leftIcon={FaPlusCircle} variantColor="teal">
            Create Study
          </Button>
        </Link>
      </Head>
      <StudyGrid n={studies.length}>
        {studies.map((study, index) => (
          <StudyCardSmall key={index} study={study} />
        ))}
      </StudyGrid>
    </>
  ) : (
    <NoStudies />
  );

  const LOAD = (
    <PageLoader>
      <Spinner thickness="4px" speed="0.5s" emptyColor="gray.200" color="teal.500" size="lg" />
    </PageLoader>
  );

  return <Page>{loading ? LOAD : GRID}</Page>;
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
  height: 100%;
`;

export default Studies;
