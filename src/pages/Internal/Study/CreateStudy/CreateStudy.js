import { useState } from "react";
import { useHistory, useTriggerToast, useWizard } from "hooks";
import { study } from "database/mutations";

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

  const [newStudy, setNewStudy] = useState({
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

    study
      .create(newStudy)
      .then((doc) => history.push(`/study/${doc.id}/details`))
      .catch(() => triggerToast(toasts.publishedStudy))
      .finally(() => setLoading(false));
  };

  const steps = [
    <Details
      key={0}
      newStudy={newStudy}
      setNewStudy={setNewStudy}
      handleBack={handleBefore}
      handleNext={handleNext}
    />,
    <Locations
      key={1}
      newStudy={newStudy}
      setNewStudy={setNewStudy}
      handleBack={handleBack}
      handleNext={handleNext}
    />,
    <Questions
      key={2}
      newStudy={newStudy}
      setNewStudy={setNewStudy}
      handleBack={handleBack}
      handleNext={handleNext}
    />,
    <Resources
      key={3}
      newStudy={newStudy}
      setNewStudy={setNewStudy}
      handleBack={handleBack}
      handleNext={handleNext}
    />,
    <Review
      key={4}
      loading={loading}
      newStudy={newStudy}
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
