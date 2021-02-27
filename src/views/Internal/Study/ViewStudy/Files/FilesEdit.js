import React, { useState } from "react";
import { useArray } from "hooks";
import {
  Heading,
  Button,
  FormControl,
  FormErrorMessage,
  Progress,
  Input,
  Flex,
  Grid,
  IconButton,
} from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { storage } from "database/firebase";
import styled from "styled-components";

function FilesEdit({ study, setEdit }) {
  const [
    newFiles,
    setNewFiles,
    { appendElement, updateElement, deleteElementByIndex, clearArray },
  ] = useArray();
  const [errors, setErrors] = useState([]);
  const createFile = () => {
    appendElement("");
    setErrors((errors) => [...errors, ""]);
  };
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);
  const updateFile = (index, e) => {
    updateElement(e.target.files[0], index);
    let tempErrors = [...errors];
    tempErrors[index] = "";
    setErrors(tempErrors);
  };

  const noNewQuestion = newFiles.length != 0 && !newFiles[newFiles.length - 1];
  const handleFileUpload = () => {
    console.log(newFiles[newFiles.length - 1]);
    if (!newFiles[newFiles.length - 1]) {
      let tempErrors = [...errors];
      tempErrors[newFiles.length - 1] = "File has not been selected";
      setErrors(tempErrors);
      return;
    }

    setLoading(true);
    newFiles.forEach(function (newFile, i) {
      const ref = storage.ref(`file/${study.id}/${newFile.name}`);
      const task = ref.put(newFile);

      task.on(
        "state_changed",
        (snapshot) => {
          const filesize = snapshot.totalBytes;
          const uploaded = snapshot.bytesTransferred;
          const percent = Math.round((100 * uploaded) / filesize);
          setStatus(percent);

          if (percent === 100 && i == newFiles.length - 1) {
            setLoading(false);
            setEdit(false);
          }
        },
        (error) => {
          let tempErrors = [...errors];
          tempErrors[i] = error.message;
          setErrors(tempErrors);
          setLoading(false);
        }
      );
    });
  };

  return (
    <div>
      <Flex justify="space-between" align="center" m="15px 0">
        <Heading fontSize="28px">Upload Files</Heading>
        <Button colorScheme="gray" onClick={() => setEdit(false)}>
          Cancel
        </Button>
      </Flex>
      <Grid gap="10px">
        {loading ? (
          <Progress hasStripe value={status} colorScheme="blue" />
        ) : (
          newFiles.map((newFile, i) => (
            <Row>
              <FormControl isInvalid={errors[i]}>
                <Input
                  bg="white"
                  p="4px !important"
                  type="file"
                  onChange={(e) => updateFile(i, e)}
                  isInvalid={errors[i]}
                  accept="application/pdf"
                  width="250px"
                />
                <FormErrorMessage>{errors[i]}</FormErrorMessage>
              </FormControl>
              <IconButton
                colorScheme=""
                color="gray.500"
                _hover={{ color: "red.500", bg: "red.100" }}
                icon={<FaTrash />}
                onClick={() => deleteElementByIndex(i)}
              />
            </Row>
          ))
        )}
        {!noNewQuestion && (
          <Button leftIcon={<FaPlus />} color="gray.500" onClick={createFile}>
            Add File
          </Button>
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
      </Grid>
    </div>
  );
}
const Row = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 10px;
  padding: 10px;

  border-bottom: 1px solid #f1f2f3;

  &:last-child {
    border-bottom: none;
  }
`;
export default FilesEdit;
