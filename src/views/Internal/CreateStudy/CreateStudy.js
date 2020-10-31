import React, { useState } from "react";

import { Card } from "components";

import FetchStudy from "./FetchStudy";
import ConsentForm from "./ConsentForm";
import ModifyFields from "./ModifyFields";
import ModifySurvey from "./ModifySurvey";

function CreateStudy() {
  const [tab, setTab] = useState("Fetch Study");

  return (
    <Card
      current={tab}
      handleSelect={setTab}
      tabs={["Fetch Study", "Edit Fields", "Edit Survey", "Consent Form"]}
    >
      <FetchStudy tab="Fetch Study" />
      <ModifyFields tab="Edit Fields" />
      <ModifySurvey tab="Edit Survey" />
      <ConsentForm tab="Consent Form" />
    </Card>
  );
}

export default CreateStudy;
