import FilesForm from "components/feature/Study/FilesEdit/FilesForm";
import TabHeader from "../TabHeader";

function FilesEdit({
  setEdit,
  uploading,
  uploadError,
  uploadStatus,
  handleUpload,
}) {
  const handleCancel = () => {
    setEdit(false);
  };

  const handleSubmit = ({ name, file }) => {
    handleUpload(name, file).then(() => {
      handleCancel();
    });
  };

  return (
    <>
      <TabHeader heading="Upload File" />
      <FilesForm
        uploading={uploading}
        uploadError={uploadError}
        uploadStatus={uploadStatus}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default FilesEdit;
