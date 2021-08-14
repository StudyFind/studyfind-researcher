import { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";

import LocationsInputs from "components/feature/Study/LocationsInputs/LocationsInputs";
import TabHeader from "../TabHeader";

function LocationsEdit({ study, setEdit }) {
  const [inputs, setInputs] = useState([]);
  const [errors, setErrors] = useState([]);

  const hasChanged = JSON.stringify(inputs) !== JSON.stringify(study.locations);

  const validate = (inputs) => {
    return inputs.map((l) => !l);
  };

  const createLocation = () => {
    setInputs((prev) => prev.concat(""));
    setErrors((prev) => prev.concat(false));
  };

  const updateLocation = (index, value) => {
    setInputs((prev) => prev.map((l, i) => (index === i ? value : l)));
    setErrors((prev) => prev.map((l, i) => (index === i ? !value : l)));
  };

  const deleteLocation = (index) => {
    setInputs((prev) => prev.filter((_, i) => i !== index));
    setErrors((prev) => prev.filter((_, i) => i !== index));
  };

  const clearLocations = () => {
    setInputs([]);
    setErrors([]);
  };

  const resetLocations = () => {
    setInputs(study.locations);
    setErrors(validate(study.locations));
  };

  const handleCancel = () => {
    setEdit(false);
  };

  const handleSaveChanges = () => {
    setEdit(false);
  };

  const sortLocations = ({ oldIndex, newIndex }) => {
    setInputs((prev) => {
      const updated = [...prev];
      const removed = updated.splice(oldIndex, 1);
      updated.splice(newIndex, 0, removed[0]);
      return updated;
    });
  };

  useEffect(() => {
    if (study) {
      resetLocations();
    }
  }, [study]);

  return (
    <>
      <TabHeader heading="Locations">
        <Button onClick={handleCancel}>Cancel</Button>
        <Button colorScheme="green" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </TabHeader>
      <LocationsInputs
        inputs={inputs}
        errors={errors}
        hasChanged={hasChanged}
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
