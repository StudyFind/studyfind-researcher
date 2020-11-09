import React, { useState } from "react";
import styled from "styled-components";

import { Card, Steps } from "components";
import { Stack, Tag, TagLabel } from "@chakra-ui/core";

import FetchStudy from "views/Internal/CreateStudy/FetchStudy";
import ConsentForm from "./ConsentForm";
import ModifyFields from "views/Internal/CreateStudy/ModifyFields";
import ModifySurvey from "./ModifySurvey/ModifySurvey";

function CreateStudy() {
  const [tab, setTab] = useState("fetch");
  const [study, setStudy] = useState({});
  const [studyID, setStudyID] = useState("");
  const tabs = ["fetch", "fields", "survey", "consent"];

  const render = {
    fetch: <FetchStudy setTab={setTab} setStudyID={setStudyID} setStudy={setStudy} />,
    fields: <ModifyFields setTab={setTab} study={study} setStudy={setStudy} />,
    survey: <ModifySurvey setTab={setTab} study={study} setStudy={setStudy} />,
    consent: <ConsentForm setTab={setTab} study={study} studyID={studyID} />,
  };

  const steps = (
    <Stack spacing={2} my="10px" isInline>
      {tabs.map((t, i) => (
        <Tag
          key={i}
          size="sm"
          rounded="full"
          variant={t === tab ? "solid" : "outline"}
          variantColor="teal"
        >
          <TagLabel>{i + 1}</TagLabel>
        </Tag>
      ))}
    </Stack>
  );

  return (
    <Box>
      {steps}
      {render[tab]}
    </Box>
  );
}

const Box = styled.div`
  padding: 50px;
  background: #f8f9fa;
  width: 100%;
  height: 100%;
`;

export default CreateStudy;
