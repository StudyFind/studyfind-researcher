import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { fetchStudy } from "database/studies";

import { Spinner, Message } from "components";
import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";

import Details from "./ViewStudy/Details/Details";
import Survey from "./ViewStudy/Survey/Survey";
import Consent from "./ViewStudy/Consent/Consent";
import Participants from "./ViewStudy/Participants/Participants";
import Settings from "./ViewStudy/Settings/Settings";

function Study() {
  const { nctID } = useParams();
  const [study, setStudy] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudy(nctID)
      .then(setStudy)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [nctID]);

  const LOAD = (
    <PageLoader>
      <Spinner />
    </PageLoader>
  );

  const MISSING = (
    <Message
      type="failure"
      title="Study not found!"
      description={`The study ${nctID} could not be found in the StudyFind database. Please
  ensure that it has been successfully created by following all directions in the study
  creation process.`}
    />
  );

  const DENIED = (
    <Message
      type="failure"
      title="Permission Denied!"
      description={`You do not have the authorization required to access the study
  ${nctID}. If you require access to the study, please contact the study owner to grant you
  priviledge access to the study.`}
    />
  );

  const BODY = (
    <Tabs colorScheme="blue" h="100%">
      <TabList>
        <TabItem>Details</TabItem>
        <TabItem>Survey</TabItem>
        <TabItem>Consent</TabItem>
        <TabItem>Participants</TabItem>
        <TabItem>Settings</TabItem>
      </TabList>
      <TabPanels>
        <TabPanel pt="1px">
          <Details study={study} setStudy={setStudy} />
        </TabPanel>
        <TabPanel pt="1px">
          <Survey study={study} setStudy={setStudy} />
        </TabPanel>
        <TabPanel pt="1px">
          <Consent study={study} setStudy={setStudy} />
        </TabPanel>
        <TabPanel pt="1px">
          <Participants study={study} />
        </TabPanel>
        <TabPanel pt="1px">
          <Settings study={study} setStudy={setStudy} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );

  return <Page>{loading ? LOAD : error ? DENIED : study ? BODY : MISSING}</Page>;
}

const TabItem = styled(Tab)`
  font-weight: 600;
  color: rgb(161, 175, 192);
  display: flex;
  grid-gap: 8px;
  align-items: center;

  &:active {
    background: transparent !important;
    color: rgb(101, 115, 132);
  }

  &:focus {
    box-shadow: none !important;
  }
`;

const Page = styled.div`
  padding: 20px;
  background: #f8f9fa;
`;

const PageLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 40px);
`;

export default Study;
