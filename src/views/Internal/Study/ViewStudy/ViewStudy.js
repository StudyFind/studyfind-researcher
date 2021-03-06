import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { Message } from "components";
import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";

import Details from "./Details/Details";
import Locations from "./Locations/Locations";
import Eligibility from "./Eligibility/Eligibility";
import Files from "./Files/Files";
import Participants from "./Participants/Participants";
import Settings from "./Settings/Settings";

function ViewStudy({ studies }) {
  const { nctID } = useParams();
  const findStudy = () => studies && studies.find((study) => study.id === nctID);
  const [study, setStudy] = useState(findStudy());

  useEffect(() => {
    if (studies) {
      setStudy(findStudy());
    }
  }, [studies]);

  const MISSING = (
    <Message
      type="failure"
      title="Study not found!"
      description={`The study ${nctID} could not be found in the StudyFind database. Please
  ensure that it has been successfully created by following all directions in the study
  creation process.`}
    />
  );

  const BODY = (
    <Tabs colorScheme="blue" h="100%">
      <TabList>
        <TabItem>Details</TabItem>
        <TabItem>Locations</TabItem>
        <TabItem>Eligibility</TabItem>
        <TabItem>Files</TabItem>
        <TabItem>Participants</TabItem>
        <TabItem>Settings</TabItem>
      </TabList>
      <TabPanels>
        <TabPanel pt="1px">
          <Details study={study} />
        </TabPanel>
        <TabPanel pt="1px">
          <Locations study={study} />
        </TabPanel>
        <TabPanel pt="1px">
          <Eligibility study={study} />
        </TabPanel>
        <TabPanel pt="1px">
          <Files />
        </TabPanel>
        <TabPanel pt="1px">
          <Participants study={study} />
        </TabPanel>
        <TabPanel pt="1px">
          <Settings study={study} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );

  return study ? BODY : MISSING;
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
