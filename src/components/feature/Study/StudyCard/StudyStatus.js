import { Badge } from "@chakra-ui/react";

function StudyStatus({ published }) {
  return published ? (
    <Badge colorScheme="green">Published</Badge>
  ) : (
    <Badge colorScheme="red">Unpublished</Badge>
  );
}

export default StudyStatus;
