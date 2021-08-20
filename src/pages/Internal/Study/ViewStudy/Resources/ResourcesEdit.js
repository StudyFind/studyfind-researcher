import { useResourcesInputs } from "hooks";
import { Button } from "@chakra-ui/react";
import { study as researchStudy } from "database/mutations";

import TabHeader from "../TabHeader";
import ResourcesInputs from "components/feature/Study/ResourcesInputs/ResourcesInputs";

function ResourcesEdit({ study, setEdit }) {
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
    researchStudy.update({ ...study, resources: data });
    setEdit(false);
  });

  const handleCancel = () => {
    setEdit(false);
  };

  return (
    <>
      <TabHeader heading="Resources">
        <Button onClick={handleCancel}>Cancel</Button>
        <Button colorScheme="green" onClick={handleSubmit}>
          Save Changes
        </Button>
      </TabHeader>
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
    </>
  );
}

export default ResourcesEdit;
