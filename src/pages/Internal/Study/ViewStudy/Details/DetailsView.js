import { Button } from "@chakra-ui/react";
import TabHeader from "../TabHeader";
import StudyCardLarge from "components/feature/Study/StudyCard/StudyCardLarge";

function DetailsView({ study, setEdit }) {
  const handleEdit = () => {
    setEdit(true);
  };

  return (
    <>
      <TabHeader heading="Details">
        <Button colorScheme="blue" onClick={handleEdit}>
          Edit Details
        </Button>
      </TabHeader>
      <StudyCardLarge study={study} />
    </>
  );
}

export default DetailsView;
