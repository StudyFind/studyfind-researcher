import { useLocationsForm } from "hooks";

import LocationsInputs from "./LocationsInputs";

function LocationsForm({ study, onSubmit, Wrapper }) {
  const locationsForm = useLocationsForm(study, onSubmit);

  const title = "Locations";
  const description =
    "Please list out the addresses of your study locations precisely how they would be formatted on google maps so that you may find participants in the surrounding areas.";

  const handleSubmit = () => {
    const isValid = locationsForm.validate();

    if (isValid) {
      onSubmit(locationsForm.values);
    }
  };

  return (
    <Wrapper
      title={title}
      description={description}
      handleSubmit={handleSubmit}
    >
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
    </Wrapper>
  );
}

export default LocationsForm;
