import React from "react";
import styled from "styled-components";
import { Button, Box, Flex, Skeleton, SkeletonCircle, Avatar } from "@chakra-ui/react";

import { storage } from "database/firebase";
import { useDownloadURL } from "react-firebase-hooks/storage";

function ViewProfilePicture({ user, name, setEdit }) {
  const SIZE = "100px";
  const ref = storage.ref(`profile/${user.uid}`);
  const [value, loading] = useDownloadURL(ref);

  const deleteProfilePicture = () => {
    ref
      .delete()
      .then(() => {})
      .catch(() => {});
  };

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
        <>
          <Box h={SIZE} w={SIZE} rounded="full" overflow="hidden">
            <img src={value} />
          </Box>
          <Buttons my="15px">
            <Button size="sm" colorScheme="blue" onClick={() => setEdit(true)}>
              Change
            </Button>
            <Button size="sm" colorScheme="red" onClick={() => deleteProfilePicture()}>
              Remove
            </Button>
          </Buttons>
        </>
      ) : (
        <>
          <Avatar h={SIZE} w={SIZE} label={name} />
          <Button size="sm" colorScheme="blue" my="15px" onClick={() => setEdit(true)}>
            Add Profile Picture
          </Button>
        </>
      )}
    </>
  );
}

const Buttons = styled(Flex)`
  display: flex;
  align-items: center;
  grid-gap: 8px;
`;

export default ViewProfilePicture;
