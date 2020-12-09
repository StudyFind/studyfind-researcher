import React, { useState } from "react";
import { updateStudy, deleteStudy } from "database/studies";

import ReviewView from "./ReviewView";

function Review({ study, setTab }) {
  const [publishLoading, setPublishLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handlePublish = () => {
    setPublishLoading(true);
    updateStudy({ ...study, published: true, activated: true })
      .then(() => setTab("published"))
      .catch(console.log)
      .finally(() => setPublishLoading(false));
  };

  const handleDelete = () => {
    setDeleteLoading(true);
    deleteStudy(study.nctID)
      .then(() => setTab("deleted"))
      .catch(console.log)
      .finally(() => setDeleteLoading(false));
  };

  return (
    <ReviewView
      study={study}
      handleDelete={handleDelete}
      handlePublish={handlePublish}
      deleteLoading={deleteLoading}
      publishLoading={publishLoading}
    />
  );
}

export default Review;
