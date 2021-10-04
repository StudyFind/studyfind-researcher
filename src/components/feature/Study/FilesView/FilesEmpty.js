import { Button } from "@chakra-ui/react";
import { Message } from "components";

function FilesEmpty({ limit, onButtonClick }) {
  return (
    <Message
      title="No Files"
      description={`You can upload up to ${limit} files each with a maximum size of 50MB related to your study here`}
      height="400px"
      showBackground
    >
      <Button onClick={onButtonClick}>Upload File</Button>
    </Message>
  );
}

export default FilesEmpty;
