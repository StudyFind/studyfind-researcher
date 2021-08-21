import { Button } from "@chakra-ui/react";
import { study as researchStudy } from "database/mutations";

import QuestionsForm from "components/feature/Study/QuestionsEdit/QuestionsForm";
import TabHeader from "../TabHeader";

function QuestionsEdit({ study, setEdit }) {
  const handleUpdate = (data) => {
    researchStudy.update(study.id, { ...study, questions: data });
    setEdit(false);
  };

  const handleCancel = () => {
    setEdit(false);
  };

  const Wrapper = ({ children, title, handleSubmit }) => (
    <>
      <TabHeader heading={title}>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button colorScheme="green" onClick={handleSubmit}>
          Save Changes
        </Button>
      </TabHeader>
      {children}
    </>
  );

  return <QuestionsForm study={study} onSubmit={handleUpdate} Wrapper={Wrapper} />;
}

export default QuestionsEdit;
