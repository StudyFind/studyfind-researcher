import { useResourcesForm } from "hooks";

import ResourcesInputs from "./ResourcesInputs";

function ResourcesForm({ study, onSubmit, Wrapper }) {
  const resourcesForm = useResourcesForm(study, onSubmit);

  const title = "Resources";
  const description =
    "Please list out any study resources including but not limited to flyers or surveys (names along with links) that may be useful for a participant to have quick access to.";

  const handleSubmit = () => {
    const isValid = resourcesForm.validate();

    if (isValid) {
      onSubmit(resourcesForm.values);
    }
  };

  return (
    <Wrapper
      title={title}
      description={description}
      handleSubmit={handleSubmit}
    >
      <ResourcesInputs
        values={resourcesForm.values}
        errors={resourcesForm.errors}
        hasChanged={resourcesForm.hasChanged}
        notDefault={resourcesForm.notDefault}
        createResource={resourcesForm.create}
        updateResource={resourcesForm.update}
        deleteResource={resourcesForm.delete}
        clearResources={resourcesForm.clear}
        resetResources={resourcesForm.reset}
        sortResources={resourcesForm.onSortEnd}
      />
    </Wrapper>
  );
}

export default ResourcesForm;
