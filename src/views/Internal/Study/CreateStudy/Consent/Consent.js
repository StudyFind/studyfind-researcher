import React, { useState } from "react";
import styled from "styled-components";
import { storage } from "database/firebase";
import { FileInput } from "components";
import { Heading, Text, Button } from "@chakra-ui/react";

function Consent({ study, setTab }) {
  const [file, setFile] = useState();
  const [error, setError] = useState("");
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleUpload = () => {
    if (!file) {
      setError("File has not been selected");
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
    <>
      <Heading size="lg" mb="10px">
        Upload Consent Form
      </Heading>
      <Text mb="10px" color="gray.500">
        This Consent Form will be displayed to interested participants when they decide to enroll
        for this study. They will have to agree to the terms of this consent form before completing
        their enrollment.
      </Text>
      <Inputs>
        <FileInput
          loading={loading}
          status={status}
          error={error}
          accept="application/pdf"
          onChange={handleChange}
        />
        <Button
          colorScheme="blue"
          onClick={handleUpload}
          loadingText="Uploading..."
          isLoading={loading}
          type="submit"
        >
          Upload
        </Button>
      </Inputs>
    </>
  );
}

const Inputs = styled.div`
  display: grid;
  grid-gap: 10px;
  width: 250px;
`;

export default Consent;
