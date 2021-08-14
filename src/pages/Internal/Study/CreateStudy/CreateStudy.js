import { useState } from "react";
import { useWizard } from "hooks";

import WizardFormSteps from "components/complex/WizardForm/WizardFormSteps";
import Details from "./Details";

function CreateStudy() {
  const { stepIndex, handleBack, handleNext, handleSelect } = useWizard(4);

  const handleCreate = () => {};

  const [study, setStudy] = useState({
    title: "",
    description: "",

    sex: "All",
    minAge: 0,
    maxAge: 100,
    acceptsHealthyVolunteers: false,
    type: "Interventional",

    conditions: [],
    locations: [],
    questions: [],
  });

  const steps = [
    <Details key={0} handleNext={handleNext} />,
    <div key={1}>Locations</div>,
    <div key={2}>Screening</div>,
    <div key={3}>Review</div>,
  ];

  return (
    <>
      <WizardFormSteps
        stepIndex={stepIndex}
        numberOfSteps={steps.length}
        handleSelect={handleSelect}
      />
      {steps[stepIndex]}
    </>
  );
}

export default CreateStudy;
