import ScreeningHead from "./ScreeningHead";
import ScreeningGrid from "./ScreeningGrid";

function Screening({ study, next, back }) {
  return (
    <>
      <ScreeningHead />
      <ScreeningGrid study={study} next={next} back={back} />
    </>
  );
}

export default Screening;
