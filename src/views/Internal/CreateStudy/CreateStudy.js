import React from "react";

import { Card } from "components";

import FetchStudy from "./FetchStudy";
import ConsentForm from "./ConsentForm";
import ModifyFields from "./ModifyFields";
import ModifySurvey from "./ModifySurvey";

function CreateStudy() {
  return (
    <Card>
      <FetchStudy />
      <ModifyFields />
      <ModifySurvey />
      <ConsentForm />
    </Card>
  );
}

export default CreateStudy;
