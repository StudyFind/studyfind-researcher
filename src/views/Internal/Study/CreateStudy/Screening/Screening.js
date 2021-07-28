import ScreeningHead from "./ScreeningHead";
import ScreeningGrid from "./ScreeningGrid";

function Screening({ study, handleBack, handleNext }) {
  return (
    <>
      <ScreeningHead />
      <ScreeningGrid study={study} handleBack={handleBack} handleNext={handleNext} />
    </>
  );
}

export default Screening;
