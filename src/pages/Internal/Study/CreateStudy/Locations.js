import { useLocationsInputs } from "hooks";

import LocationsInputs from "components/feature/Study/LocationsInputs/LocationsInputs";
import WizardFormButton from "components/complex/WizardForm/WizardFormButtons";
import CreateStudyWrapper from "./CreateStudyWrapper";

function Locations({ study, setStudy, handleBack, handleNext }) {
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
    setStudy((prev) => ({ ...prev, locations: data }));
    handleNext();
  });

  return (
    <CreateStudyWrapper
      title="Locations"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"
    >
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
    </CreateStudyWrapper>
  );
}

export default Locations;
