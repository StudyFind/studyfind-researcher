import { Box, Button } from "@chakra-ui/react";
import { Message } from "components";

function FilesEmpty({ handleEdit }) {
  return (
    <Box h="500px">
      <Message
        type="neutral"
        title="Upload Study Files"
        description="You can upload all files related to your study here"
      >
        <Button colorScheme="blue" onClick={handleEdit}>
          Upload File
        </Button>
      </Message>
    </Box>
  );
}

export default FilesEmpty;
