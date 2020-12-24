import React, { useState } from "react";
import { storage } from "database/firebase";

import ConsentView from "./ConsentView";

function Consent({ study, setTab }) {
  const [name, setName] = useState();
  const [file, setFile] = useState();
  const [error, setError] = useState("");
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (e) => {
    setName(e.target.value);
    setFile(e.target.files[0]);
    setError("");
  };

  const handleFileUpload = () => {
    if (!file || !name) {
      setError("File has not been selected");
      return;
    }

    const ext = name.split(".").reverse()[0];

    if (ext !== "pdf") {
      setError("File must be a pdf");
      return;
    }

    if (!study.id) {
      setError("Study ID is missing");
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
          setTab("review");
        }
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );
  };

  return (
    <ConsentView
      loading={loading}
      status={status}
      error={error}
      handleFileSelect={handleFileSelect}
      handleFileUpload={handleFileUpload}
    />
  );
}

export default Consent;
