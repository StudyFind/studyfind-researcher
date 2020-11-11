import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { Heading, Text, Button } from "@chakra-ui/core";
import { FaPlusCircle } from "react-icons/fa";

function NoStudies() {
  return (
    <Page>
      <Heading fontSize="32px">Create your first study</Heading>
      <Text color="gray.500" mt="8px">
        You can add your study using its Clinical Trials ID and begin recruiting and managing
        participants almost instantaneously. StudyFind automates a lot of your work for you.
      </Text>
      <Link to="/create">
        <CreateButton mt="40px" leftIcon={FaPlusCircle} variantColor="teal">
          Create Study
        </CreateButton>
      </Link>
    </Page>
  );
}

const Page = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 450px;
`;

const CreateButton = styled(Button)`
  align-self: flex-start;
`;

export default NoStudies;
