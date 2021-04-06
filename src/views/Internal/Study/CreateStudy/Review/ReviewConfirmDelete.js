import React from "react";
import { Confirm } from "components";

function ReviewConfirmDelete({
  nctID,
  loadingDelete,
  confirmDelete,
  setConfirmDelete,
  handleDelete,
}) {
  return (
    <Confirm
      title="Confirm Delete Study"
      button="Delete"
      color="red"
      open={confirmDelete}
      setOpen={setConfirmDelete}
      handleConfirm={handleDelete}
      loading={loadingDelete}
    >
      Deleting a study removes it from your account and you will not be able to recover any changes
      made to the study. <br /> Are you sure you want to delete study <b>{nctID}</b>?
    </Confirm>
  );
}

export default ReviewConfirmDelete;
