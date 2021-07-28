import DetailsHead from "./DetailsHead";
import DetailsForm from "./DetailsForm";

function Details({ study, handleBack, handleNext }) {
  return (
    <>
      <DetailsHead />
      <DetailsForm study={study} handleBack={handleBack} handleNext={handleNext} />
    </>
  );
}

export default Details;
