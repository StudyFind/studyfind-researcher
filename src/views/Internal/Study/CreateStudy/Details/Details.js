import React from "react";
import DetailsHead from "./DetailsHead";
import DetailsForm from "./DetailsForm";

function Details({ study, next, back }) {
  return (
    <>
      <DetailsHead />
      <DetailsForm study={study} next={next} back={back} />
    </>
  );
}

export default Details;
