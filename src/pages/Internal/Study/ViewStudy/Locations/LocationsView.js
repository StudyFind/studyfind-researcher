import { Button } from "@chakra-ui/react";
import { Message } from "components";

import LocationsList from "components/feature/Study/LocationsView/LocationsList";
import TabHeader from "../TabHeader";

function LocationsView({ study, setEdit }) {
  const handleEdit = () => {
    setEdit(true);
  };

  if (!study?.locations?.length) {
    return (
      <Message
        title="No Locations"
        description="Locations are used when filtering for users trying to find studies near them and therefore adding locations improves their chances of finding your study"
        height="300px"
        showBackground
      >
        <Button onClick={() => setEdit(true)}>Add Locations</Button>
      </Message>
    );
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
