import React from "react";
import { Confirm } from "components";

function ReviewConfirmPublish({
  nctID,
  loadingPublish,
  confirmPublish,
  setConfirmPublish,
  handlePublish,
}) {
  return (
    <Confirm
      title="Confirm Publish Study"
      button="Publish"
      color="green"
      open={confirmPublish}
      setOpen={setConfirmPublish}
      handleConfirm={handlePublish}
      loading={loadingPublish}
    >
      Publishing a study allows participants to enroll but prevents you from making changes to the
      study details and screening survey. <br /> Are you sure you want to publish study{" "}
      <b>{nctID}</b>?
    </Confirm>
  );
}

export default ReviewConfirmPublish;
