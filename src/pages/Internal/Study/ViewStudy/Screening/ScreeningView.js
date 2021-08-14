import { Button } from "@chakra-ui/react";
import TabHeader from "../TabHeader";
import ScreeningTable from "components/feature/Study/ScreeningTable/ScreeningTable";

function ScreeningView({ study, setEdit }) {
  const handleEdit = () => {
    setEdit(true);
  };

  return (
    <>
      <TabHeader heading="Screening">
        <Button colorScheme="blue" onClick={handleEdit}>
          Edit Screening
        </Button>
      </TabHeader>
      <ScreeningTable questions={study.questions} />
    </>
  );
}

export default ScreeningView;
