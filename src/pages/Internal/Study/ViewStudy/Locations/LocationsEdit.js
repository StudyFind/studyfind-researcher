import { useState } from "react";

import { Button } from "@chakra-ui/react";
import { study as researchStudy } from "database/mutations";

import LocationsForm from "components/feature/Study/LocationsEdit/LocationsForm";
import TabHeader from "../TabHeader";

function LocationsEdit({ study, setEdit }) {
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdate = (data) => {
    setIsSaving(true);
    researchStudy.update(study.id, { ...study, locations: data }).then(() => {
      setIsSaving(false);
      setEdit(false);
    });
  };

  const handleCancel = () => {
    setEdit(false);
  };

  const Wrapper = ({ children, title, handleSubmit }) => (
    <>
      <TabHeader heading={title}>
        <Button onClick={handleCancel} isDisabled={isSaving}>
          Cancel
        </Button>
        <Button
          colorScheme="green"
          onClick={handleSubmit}
          isLoading={isSaving}
          loadingText="Saving"
        >
          Save Changes
        </Button>
      </TabHeader>
      {children}
    </>
  );

  return <LocationsForm study={study} onSubmit={handleUpdate} Wrapper={Wrapper} />;
}

export default LocationsEdit;
