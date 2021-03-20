import React from "react";

import ReviewHead from "./ReviewHead";
import ReviewBody from "./ReviewBody";

function Review({ study, next, back }) {
  return (
    <>
      <ReviewHead />
      <ReviewBody study={study} next={next} back={back} />
    </>
  );
}

export default Review;
