import React, { useState } from "react";
import styled from "styled-components";

import { Stack, Tag, TagLabel } from "@chakra-ui/core";

import FetchStudy from "views/Internal/CreateStudy/FetchStudy";
import ConsentForm from "./ConsentForm/ConsentForm";
import ModifyFields from "views/Internal/CreateStudy/ModifyFields";
import ModifySurvey from "./ModifySurvey/ModifySurvey";
import ReviewStudy from "./ReviewStudy/ReviewStudy";
import Published from "./Success/Published";
import Deleted from "./Success/Deleted";

function CreateStudy() {
  const [tab, setTab] = useState("fetch");
  const [study, setStudy] = useState({});
  const tabs = ["fetch", "fields", "survey", "consent", "review"];

  const render = {
    fetch: <FetchStudy setTab={setTab} setStudy={setStudy} />,
    fields: <ModifyFields setTab={setTab} study={study} setStudy={setStudy} />,
    survey: <ModifySurvey setTab={setTab} study={study} setStudy={setStudy} />,
    consent: <ConsentForm setTab={setTab} study={study} />,
    review: <ReviewStudy setTab={setTab} study={study} />,
    published: <Published />,
    deleted: <Deleted />,
  };

  const steps = (
    <Stack spacing={2} mb="15px" isInline>
      {tabs.map((t, i) => (
        <Tag
          key={i}
          size="sm"
          rounded="full"
          variant={t === tab ? "solid" : "outline"}
          variantColor="blue"
        >
          <TagLabel>{i + 1}</TagLabel>
        </Tag>
      ))}
    </Stack>
  );

  return (
    <Box>
      {["published", "deleted"].includes(tab) || steps}
      {render[tab]}
    </Box>
  );
}

const Box = styled.div`
  padding: 30px 50px;
  background: #f8f9fa;
  width: 100%;
  height: 100%;
`;

export default CreateStudy;
