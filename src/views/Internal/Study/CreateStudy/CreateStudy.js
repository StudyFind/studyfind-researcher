import React, { useState } from "react";
import styled from "styled-components";

import { Stack, Tag, TagLabel } from "@chakra-ui/react";

import Fetch from "./Fetch/Fetch";
import Consent from "./Consent/Consent";
import Details from "./Details/Details";
import Survey from "./Survey/Survey";
import Review from "./Review/Review";
import Published from "./Success/Published";
import Deleted from "./Success/Deleted";

function CreateStudy() {
  const [tab, setTab] = useState("fetch");
  const [study, setStudy] = useState({});
  const tabs = ["fetch", "details", "survey", "consent", "review"];

  const render = {
    fetch: <Fetch setTab={setTab} setStudy={setStudy} />,
    details: <Details setTab={setTab} study={study} setStudy={setStudy} />,
    survey: <Survey setTab={setTab} study={study} setStudy={setStudy} />,
    consent: <Consent setTab={setTab} study={study} />,
    review: <Review setTab={setTab} study={study} />,
    published: <Published />,
    deleted: <Deleted />,
  };

  const steps = (
    <Stack spacing={2} mb="15px" isInline>
      {tabs.map((t, i) => (
        <Tag
          key={i}
          h="24px"
          w="24px"
          rounded="full"
          variant={t === tab ? "solid" : "outline"}
          colorScheme="blue"
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
  padding: 50px;
  background: #f8f9fa;
  width: 100%;
  height: 100%;
`;

export default CreateStudy;
