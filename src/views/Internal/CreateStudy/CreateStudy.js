import React, { useState, useEffect } from "react";

import { Card } from "components";

import FetchStudy from "./FetchStudy";
import ConsentForm from "./ConsentForm";
import ModifyFields from "./ModifyFields";
import ModifySurvey from "./ModifySurvey";

function CreateStudy() {
  const [tab, setTab] = useState("fetch");
  const [study, setStudy] = useState();
  const [studyID, setStudyID] = useState();

  const render = {
    fetch: <FetchStudy setTab={setTab} setStudyID={setStudyID} setStudy={setStudy} />,
    fields: <ModifyFields setTab={setTab} study={study} setStudy={setStudy} />,
    survey: <ModifySurvey setTab={setTab} study={study} setStudy={setStudy} />,
    consent: <ConsentForm setTab={setTab} study={study} studyID={studyID} />,
  };

  return <Card>{render[tab]}</Card>;
}

export default CreateStudy;
