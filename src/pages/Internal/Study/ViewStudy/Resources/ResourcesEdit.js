import { Button } from "@chakra-ui/react";
import { study as researchStudy } from "database/mutations";

import ResourcesForm from "components/feature/Study/ResourcesForm/ResourcesForm";
import TabHeader from "../TabHeader";

function ResourcesEdit({ study, setEdit }) {
  const handleUpdate = (data) => {
    researchStudy.update(study.id, { ...study, resources: data });
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

  return <ResourcesForm study={study} onSubmit={handleUpdate} Wrapper={Wrapper} />;
}

export default ResourcesEdit;
