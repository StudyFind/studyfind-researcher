import { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { useTabs } from "hooks";
import { StudiesContext } from "context";
import { useParams } from "react-router-dom";

import { Message } from "components";
import { Tabs, Tab, TabList, TabPanels } from "@chakra-ui/react";

import Details from "./Details/Details";
import Locations from "./Locations/Locations";
import Screening from "./Screening/Screening";
import Files from "./Files/Files";
import Participants from "./Participants/Participants";
import Settings from "./Settings/Settings";

function ViewStudy() {
  const studies = useContext(StudiesContext);
  const { studyID } = useParams();
  const [study, setStudy] = useState(studies.find((study) => study.id === studyID));

  const tabs = [
    { name: "details", content: <Details study={study} /> },
    { name: "locations", content: <Locations study={study} /> },
    { name: "screening", content: <Screening study={study} /> },
    { name: "files", content: <Files /> },
    { name: "participants", content: <Participants study={study} /> },
    { name: "settings", content: <Settings study={study} /> },
  ];

  const [tabIndex, setTabIndex] = useTabs(`/study/${studyID}`, tabs);

  useEffect(() => {
    setStudy(studies.find((study) => study.id === studyID));
  }, [studies]);

  const BODY = (
    <Tabs colorScheme="blue" h="100%" index={tabIndex}>
      <TabList>
        {tabs.map((t, i) => (
          <TabItem key={i} className="tab" onClick={() => setTabIndex(i)}>
            {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
          </TabItem>
        ))}
      </TabList>
      <TabPanels>{tabs[tabIndex]?.content}</TabPanels>
    </Tabs>
  );

  const MISSING = (
    <Message
      status="failure"
      title="Study not found!"
      description={`The study ${studyID} could not be found in the StudyFind database. Please
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
