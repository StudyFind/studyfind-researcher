import React, { useState } from "react";
import { firestore } from "database/firebase";

import ReviewStudyView from "./ReviewStudyView";

function ReviewStudy({ study, setTab }) {
  const [publishLoading, setPublishLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handlePublish = () => {
    setPublishLoading(true);
    return firestore
      .collection("studies")
      .doc(study.nctID || " ")
      .update({ ...study, published: true, activated: true })
      .then(() => setTab("published"))
      .catch((err) => console.log(err))
      .finally(() => setPublishLoading(false));
  };

  const handleDelete = () => {
    setDeleteLoading(true);
    return firestore
      .collection("studies")
      .doc(study.nctID || " ")
      .delete()
      .then(() => setTab("deleted"))
      .catch(() => alert("Study does not exist"))
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
