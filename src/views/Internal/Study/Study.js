import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { fetchStudy } from "database/studies";

import { Spinner } from "components";
import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import { FaPoll, FaComment, FaUsers, FaCog, FaInfoCircle } from "react-icons/fa";

import Details from "./Details/Details";
import Location from "./Location/Location";
import Survey from "./Survey/Survey";
import Consent from "./Consent/Consent";
import Participants from "./Participants/Participants";
import Settings from "./Settings/Settings";

function Study() {
  const { id } = useParams();
  const [study, setStudy] = useState({});
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState("Details");

  const tabs = [
    { name: "Details", icon: <FaInfoCircle /> },
    { name: "Survey", icon: <FaPoll /> },
    { name: "Messages", icon: <FaComment /> },
    { name: "Participants", icon: <FaUsers /> },
    { name: "Settings", icon: <FaCog /> },
  ];

  const content = {
    Details: <Details study={study} setStudy={setStudy} />,
    Survey: <Survey study={study} setStudy={setStudy} />,
    Participants: <Participants />,
    Settings: <Settings study={study} setStudy={setStudy} />,
  };

  useEffect(() => {
    fetchStudy(id)
      .then(setStudy)
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [id]);

  const LOAD = (
    <PageLoader>
      <Spinner />
    </PageLoader>
  );

  const BODY = (
    <div>
      <Tabs colorScheme="blue">
        <TabList>
          <TabItem>Details</TabItem>
          <TabItem>Survey</TabItem>
          <TabItem>Consent</TabItem>
          <TabItem>Messages</TabItem>
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
            <div />
          </TabPanel>
          <TabPanel pt="1px">
            <Participants study={study} />
          </TabPanel>
          <TabPanel pt="1px">
            <Settings study={study} setStudy={setStudy} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );

  return <Page>{loading ? LOAD : BODY}</Page>;
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
  height: 100%;
  background: #f8f9fa;
`;

const PageLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default Study;
