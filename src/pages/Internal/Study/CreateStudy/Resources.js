import { useResourcesInputs } from "hooks";

import ResourcesInputs from "components/feature/Study/ResourcesInputs/ResourcesInputs";
import WizardFormButton from "components/complex/WizardForm/WizardFormButtons";
import CreateStudyWrapper from "./CreateStudyWrapper";

function Resources({ study, setStudy, handleBack, handleNext }) {
  const {
    values,
    errors,
    hasChanged,
    notDefault,
    createResource,
    updateResource,
    deleteResource,
    clearResources,
    resetResources,
    sortResources,
    handleSubmit,
  } = useResourcesInputs(study, (data) => {
    setStudy((prev) => ({ ...prev, resources: data }));
    handleNext();
  });

  return (
    <CreateStudyWrapper
      title="Resources"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"
    >
      <ResourcesInputs
        values={values}
        errors={errors}
        hasChanged={hasChanged}
        notDefault={notDefault}
        createResource={createResource}
        updateResource={updateResource}
        deleteResource={deleteResource}
        clearResources={clearResources}
        resetResources={resetResources}
        sortResources={sortResources}
      />
      <WizardFormButton handleBack={handleBack} handleNext={handleSubmit} />
    </CreateStudyWrapper>
  );
}

export default Resources;
