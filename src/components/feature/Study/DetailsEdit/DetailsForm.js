import { useDetailsForm } from "hooks";

import DetailsInputs from "./DetailsInputs";

function DetailsForm({ study, onSubmit, Wrapper }) {
  const detailsForm = useDetailsForm(study, onSubmit);

  const title = "Details";
  const description =
    "StudyFind strives to make research studies as accessible as possible. To achieve this, we ask that you simplify the language used in the study title and description. This will make the study more readable for the general population and will lead to improvements in partipant recruitment.";

  const handleSubmit = () => {
    const isValid = detailsForm.validate();

    if (isValid) {
      onSubmit(detailsForm.values);
    }
  };

  return (
    <Wrapper
      title={title}
      description={description}
      handleSubmit={handleSubmit}
    >
      <DetailsInputs
        values={detailsForm.values}
        errors={detailsForm.errors}
        hasChanged={detailsForm.hasChanged}
        notDefault={detailsForm.notDefault}
        handleReset={detailsForm.reset}
        handleClear={detailsForm.clear}
        handleChange={detailsForm.update}
      />
    </Wrapper>
  );
}

export default DetailsForm;
