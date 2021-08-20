import { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";

import LocationsInputs from "components/feature/Study/LocationsInputs/LocationsInputs";
import TabHeader from "../TabHeader";

function Locations({ study, setEdit }) {
  const [values, setValues] = useState([]);
  const [errors, setErrors] = useState([]);

  const hasChanged = JSON.stringify(values) !== JSON.stringify(study.locations);

  const validate = (values) => {
    return values.map((l) => !l);
  };

  const createLocation = () => {
    setValues((prev) => prev.concat(""));
    setErrors((prev) => prev.concat(false));
  };

  const updateLocation = (index, value) => {
    setValues((prev) => prev.map((l, i) => (index === i ? value : l)));
    setErrors((prev) => prev.map((l, i) => (index === i ? !value : l)));
  };

  const deleteLocation = (index) => {
    setValues((prev) => prev.filter((_, i) => i !== index));
    setErrors((prev) => prev.filter((_, i) => i !== index));
  };

  const clearLocations = () => {
    setValues([]);
    setErrors([]);
  };

  const resetLocations = () => {
    setValues(study.locations);
    setErrors(validate(study.locations));
  };

  const handleCancel = () => {
    setEdit(false);
  };

  const handleSaveChanges = () => {
    setEdit(false);
  };

  const sortLocations = ({ oldIndex, newIndex }) => {
    setValues((prev) => {
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
        values={values}
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

export default Locations;
