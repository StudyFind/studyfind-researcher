import React, { useState } from "react";
import { storage } from "database/firebase";

function ConsentForm({ nctID }) {
  const [name, setName] = useState();
  const [file, setFile] = useState();
  const [error, setError] = useState("");
  const [status, setStatus] = useState(0);

  const handleFileChange = (e) => {
    setName(e.target.value);
    setFile(e.target.files[0]);
    setError("");
  };

  const handleFileUpload = () => {
    if (!file || !name) {
      setError("File does not exist");
      return;
    }

    const ext = name.split(".").reverse()[0];

    if (ext !== "pdf") {
      setError("File must be a pdf");
      return;
    }

    const ref = storage.ref(`consent/${nctID}.pdf`);
    const task = ref.put(file);

    task.on(
      "state_changed",
      (snapshot) => {
        const filesize = snapshot.totalBytes;
        const uploaded = snapshot.bytesTransferred;
        const percent = Math.round((100 * uploaded) / filesize);
        setStatus(percent);
      },
      (error) => {
        setError(error.message);
      }
    );
  };

  return (
    <div>
      <input onChange={handleFileChange} type="file" />
      <button onClick={handleFileUpload}>Upload</button>
      <div>{status}</div>
      <div>{error}</div>
    </div>
  );
}

export default ConsentForm;
