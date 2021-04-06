import React from "react";

import { Box, Grid, Flex, Heading, Button, Tooltip } from "@chakra-ui/react";

import FileCard from "./FileCard";
import FilesEmpty from "./FilesEmpty";

function FilesGrid({ files, setEdit, handleDelete }) {
  const FILE_LIMIT = 8;

  if (files && files.length === 0) return <FilesEmpty setEdit={setEdit} />;

  return (
    <>
      <Flex justify="space-between" align="center" my="15px">
        <Heading fontSize="28px">Files</Heading>
        <Tooltip
          label={
            files.length >= FILE_LIMIT &&
            `You can upload up to ${FILE_LIMIT} files`
          }
        >
          <Box>
            <Button
              colorScheme="blue"
              onClick={() => setEdit(true)}
              isDisabled={files.length >= FILE_LIMIT}
            >
              Upload File
            </Button>
          </Box>
        </Tooltip>
      </Flex>
      <Grid gap="20px" templateColumns="1fr 1fr 1fr 1fr">
        {files.map((file, i) => (
          <FileCard key={i} file={file} handleDelete={handleDelete} />
        ))}
      </Grid>
    </>
  );
}

export default FilesGrid;
