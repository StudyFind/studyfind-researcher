import { useState } from "react";
import { useHistory, useWizard } from "hooks";

import WizardFormSteps from "components/complex/WizardForm/WizardFormSteps";
import Details from "./Details";
// import Locations from "./Locations";

function CreateStudy() {
  const { stepIndex, handleBack, handleNext, handleSelect } = useWizard(4);

  const history = useHistory();

  const handleBefore = () => {
    history.push("/");
  };

  const handleSubmit = () => {};

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
    <Details
      key={0}
      study={study}
      setStudy={setStudy}
      handleBack={handleBefore}
      handleNext={handleNext}
    />,
    // <Locations key={1} setStudy={setStudy} handleBack={handleBack} handleNext={handleNext} />,
    // <Resources key={2} setStudy={setStudy} handleBack={handleBack} handleNext={handleNext} />,
    // <Questions key={3} setStudy={setStudy} handleBack={handleBack} handleNext={handleNext} />,
    // <Review key={4} handleBack={handleBack} handleSubmit={handleSubmit} />,
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
