import { useDetectDevice } from "hooks";

import { Box, Button, Tooltip, SimpleGrid } from "@chakra-ui/react";

import FileCard from "components/complex/FileCard/FileCard";
import FilesEmpty from "./FilesEmpty";

import TabHeader from "../TabHeader";
import FilesLoading from "./FilesLoading";
import { storage } from "database/firebase";

function FilesGrid({ studyID, files, loading, setEdit, getFiles }) {
  const { responsive } = useDetectDevice();

  const FILE_LIMIT = 8;

  if (!loading && !files?.length) {
    return <FilesEmpty setEdit={setEdit} />;
  }

  const handleOpen = async (file) => {
    const url = await file.ref.getDownloadURL();
    window.open(url, "_newtab");
  };

  const handleDelete = async (file) => {
    storage
      .ref(`study/${studyID}/${file.name}`)
      .delete()
      .then(() => getFiles());
  };

  return (
    <>
      <TabHeader heading="Files">
        <Tooltip label={files.length >= FILE_LIMIT && `You can upload up to ${FILE_LIMIT} files`}>
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
      </TabHeader>
      {loading ? (
        <FilesLoading />
      ) : (
        <SimpleGrid spacing="20px" columns={responsive([1, 3, 4])}>
          {files.map((file, i) => (
            <FileCard key={i} file={file} handleOpen={handleOpen} handleDelete={handleDelete} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
}

export default FilesGrid;
