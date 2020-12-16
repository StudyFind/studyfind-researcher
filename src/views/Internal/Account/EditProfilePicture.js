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
    if (!file || !name) {
      setError("File has not been selected");
      return;
    }

    const ext = name.split(".").reverse()[0];

    if (ext !== "png" && ext !== "jpg") {
      setError("Sorry we only support png for now");
      return;
    }

    setLoading(true);
    console.log(user.uid);
    const ref = storage.ref(`profile/${user.uid}`);
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
    <>
      <Inputs>
        {loading ? (
          <Progress hasStripe value={status} colorScheme="blue" />
        ) : (
            <FormControl isInvalid={error}>
              <FileInput type="file" accept="image/*" onChange={handleFileSelect} isInvalid={error} />
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
