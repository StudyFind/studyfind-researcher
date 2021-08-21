import { useEffect, useState } from "react";
import { useFiles } from "hooks";

import FilesView from "./FilesView";
import FilesEdit from "./FilesEdit";

function Files({ study }) {
  const [edit, setEdit] = useState(false);

  const {
    files,
    loading,
    uploading,
    uploadError,
    uploadStatus,
    handleFetch,
    handleOpen,
    handleDelete,
    handleUpload,
  } = useFiles(study.id);

  useEffect(() => {
    handleFetch();
  }, []);

  return edit ? (
    <FilesEdit
      study={study}
      setEdit={setEdit}
      uploading={uploading}
      uploadError={uploadError}
      uploadStatus={uploadStatus}
      handleUpload={handleUpload}
    />
  ) : (
    <FilesView
      files={files}
      setEdit={setEdit}
      loading={loading}
      handleFetch={handleFetch}
      handleOpen={handleOpen}
      handleDelete={handleDelete}
    />
  );
}

export default Files;
