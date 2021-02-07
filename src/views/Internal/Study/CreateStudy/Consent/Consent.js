import React, { useState } from "react";
import { storage } from "database/firebase";
import ConsentHead from "./ConsentHead";
import ConsentForm from "./ConsentForm";

function Consent({ study, next }) {
  const [file, setFile] = useState();
  const [error, setError] = useState("");
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSelect = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleUpload = () => {
    if (!file) {
      setError("File has not been selected");
      return;
    }

    if (!study.id) {
      setError("Study ID is missing");
      return;
    }

    setLoading(true);

    const ref = storage.ref(`consent/${study.id}.pdf`);
    const task = ref.put(file);

    task.on(
      "state_changed",
      (snapshot) => {
        const filesize = snapshot.totalBytes;
        const uploaded = snapshot.bytesTransferred;
        const percent = Math.round((100 * uploaded) / filesize);
        setStatus(percent);

        if (percent === 100) {
          setLoading(false);
          next();
        }
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );
  };

  return (
    <>
      <ConsentHead />
      <ConsentForm
        error={error}
        status={status}
        loading={loading}
        handleSelect={handleSelect}
        handleUpload={handleUpload}
      />
    </>
  );
}

export default Consent;
