import React, { useState } from "react";
import { Heading, Button, Flex, Grid, Progress } from "@chakra-ui/react";
import { TextInput, FileInput } from "components";
import { storage } from "database/firebase";

function FilesEdit({ studyID, setEdit, getFiles }) {
  const [inputs, setInputs] = useState({ name: "", file: undefined });
  const [errors, setErrors] = useState({ name: "", file: "" });
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);

  const validate = (name, value) => {
    if (name === "name") {
      if (!value) return "File name cannot be empty";
      if (value.includes("/")) return "File name cannot contain '/'";
    }

    return "";
  };

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, name: validate(name, value) }));
  };

  const handleSelect = (_, file) => {
    const name = file?.name || "";

    setInputs({ name, file });
    setErrors({
      name: name ? "" : "File name cannot be empty",
      file: file ? "" : "File has not been selected",
    });
  };

  const handleCancel = () => {
    setEdit(false);
    setInputs({ name: "", file: null });
    setErrors({ name: "", file: "" });
  };

  const handleUpload = () => {
    const err = {
      name: validate("name", inputs.name),
      file: validate("file", inputs.file),
    };

    if (err.name || err.file) {
      setErrors(err);
      return;
    }

    setLoading(true);

    const ref = storage.ref(`study/${studyID}/${inputs.name}`);
    const task = ref.put(inputs.file);

    task.on(
      "state_changed",
      (snapshot) => {
        const filesize = snapshot.totalBytes;
        const uploaded = snapshot.bytesTransferred;
        const percent = Math.round((100 * uploaded) / filesize);
        setStatus(percent);
      },
      (error) => {
        setErrors({ file: error.message && "File cannot be larger than 5MB" });
        setLoading(false);
      },
      () => {
        setLoading(false);
        setEdit(false);
        getFiles();
      }
    );
  };

  return (
    <>
      <Flex justify="space-between" align="center" my="15px" h="40px">
        <Heading fontSize="28px">Upload File</Heading>
      </Flex>
      <Grid gap="16px" w="300px">
        {loading ? (
          <Progress hasStripe value={status} colorScheme="blue" />
        ) : (
          <>
            <FileInput
              label="File"
              name="file"
              error={errors.file}
              onChange={handleSelect}
              accept="application/pdf"
            />
            <TextInput
              label="Name"
              name="name"
              value={inputs.name}
              error={errors.name}
              onChange={handleChange}
            />
          </>
        )}
        <Flex gridGap="10px" justify="flex-end">
          <Button variant="outline" color="gray.500" onClick={handleCancel} isDisabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            colorScheme="blue"
            loadingText="Uploading"
            isLoading={loading}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </Flex>
      </Grid>
    </>
  );
}

export default FilesEdit;
