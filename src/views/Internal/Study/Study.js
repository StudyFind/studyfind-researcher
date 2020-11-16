import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { fetchStudy } from "database/studies";

import { Spinner, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/core";

import Details from "./Details/Details";
import Survey from "./Survey/Survey";

function Study() {
  const { id } = useParams();
  const [study, setStudy] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudy(id)
      .then(setStudy)
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  const LOAD = (
    <PageLoader>
      <Spinner thickness="4px" speed="0.5s" emptyColor="gray.200" color="teal.500" size="lg" />
    </PageLoader>
  );

  const BODY = (
    <div>
      <Tabs variantColor="teal">
        <TabList mb="15px">
          <TabItem>Details</TabItem>
          <TabItem>Survey</TabItem>
          <TabItem>Consent</TabItem>
          <TabItem>Locations</TabItem>
          <TabItem>Participants</TabItem>
          <TabItem>Settings</TabItem>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Details study={study} setStudy={setStudy} />
          </TabPanel>
          <TabPanel>
            <Survey study={study} setStudy={setStudy} />
          </TabPanel>
          <TabPanel>
            <div>Consent: Add PDF viewer here to display consent form</div>
          </TabPanel>
          <TabPanel>
            <div>Locations: Add table of locations which have external link to google maps</div>
          </TabPanel>
          <TabPanel>
            <div>
              Participants: Add table of participants with link to response review page +
              accept/reject buttons + eligibility score
            </div>
          </TabPanel>
          <TabPanel>
            <div>
              Settings: Update Study, Activate/Deactivate Study, Delete Study, Intro message
              template
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );

  return <Page>{loading ? LOAD : BODY}</Page>;
}

const Page = styled.div`
  padding: 30px;
  height: 100%;
  background: #f8f9fa;
`;

const TabItem = styled(Tab)`
  font-weight: 600;
  color: rgb(161, 175, 192);
`;

const PageLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default Study;
