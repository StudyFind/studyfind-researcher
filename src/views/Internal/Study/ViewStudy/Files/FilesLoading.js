import { Flex, Grid, Skeleton, Heading } from "@chakra-ui/react";

function FilesLoading() {
  return (
    <>
      <Flex justify="space-between" align="center" my="15px" h="40px">
        <Heading fontSize="28px">Files</Heading>
      </Flex>
      <Grid gap="20px" templateColumns="1fr 1fr 1fr 1fr">
        <Skeleton rounded="md" h="120px" />
        <Skeleton rounded="md" h="120px" />
        <Skeleton rounded="md" h="120px" />
        <Skeleton rounded="md" h="120px" />
        <Skeleton rounded="md" h="120px" />
        <Skeleton rounded="md" h="120px" />
        <Skeleton rounded="md" h="120px" />
        <Skeleton rounded="md" h="120px" />
      </Grid>
    </>
  );
}

export default FilesLoading;
