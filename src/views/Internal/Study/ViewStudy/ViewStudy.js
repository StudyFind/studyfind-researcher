import React, { useState, useEffect, useContext } from "react";
import { StudiesContext } from "context";

import styled from "styled-components";
import { useParams } from "react-router-dom";

import { Message } from "components";
import { Link } from "react-router-dom";
import { Tabs, Tab, TabList, TabPanels } from "@chakra-ui/react";

import Details from "./Details/Details";
import Locations from "./Locations/Locations";
import Files from "./Files/Files";
import Screening from "./Screening/Screening";
import Participants from "./Participants/Participants";
import Settings from "./Settings/Settings";

function ViewStudy() {
  const studies = useContext(StudiesContext);
  const { nctID, tab } = useParams();

  const [study, setStudy] = useState({});
  const [tabIndex, setTabIndex] = useState(0);

  const tabs = [
    { name: "details", content: <Details study={study} /> },
    { name: "locations", content: <Locations study={study} /> },
    { name: "screening", content: <Screening study={study} /> },
    { name: "files", content: <Files /> },
    { name: "participants", content: <Participants study={study} /> },
    { name: "settings", content: <Settings study={study} /> },
  ];

  useEffect(() => {
    setStudy(studies.find((study) => study.id === nctID));
  }, [studies]);

  useEffect(() => {
    setTabIndex(tabs.findIndex((t) => tab === t.name));
  }, [tab]);

  const BODY = (
    <Tabs colorScheme="blue" h="100%" index={tabIndex}>
      <TabList>
        {tabs.map((t, i) => (
          <Link key={i} to={`/study/${nctID}/${t.name}`}>
            <TabItem>
              {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
            </TabItem>
          </Link>
        ))}
      </TabList>
      <TabPanels pt="1px">{tabs[tabIndex].content}</TabPanels>
    </Tabs>
  );

  const MISSING = (
    <Message
      status="failure"
      title="Study not found!"
      description={`The study ${nctID} could not be found in the StudyFind database. Please
  ensure that it has been successfully created by following all directions in the study
  creation process.`}
    />
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
