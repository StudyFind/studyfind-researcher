import { useDetectDevice } from "hooks";

import { Box, Button, Tooltip, SimpleGrid } from "@chakra-ui/react";

import FileCard from "components/complex/FileCard/FileCard";
import FilesEmpty from "./FilesEmpty";

import TabHeader from "../TabHeader";

function FilesGrid({ setEdit }) {
  const { responsive } = useDetectDevice();

  const FILE_LIMIT = 8;

  const files = [
    { name: "File 1", date: "July 31, 2021", ref: null },
    { name: "File 2", date: "July 31, 2021", ref: null },
    { name: "File 3", date: "July 31, 2021", ref: null },
    { name: "File 4", date: "July 31, 2021", ref: null },
  ];

  if (!files?.length) {
    return <FilesEmpty setEdit={setEdit} />;
  }

  const handleOpen = async (ref) => {
    // const url = await ref.getDownloadURL();
    const url = "https://google.com";
    window.open(url, "_newtab");
  };

  const handleDelete = async (ref) => {};

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
      <SimpleGrid spacing="20px" columns={responsive([1, 3, 4])}>
        {files.map((file, i) => (
          <FileCard key={i} file={file} handleOpen={handleOpen} handleDelete={handleDelete} />
        ))}
      </SimpleGrid>
    </>
  );
}

export default FilesGrid;
