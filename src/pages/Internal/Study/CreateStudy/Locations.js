import { useLocationsInputs } from "hooks";

import { Box, Heading, Text } from "@chakra-ui/react";

import LocationsInputs from "components/feature/Study/LocationsInputs/LocationsInputs";
import WizardFormButton from "components/complex/WizardForm/WizardFormButtons";

function Locations({ newStudy, setNewStudy, handleBack, handleNext }) {
  const {
    values,
    errors,
    hasChanged,
    notDefault,
    createLocation,
    updateLocation,
    deleteLocation,
    clearLocations,
    resetLocations,
    sortLocations,
    handleSubmit,
  } = useLocationsInputs(newStudy, (data) => {
    setNewStudy((prev) => ({ ...prev, locations: data }));
    handleNext();
  });

  return (
    <Box paddingY="20px">
      <Heading>Locations</Heading>
      <Text color="gray.500" paddingTop="5px" paddingBottom="10px">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      </Text>
      <LocationsInputs
        values={values}
        errors={errors}
        hasChanged={hasChanged}
        notDefault={notDefault}
        createLocation={createLocation}
        updateLocation={updateLocation}
        deleteLocation={deleteLocation}
        clearLocations={clearLocations}
        resetLocations={resetLocations}
        sortLocations={sortLocations}
      />
      <WizardFormButton handleBack={handleBack} handleNext={handleSubmit} />
    </Box>
  );
}

export default Locations;
