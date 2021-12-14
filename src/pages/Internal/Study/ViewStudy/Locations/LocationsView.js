import { Button } from "@chakra-ui/react";

import LocationsEmpty from "components/feature/Study/LocationsView/LocationsEmpty";
import LocationsList from "components/feature/Study/LocationsView/LocationsList";
import TabHeader from "../TabHeader";
import { Text } from "@chakra-ui/react";

function LocationsView({ study, setEdit }) {
  const handleEdit = () => {
    setEdit(true);
  };

  if (!study?.locations?.length && study?.isRemote === false) {
    return <LocationsEmpty onButtonClick={handleEdit} />;
  }

  return (
    <>
      <TabHeader heading="Locations">
        <Button colorScheme="blue" onClick={handleEdit}>
          Edit Locations
        </Button>
      </TabHeader>
      {study?.isRemote ? (
        <Text textColor="gray.500" fontSize="20px">
          This study is currently remote.
        </Text>
      ) : (
        <LocationsList locations={study.locations} />
      )}
    </>
  );
}

export default LocationsView;
