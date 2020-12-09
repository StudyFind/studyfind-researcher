import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { Heading, Text, Button, Box } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

function Deleted() {
  return (
    <Page>
      <Center>
        <Box as={FaCheckCircle} size="48px" color="green.400" />
        <Head>
          <Heading size="lg" mt="20px" mb="10px">
            Deleted Successfully!
          </Heading>
        </Head>
        <Text mb="15px" color="gray.500">
          Your study was successfully deleted and will no longer be accessible through StudyFind.
          All existing study-related information has been deleted from StudyFind. You may re-create
          the study by following the same process if you choose to do so.
        </Text>
        <Link to="/studies">
          <Button mt="20px" colorScheme="blue">
            View Studies
          </Button>
        </Link>
      </Center>
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Head = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 10px;
`;

const Center = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
`;

export default Deleted;
