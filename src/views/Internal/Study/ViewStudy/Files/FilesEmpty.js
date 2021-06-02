import { Box, Button } from "@chakra-ui/react";
import { Message } from "components";

function FilesEmpty({ setEdit }) {
  return (
    <Box h="500px">
      <Message
        type="neutral"
        title="Upload Study Files"
        description="You can upload all files related to your study here"
      >
        <Button colorScheme="blue" onClick={() => setEdit(true)}>
          Upload File
        </Button>
      </Message>
    </Box>
  );
}

export default FilesEmpty;
