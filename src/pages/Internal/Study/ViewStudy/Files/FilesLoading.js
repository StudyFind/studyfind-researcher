import { SimpleGrid, Skeleton } from "@chakra-ui/react";

function FilesLoading() {
  return (
    <SimpleGrid spacing="20px" columns="4">
      <Skeleton rounded="md" h="120px" />
      <Skeleton rounded="md" h="120px" />
      <Skeleton rounded="md" h="120px" />
      <Skeleton rounded="md" h="120px" />
      <Skeleton rounded="md" h="120px" />
      <Skeleton rounded="md" h="120px" />
      <Skeleton rounded="md" h="120px" />
      <Skeleton rounded="md" h="120px" />
    </SimpleGrid>
  );
}

export default FilesLoading;
