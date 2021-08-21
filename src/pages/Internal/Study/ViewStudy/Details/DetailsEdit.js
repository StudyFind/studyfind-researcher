import { Button } from "@chakra-ui/react";
import { study as researchStudy } from "database/mutations";

import DetailsForm from "../../Forms/DetailsForm";
import TabHeader from "../TabHeader";

function DetailsEdit({ study, setEdit }) {
  const handleUpdate = (data) => {
    researchStudy.update(study.id, { ...study, ...data });
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

  return <DetailsForm study={study} onSubmit={handleUpdate} Wrapper={Wrapper} />;
}

export default DetailsEdit;
