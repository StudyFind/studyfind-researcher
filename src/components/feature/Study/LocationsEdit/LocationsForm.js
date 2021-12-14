import { useLocationsForm } from "hooks";

import LocationsInputs from "./LocationsInputs";
import { FormLabel, Switch, Grid } from "@chakra-ui/react";
import { useState } from "react";

function LocationsForm({ study, onSubmit, Wrapper }) {
  const locationsForm = useLocationsForm(study, onSubmit);
  const [isRemote, setIsRemote] = useState(study?.isRemote);
  const updateRemote = () => setIsRemote((prev) => !prev);

  const title = "Locations";
  const description =
    "Please list out the addresses of your study locations precisely how they would be formatted on google maps so that you may find participants in the surrounding areas. If your study is remote, please indicate that here.";

  const handleSubmit = () => {
    const isValid = locationsForm.validate();

    if (isValid) {
      onSubmit(locationsForm.values, isRemote);
    }
  };

  return (
    <Wrapper
      title={title}
      description={description}
      handleSubmit={handleSubmit}
      details="Remote"
    >
      <Grid display="flex" alignItems="center" gap="2px">
        <FormLabel htmlFor="remote">Remote Study:</FormLabel>
        <Switch id="remote" value={isRemote} onChange={updateRemote}></Switch>
      </Grid>
      {!isRemote && (
        <LocationsInputs
          values={locationsForm.values}
          errors={locationsForm.errors}
          hasChanged={locationsForm.hasChanged}
          notDefault={locationsForm.notDefault}
          createLocation={locationsForm.create}
          updateLocation={locationsForm.update}
          deleteLocation={locationsForm.delete}
          clearLocations={locationsForm.clear}
          resetLocations={locationsForm.reset}
          sortLocations={locationsForm.onSortEnd}
        />
      )}
    </Wrapper>
  );
}

export default LocationsForm;
