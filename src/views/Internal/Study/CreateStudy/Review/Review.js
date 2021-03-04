import React from "react";

import ReviewHead from "./ReviewHead";
import ReviewBody from "./ReviewBody";

function Review({ study, next }) {
  return (
    <>
      <ReviewHead />
      <ReviewBody study={study} next={next} />
    </>
  );
}

export default Review;
