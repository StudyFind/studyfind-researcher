import React, { useState } from "react";
import styled from "styled-components";
import { Heading, Button, FormControl, FormErrorMessage, Progress } from "@chakra-ui/react";
import { Input } from "components";
import { storage } from "database/firebase";

function ConsentEdit({ study, setEdit }) {
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
    <div>
      <Head>
        <Heading fontSize="28px">Upload Consent Form</Heading>
        <Button colorScheme="gray" onClick={() => setEdit(false)}>
          Cancel
        </Button>
      </Head>
      <Inputs>
        {loading ? (
          <Progress hasStripe value={status} colorScheme="blue" />
        ) : (
          <FormControl isInvalid={error}>
            <FileInput type="file" onChange={handleFileSelect} isInvalid={error} />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
        )}
        <Button
          colorScheme="blue"
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

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

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

export default ConsentEdit;
