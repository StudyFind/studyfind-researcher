import React, { useState } from "react";
import styled from "styled-components";
import { storage } from "database/firebase";
import { Heading, Text, Input, Button } from "@chakra-ui/core";

function ConsentForm({ studyID }) {
  const [name, setName] = useState();
  const [file, setFile] = useState();
  const [error, setError] = useState("");
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    const ref = storage.ref(`consent/${studyID}.pdf`);
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
        }
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <Heading size="lg" mb="10px">
        Upload Consent Form
      </Heading>
      <Text mb="10px" color="gray.500">
        These exclusion and inclusion criteria will be used to automatically generate a survey for
        interested participants to answer in their process of enrolling.
      </Text>
      <Inputs>
        <FileInput onChange={handleFileChange} type="file" />
        <Button
          variantColor="teal"
          onClick={handleFileUpload}
          loadingText="Uploading..."
          isLoading={loading}
          type="submit"
        >
          Upload
        </Button>
      </Inputs>
    </div>
  );
}

const Inputs = styled.div`
  display: grid;
  grid-gap: 10px;
  width: 250px;
`;

const FileInput = styled(Input)`
  padding: 4px;
  padding-left: 4px !important;
  padding-right: 4px !important;
`;

export default ConsentForm;
