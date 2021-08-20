import { useLocationsInputs } from "hooks";
import { Button } from "@chakra-ui/react";
import { study as researchStudy } from "database/mutations";

import LocationsInputs from "components/feature/Study/LocationsInputs/LocationsInputs";
import TabHeader from "../TabHeader";

function LocationsEdit({ study, setEdit }) {
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
  } = useLocationsInputs(study, (data) => {
    researchStudy.update({ ...study, locations: data });
    setEdit(false);
  });

  const handleCancel = () => {
    resetLocations();
    setEdit(false);
  };

  return (
    <>
      <TabHeader heading="Locations">
        <Button onClick={handleCancel}>Cancel</Button>
        <Button colorScheme="green" onClick={handleSubmit}>
          Save Changes
        </Button>
      </TabHeader>
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
    </>
  );
}

export default LocationsEdit;
