import { useState } from "react";
import { storage } from "database/firebase";

function useMessageFiles(studyID, participantID) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadStatus, setUploadStatus] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(null);

  const handleOpen = async (file) => {
    const url = await file.ref.getDownloadURL();
    window.open(url, "_newtab");
  };

  const handleUpload = (time, file) =>
    new Promise((resolve, reject) => {
      setUploading(true);
      const ref = storage.ref(
        `messages/${studyID}/participants/${participantID}/${time}`
      );
      const task = ref.put(file);

      task.on(
        "state_changed",
        (snapshot) => {
          const filesize = snapshot.totalBytes;
          const uploaded = snapshot.bytesTransferred;
          const percent = Math.round((100 * uploaded) / filesize);
          setUploadStatus(percent);
        },
        (error) => {
          setUploading(false);
          setUploadSuccess(false);
          setUploadError(error.message);
          reject(error.message);
        },
        () => {
          setUploading(false);
          setUploadSuccess(true);
          resolve();
        }
      );
    });

  return {
    uploadError,
    uploadStatus,
    uploadSuccess,
    uploading,
    handleOpen,
    handleUpload,
  };
}

export default useMessageFiles;
