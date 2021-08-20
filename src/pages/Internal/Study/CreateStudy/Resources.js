import { useEffect } from "react";
import { useResourcesInputs } from "hooks";

import { Box, Heading, Text } from "@chakra-ui/react";

import ResourcesInputs from "components/feature/Study/ResourcesInputs/ResourcesInputs";
import WizardFormButton from "components/complex/WizardForm/WizardFormButtons";

function Resources({ newStudy, setNewStudy, handleBack, handleNext }) {
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
  } = useResourcesInputs(newStudy, (data) => {
    setNewStudy((prev) => ({ ...prev, resources: data }));
    handleNext();
  });

  useEffect(() => {
    if (!hasChanged && !notDefault) {
      createResource();
      createResource();
      createResource();
    }
  }, []);

  return (
    <Box paddingY="20px">
      <Heading>Resources</Heading>
      <Text color="gray.500" paddingTop="5px" paddingBottom="10px">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      </Text>
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
    </Box>
  );
}

export default Resources;
