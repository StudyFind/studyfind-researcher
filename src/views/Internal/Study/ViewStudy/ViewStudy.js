import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { fetchStudy } from "database/studies";

import { Message, Page } from "components";
import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";

import Details from "./Details/Details";
import Survey from "./Screening/Screening";
import Consent from "./Consent/Consent";
import Participants from "./Participants/Participants";
import Settings from "./Settings/Settings";

function ViewStudy() {
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
        <TabItem>Screening</TabItem>
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

  return <Page isLoading={loading}>{error ? DENIED : study ? BODY : MISSING}</Page>;
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

export default ViewStudy;
