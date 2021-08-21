import { Button } from "@chakra-ui/react";

import LocationsEmpty from "components/feature/Study/LocationsView/LocationsEmpty";
import LocationsList from "components/feature/Study/LocationsView/LocationsList";
import TabHeader from "../TabHeader";

function LocationsView({ study, setEdit }) {
  const handleEdit = () => {
    setEdit(true);
  };

  if (!study?.locations?.length) {
    return <LocationsEmpty onButtonClick={handleEdit} />;
  }

  return (
    <>
      <TabHeader heading="Locations">
        <Button colorScheme="blue" onClick={handleEdit}>
          Edit Locations
        </Button>
      </TabHeader>
      <LocationsList locations={study.locations} />
    </>
  );
}

export default LocationsView;
