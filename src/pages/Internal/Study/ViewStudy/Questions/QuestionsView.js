import { Button } from "@chakra-ui/react";

import QuestionsTable from "components/feature/Study/QuestionsView/QuestionsTable";
import TabHeader from "../TabHeader";

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
