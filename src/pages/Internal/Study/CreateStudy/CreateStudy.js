import { useState } from "react";
import { useHistory, useTriggerToast, useWizard } from "hooks";
import { study as researchStudy } from "database/mutations";
import { toasts } from "templates";

import CreateStudyWrapper from "./CreateStudyWrapper";
import WizardFormSteps from "components/complex/WizardForm/WizardFormSteps";
import WizardFormButton from "components/complex/WizardForm/WizardFormButtons";

import DetailsForm from "components/feature/Study/DetailsEdit/DetailsForm";
import LocationsForm from "components/feature/Study/LocationsEdit/LocationsForm";
import QuestionsForm from "components/feature/Study/QuestionsEdit/QuestionsForm";
import ResourcesForm from "components/feature/Study/ResourcesEdit/ResourcesForm";
import Review from "./Review";

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

    isRemote: false,
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
      .then((doc) => {
        history.push(`/study/${doc.id}/details`);
        triggerToast(toasts.createdStudy);
      })
      .catch(() => triggerToast(toasts.connectionError))
      .finally(() => setLoading(false));
  };

  const extraProps = [
    {
      handleBack: handleBefore,
      isFirstStep: true,
    },
    {},
    {},
    {},
    {
      loading,
      handleBack,
      handleSubmit: handleSubmit,
      isFinalStep: true,
    },
  ];

  const Wrapper = ({ children, title, description, handleSubmit }) => (
    <CreateStudyWrapper title={title} description={description}>
      {children}
      <WizardFormButton
        handleNext={handleSubmit}
        handleBack={handleBack}
        {...extraProps[stepIndex]}
      />
    </CreateStudyWrapper>
  );

  const goBack = (n) => {
    for (let i = 0; i < n; i++) {
      handleBack();
    }
  };

  const handleContinue = (updatedFields) => {
    setStudy((prev) => ({ ...prev, ...updatedFields }));
    handleNext();
  };

  const handleDetails = (data) => handleContinue(data);
  const handleLocations = (locationData, remote) =>
    handleContinue({ locations: locationData, remote: remote });
  const handleQuestions = (data) => handleContinue({ questions: data });
  const handleResources = (data) => handleContinue({ resources: data });

  const steps = [
    <DetailsForm
      key={0}
      study={study}
      onSubmit={handleDetails}
      Wrapper={Wrapper}
    />,
    <LocationsForm
      key={1}
      study={study}
      onSubmit={handleLocations}
      Wrapper={Wrapper}
    />,
    <QuestionsForm
      key={2}
      study={study}
      onSubmit={handleQuestions}
      Wrapper={Wrapper}
    />,
    <ResourcesForm
      key={3}
      study={study}
      onSubmit={handleResources}
      Wrapper={Wrapper}
    />,
    <Review key={4} study={study} goBack={goBack} Wrapper={Wrapper} />,
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
