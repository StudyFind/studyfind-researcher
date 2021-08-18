import { useDetails } from "hooks";
import { Button } from "@chakra-ui/react";

import DetailsInputs from "components/feature/Study/DetailsInputs/DetailsInputs";
import TabHeader from "../TabHeader";

function DetailsEdit({ study, setEdit }) {
  const { values, errors, hasChanged, handleChange, handleClear, handleReset, handleSubmit } =
    useDetails(study, (data) => {
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
        handleReset={handleReset}
        handleClear={handleClear}
        handleChange={handleChange}
      />
    </>
  );
}

export default DetailsEdit;
