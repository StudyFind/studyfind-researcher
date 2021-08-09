import EligibilityHead from "./EligiblityHead";
import EligibilityForm from "./EligiblityForm";

function Eligibility({ study, handleBack, handleNext }) {
  return (
    <>
      <EligibilityHead />
      <EligibilityForm study={study} handleBack={handleBack} handleNext={handleNext} />
    </>
  );
}

export default Eligibility;
