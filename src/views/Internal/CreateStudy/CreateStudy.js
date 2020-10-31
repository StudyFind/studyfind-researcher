import React, { useState } from "react";
import styled from "styled-components";

import { Card } from "components";

import FetchStudy from "./FetchStudy";
import ConsentForm from "./ConsentForm";
import ModifyFields from "./ModifyFields";
import ModifySurvey from "./ModifySurvey";

function CreateStudy() {
  const [tab, setTab] = useState("survey");
  const [study, setStudy] = useState({});
  const [studyID, setStudyID] = useState("");

  const render = {
    fetch: <FetchStudy setTab={setTab} setStudyID={setStudyID} setStudy={setStudy} />,
    fields: <ModifyFields setTab={setTab} study={study} setStudy={setStudy} />,
    survey: <ModifySurvey setTab={setTab} study={study} setStudy={setStudy} />,
    consent: <ConsentForm setTab={setTab} study={study} studyID={studyID} />,
  };

  return <Form>{render[tab]}</Form>;
}

const Form = styled(Card)`
  width: 100%;
`;

export default CreateStudy;
