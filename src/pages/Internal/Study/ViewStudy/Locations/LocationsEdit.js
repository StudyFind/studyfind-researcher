import { Button } from "@chakra-ui/react";
import { study as researchStudy } from "database/mutations";

import LocationsForm from "components/feature/Study/LocationsForm/LocationsForm";
import TabHeader from "../TabHeader";

function LocationsEdit({ study, setEdit }) {
  const handleUpdate = (data) => {
    researchStudy.update(study.id, { ...study, locations: data });
    setEdit(false);
  };

  const handleCancel = () => {
    setEdit(false);
  };

  const Wrapper = ({ children, title, handleSubmit }) => (
    <>
      <TabHeader heading={title}>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button colorScheme="green" onClick={handleSubmit}>
          Save Changes
        </Button>
      </TabHeader>
      {children}
    </>
  );

  return <LocationsForm study={study} onSubmit={handleUpdate} Wrapper={Wrapper} />;
}

export default LocationsEdit;
