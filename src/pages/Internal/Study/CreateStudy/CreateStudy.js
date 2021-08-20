import { useState } from "react";
import { useHistory, useTriggerToast, useWizard } from "hooks";
import { study as researchStudy } from "database/mutations";

import WizardFormSteps from "components/complex/WizardForm/WizardFormSteps";

import Details from "./Details";
import Locations from "./Locations";
import Questions from "./Questions";
import Resources from "./Resources";
import Review from "./Review";
import { toasts } from "templates";

function CreateStudy() {
  const { stepIndex, handleBack, handleNext, handleSelect } = useWizard(5);

  const history = useHistory();
  const triggerToast = useTriggerToast();

  const [study, setStudy] = useState({
    title: "",
    description: "",

    sex: "All",
    minAge: 0,
    maxAge: 100,
    acceptsHealthyVolunteers: false,
    type: "Observational",
    conditions: [],

    locations: [],
    questions: [],
    resources: [],
  });

  const [loading, setLoading] = useState(false);

  const handleBefore = () => {
    history.push("/");
  };

  const handleSubmit = () => {
    setLoading(true);

    researchStudy
      .create(study)
      .then((doc) => history.push(`/study/${doc.id}/details`))
      .catch(() => triggerToast(toasts.publishedStudy))
      .finally(() => setLoading(false));
  };

  const steps = [
    <Details
      key={0}
      study={study}
      setStudy={setStudy}
      handleBack={handleBefore}
      handleNext={handleNext}
    />,
    <Locations
      key={1}
      study={study}
      setStudy={setStudy}
      handleBack={handleBack}
      handleNext={handleNext}
    />,
    <Questions
      key={2}
      study={study}
      setStudy={setStudy}
      handleBack={handleBack}
      handleNext={handleNext}
    />,
    <Resources
      key={3}
      study={study}
      setStudy={setStudy}
      handleBack={handleBack}
      handleNext={handleNext}
    />,
    <Review
      key={4}
      loading={loading}
      study={study}
      handleBack={handleBack}
      handleSubmit={handleSubmit}
    />,
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
