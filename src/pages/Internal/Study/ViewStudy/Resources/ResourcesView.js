import { Button } from "@chakra-ui/react";

import ResourcesEmpty from "components/feature/Study/ResourcesView/ResourcesEmpty";
import ResourcesList from "components/feature/Study/ResourcesView/ResourcesList";
import TabHeader from "../TabHeader";

function ResourcesView({ study, setEdit }) {
  const handleEdit = () => {
    setEdit(true);
  };

  if (!study?.resources?.length) {
    return <ResourcesEmpty onButtonClick={handleEdit} />;
  }

  return (
    <>
      <TabHeader heading="Resources">
        <Button colorScheme="blue" onClick={handleEdit}>
          Edit Resources
        </Button>
      </TabHeader>
      <ResourcesList resources={study.resources} />
    </>
  );
}

export default ResourcesView;
