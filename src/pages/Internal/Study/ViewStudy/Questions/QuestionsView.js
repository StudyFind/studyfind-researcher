import { Button } from "@chakra-ui/react";
import TabHeader from "../TabHeader";
import QuestionsTable from "components/feature/Study/QuestionsTable/QuestionsTable";

function QuestionsView({ study, setEdit }) {
  const handleEdit = () => {
    setEdit(true);
  };

  return (
    <>
      <TabHeader heading="Questions">
        <Button colorScheme="blue" onClick={handleEdit}>
          Edit Questions
        </Button>
      </TabHeader>
      <QuestionsTable questions={study.questions} />
    </>
  );
}

export default QuestionsView;
