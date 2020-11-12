import React, { useState } from "react";
import { updateStudy, deleteStudy } from "database/studies";

import ReviewStudyView from "./ReviewStudyView";

function ReviewStudy({ study, setTab }) {
  const [publishLoading, setPublishLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handlePublish = () => {
    setPublishLoading(true);
    updateStudy({ ...study, published: true, activated: true })
      .then(() => setTab("published"))
      .catch((err) => console.log(err))
      .finally(() => setPublishLoading(false));
  };

  const handleDelete = () => {
    setDeleteLoading(true);
    deleteStudy(study.nctID)
      .then(() => setTab("deleted"))
      .catch((err) => console.log(err))
      .finally(() => setDeleteLoading(false));
  };

  return (
    <ReviewStudyView
      study={study}
      handleDelete={handleDelete}
      handlePublish={handlePublish}
      deleteLoading={deleteLoading}
      publishLoading={publishLoading}
    />
  );
}

export default ReviewStudy;
