import React from "react";
import ReviewHead from "./ReviewHead";
import ReviewBody from "./ReviewBody";

function Review({ study, next }) {
  return (
    <div>
      <ReviewHead />
      <ReviewBody study={study} next={next} />
    </div>
  );
}

export default Review;
