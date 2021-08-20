import { useDetailsInputs } from "hooks";
import { Button } from "@chakra-ui/react";
import { study as researchStudy } from "database/mutations";

import DetailsInputs from "components/feature/Study/DetailsInputs/DetailsInputs";
import TabHeader from "../TabHeader";

function DetailsEdit({ study, setEdit }) {
  const {
    values,
    errors,
    hasChanged,
    notDefault,
    handleReset,
    handleClear,
    handleChange,
    handleSubmit,
  } = useDetailsInputs(study, (data) => {
    researchStudy.update({ ...study, ...data });
    setEdit(false);
  });

  const handleCancel = () => {
    setEdit(false);
  };

  return (
    <>
      <TabHeader heading="Details">
        <Button onClick={handleCancel}>Cancel</Button>
        <Button colorScheme="green" onClick={handleSubmit}>
          Save Changes
        </Button>
      </TabHeader>
      <DetailsInputs
        values={values}
        errors={errors}
        hasChanged={hasChanged}
        notDefault={notDefault}
        handleReset={handleReset}
        handleClear={handleClear}
        handleChange={handleChange}
      />
    </>
  );
}

export default DetailsEdit;
