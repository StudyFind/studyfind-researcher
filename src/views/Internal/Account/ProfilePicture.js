import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { storage } from "database/firebase";
import { useDownloadURL } from "react-firebase-hooks/storage";

import {
  Button,
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  Avatar,
  Input,
  Image,
} from "@chakra-ui/react";

function ProfilePicture({ uid, name }) {
  const SIZE = "100px";
  const ref = storage.ref(`profile/${uid}`);

  const [value, loading] = useDownloadURL(ref);
  const [file, setFile] = useState();
  const [error, setError] = useState("");
  const [reload, setReload] = useState(false);

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleFileUpload = () => {
    ref.put(file);
    setReload(true);
    setReload(false);
  };

  const deleteProfilePicture = () => {
    ref
      .delete()
      .then(() => {})
      .catch(() => {});

    setReload(true);
    setReload(false);
  };

  useEffect(() => {
    file && handleFileUpload();
  }, [file]);

  return (
    <>
      {loading ? (
        <>
          <SkeletonCircle h={SIZE} w={SIZE} />
          <Skeleton my="15px">
            <Button size="sm">Add Profile Picture</Button>
          </Skeleton>
        </>
      ) : value ? (
        <Flex gridGap="16px">
          <FileInput
            id="selectImage"
            type="file"
            accept="image/*"
            display="none"
            onChange={handleFileSelect}
            isInvalid={error}
          />
          <Box h={SIZE} w={SIZE} rounded="full" overflow="hidden">
            <Image h="100%" w="100%" src={value} />
          </Box>
          <Buttons my="15px">
            <Button
              size="sm"
              colorScheme="blue"
              onClick={() => document.getElementById("selectImage").click()}
            >
              Change
            </Button>
            <Button size="sm" colorScheme="red" onClick={() => deleteProfilePicture()}>
              Remove
            </Button>
          </Buttons>
        </Flex>
      ) : (
        <Flex align="center" gridGap="12px">
          <FileInput
            id="selectImage"
            type="file"
            accept="image/*"
            display="none"
            onChange={handleFileSelect}
            isInvalid={error}
          />
          <Avatar h={SIZE} w={SIZE} label={name} />
          <Button
            size="sm"
            colorScheme="blue"
            my="15px"
            onClick={() => document.getElementById("selectImage").click()}
          >
            Add Profile Picture
          </Button>
        </Flex>
      )}
    </>
  );
}

const Buttons = styled(Flex)`
  display: flex;
  align-items: center;
  grid-gap: 8px;
`;

const FileInput = styled(Input)`
  padding: 4px !important;
`;

export default ProfilePicture;
