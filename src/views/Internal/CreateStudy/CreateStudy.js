import React, { useState } from "react";
import styled from "styled-components";

import { Card } from "components";

import FetchStudy from "./FetchStudy";
import ConsentForm from "./ConsentForm";
import ModifyFields from "./ModifyFields";
import ModifySurvey from "./ModifySurvey";

function CreateStudy() {
  const [tab, setTab] = useState("fetch");
  const [study, setStudy] = useState({});
  const [studyID, setStudyID] = useState("");

  const render = {
    fetch: <FetchStudy setTab={setTab} setStudyID={setStudyID} setStudy={setStudy} />,
    fields: <ModifyFields setTab={setTab} study={study} setStudy={setStudy} />,
    survey: <ModifySurvey setTab={setTab} study={study} setStudy={setStudy} />,
    consent: <ConsentForm setTab={setTab} study={study} studyID={studyID} />,
  };

  return (
    <Box>
      <Head>
        <Heading>Create Study</Heading>
      </Head>
      <Body>
        <Form>{render[tab]}</Form>
      </Body>
    </Box>
  );
}

const Box = styled.div`
  width: 100%;
`;

const Head = styled.div`
  padding: 10px 20px;
`;

const Body = styled.div`
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h2``;

const Form = styled(Card)``;

export default CreateStudy;
