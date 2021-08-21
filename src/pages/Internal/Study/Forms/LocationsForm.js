import { useLocationsInputs } from "hooks";

import LocationsInputs from "components/feature/Study/LocationsInputs/LocationsInputs";

function LocationsForm({ study, onSubmit, Wrapper }) {
  const locations = useLocationsInputs(study, onSubmit);

  const title = "Locations";
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation";

  const handleSubmit = () => {
    const isValid = locations.validate();

    if (isValid) {
      onSubmit(locations.values);
    }
  };

  return (
    <Wrapper title={title} description={description} handleSubmit={handleSubmit}>
      <LocationsInputs
        values={locations.values}
        errors={locations.errors}
        hasChanged={locations.hasChanged}
        notDefault={locations.notDefault}
        createLocation={locations.create}
        updateLocation={locations.update}
        deleteLocation={locations.delete}
        clearLocations={locations.clear}
        resetLocations={locations.reset}
        sortLocations={locations.onSortEnd}
      />
    </Wrapper>
  );
}

export default LocationsForm;
