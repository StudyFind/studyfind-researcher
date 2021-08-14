import { Button } from "@chakra-ui/react";
import TabHeader from "../TabHeader";
import LocationsList from "components/feature/Study/LocationsList/LocationsList";

function LocationsView({ study, setEdit }) {
  const handleEdit = () => {
    setEdit(true);
  };

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
