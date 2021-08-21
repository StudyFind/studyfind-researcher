import { Button } from "@chakra-ui/react";

import QuestionsTable from "components/feature/Study/QuestionsView/QuestionsTable";
import QuestionsEmpty from "components/feature/Study/QuestionsView/QuestionsEmpty";
import TabHeader from "../TabHeader";

function QuestionsView({ study, setEdit }) {
  const handleEdit = () => {
    setEdit(true);
  };

  if (!study?.questions?.length) {
    return <QuestionsEmpty onButtonClick={handleEdit} />;
  }

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
