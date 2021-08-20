import { useDetailsInputs } from "hooks";

import DetailsInputs from "components/feature/Study/DetailsInputs/DetailsInputs";
import WizardFormButton from "components/complex/WizardForm/WizardFormButtons";
import CreateStudyWrapper from "./CreateStudyWrapper";

function Details({ newStudy, setNewStudy, handleNext }) {
  const {
    values,
    errors,
    hasChanged,
    notDefault,
    handleReset,
    handleClear,
    handleChange,
    handleSubmit,
  } = useDetailsInputs(newStudy, (data) => {
    setNewStudy((prev) => ({ ...prev, ...data }));
    handleNext();
  });

  return (
    <CreateStudyWrapper
      title="Details"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"
    >
      <DetailsInputs
        values={values}
        errors={errors}
        hasChanged={hasChanged}
        notDefault={notDefault}
        handleReset={handleReset}
        handleClear={handleClear}
        handleChange={handleChange}
      />
      <WizardFormButton isFirstStep handleNext={handleSubmit} />
    </CreateStudyWrapper>
  );
}

export default Details;
