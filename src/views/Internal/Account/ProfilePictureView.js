import React, { useState } from "react";
import { storage } from "database/firebase";

import PictureUpload from "./ProfilePictureUpload";

function PictureView({ user, setEdit }) {
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

    if (ext !== "png") {
       setError("Sorry we only support png for now");
       return;
    }


    setLoading(true);
    console.log(user.uid)
    const ref = storage.ref(`profile-pics/${user.uid}.png`);
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
          setEdit(false);
        }
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );
  };

  return (
    <PictureUpload
      setEdit={setEdit}
      loading={loading}
      status={status}
      error={error}
      handleFileSelect={handleFileSelect}
      handleFileUpload={handleFileUpload}
    />
  );
}

export default PictureView;
