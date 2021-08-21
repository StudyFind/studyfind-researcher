import { useDetailsInputs } from "hooks";

import DetailsInputs from "components/feature/Study/DetailsInputs/DetailsInputs";

function DetailsForm({ study, onSubmit, Wrapper }) {
  const {
    values,
    errors,
    hasChanged,
    notDefault,
    handleReset,
    handleClear,
    handleChange,
    handleSubmit,
  } = useDetailsInputs(study, onSubmit);

  const title = "Details";
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation";

  return (
    <Wrapper title={title} description={description} handleSubmit={handleSubmit}>
      <DetailsInputs
        values={values}
        errors={errors}
        hasChanged={hasChanged}
        notDefault={notDefault}
        handleReset={handleReset}
        handleClear={handleClear}
        handleChange={handleChange}
      />
    </Wrapper>
  );
}

export default DetailsForm;
