import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Form, Input } from "components";
import { Heading, Text, Button } from "@chakra-ui/react";

import { deleteStudy } from "database/studies";

function Delete({ study }) {
  const [nctID, setNctID] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleChange = (name, value) => {
    setNctID(value);
    setError("");
  };

  const handleDelete = () => {
    if (nctID === study.nctID) {
      setLoading(true);
      deleteStudy(study.nctID)
        .then(() => {
          history.push("/studies");
        })
        .catch(console.log)
        .finally(() => setLoading(false));
    } else {
      setError("Entered ID does not match");
    }
  };

  return (
    <Section>
      <Heading size="md">Delete Study</Heading>
      {/* <Text my="8px">
        <List>
          <li>Deleting your study is a permanant action and cannot be undone</li>
          <li>Deleting your study will erase all data associated with your research study</li>
          <li>If you wish to pause recruitment consider deactivating your study instead</li>
        </List>
      </Text> */}

      <Text my="8px" color="gray.500">
        Deleting your study will erase all data associated with your research study. This is a
        permanant action and cannot be undone.
      </Text>

      <Text mt="24px" mb="8px" color="gray.500">
        Please type <strong>{study.nctID}</strong> to confirm:
      </Text>

      <DeleteForm onSubmit={handleDelete}>
        <Input placeholder="Type here..." value={nctID} error={error} onChange={handleChange} />
        <Button type="submit" colorScheme="red" isLoading={loading} loadingText="Deleting">
          Delete
        </Button>
      </DeleteForm>
    </Section>
  );
}

const Section = styled.section`
  padding: 20px;
  border-bottom: 1px solid #f1f2f3;
`;

const DeleteForm = styled(Form)`
  display: flex;
  grid-gap: 10px;
  width: 100%;
`;

export default Delete;
