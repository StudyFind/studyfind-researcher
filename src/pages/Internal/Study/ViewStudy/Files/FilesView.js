import { Box, Button, Tooltip } from "@chakra-ui/react";

import FilesEmpty from "components/feature/Study/FilesView/FilesEmpty";
import FilesGrid from "components/feature/Study/FilesView/FilesGrid";
import FilesLoading from "components/feature/Study/FilesView/FilesLoading";

import TabHeader from "../TabHeader";

function FilesView({ setEdit, files, loading, handleOpen, handleDelete }) {
  const FILE_LIMIT = 8;

  const handleEdit = () => {
    setEdit(true);
  };

  if (!loading && !files?.length) {
    return <FilesEmpty handleEdit={handleEdit} />;
  }

  return (
    <>
      <TabHeader heading="Files">
        <Tooltip label={files.length >= FILE_LIMIT && `You can upload up to ${FILE_LIMIT} files`}>
          <Box>
            <Button colorScheme="blue" onClick={handleEdit} isDisabled={files.length >= FILE_LIMIT}>
              Upload File
            </Button>
          </Box>
        </Tooltip>
      </TabHeader>
      {loading ? (
        <FilesLoading />
      ) : (
        <FilesGrid files={files} handleOpen={handleOpen} handleDelete={handleDelete} />
      )}
    </>
  );
}

export default FilesView;
