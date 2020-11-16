import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { Heading, Text, Button, Box } from "@chakra-ui/core";
import { FaCheckCircle } from "react-icons/fa";

function Published() {
  return (
    <Page>
      <Center>
        <Box as={FaCheckCircle} size="48px" color="green.400" />
        <Head>
          <Heading size="lg" mt="20px" mb="10px">
            Published Successfully!
          </Heading>
        </Head>
        <Text mb="15px" color="gray.500">
          Congratulations! Your study was successfully published and is now available for
          participants to view and enroll. You can edit your study title, description, criteria and
          consent form from your study settings.
        </Text>
        <Link to="/studies">
          <Button mt="20px" variantColor="blue">
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

export default Published;
