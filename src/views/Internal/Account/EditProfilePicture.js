import React, { useState } from "react";
import { auth, storage } from "database/firebase";
import styled from "styled-components";
import { Button, FormControl, FormErrorMessage, Progress, Input } from "@chakra-ui/react";

function EditProfilePicture({ setEdit }) {
  const user = auth.currentUser;
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
    setLoading(true);
    const ref = storage.ref(`profile/${user.uid}`);
    ref.put(file);
  };

  return (
    <>
      <Inputs>
        {loading ? (
          <Progress hasStripe value={status} colorScheme="blue" />
        ) : (
          <FormControl isInvalid={error}>
            <Button onClick={() => document.getElementById("selectImage").click()}>Click</Button>
            <FileInput
              id="selectImage"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              isInvalid={error}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
        )}
        <Buttons>
          <Button colorScheme="gray" onClick={() => setEdit(false)}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleFileUpload}
            loadingText="Uploading..."
            isLoading={loading}
            type="submit"
          >
            Upload
          </Button>
        </Buttons>
      </Inputs>
    </>
  );
}

const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-gap: 10px;
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

export default EditProfilePicture;
