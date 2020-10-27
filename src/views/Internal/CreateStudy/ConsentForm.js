import React, { useState } from "react";
import { storage } from "database/firebase";

function ConsentForm({ nctID }) {
  const [name, setName] = useState();
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    setName(e.target.value);
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    const ext = name.split(".").reverse()[0];

    if (ext !== "pdf") return;

    const ref = storage.ref(`consent/${nctID}.pdf`);
    const task = ref.put(file);

    task.on(
      "state_change",
      (snapshot) => {
        console.log("Success");
      },
      (error) => {
        console.log("Failure");
      }
    );
  };

  return (
    <div>
      <input onChange={handleFileChange} type="file" />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
}

export default ConsentForm;
