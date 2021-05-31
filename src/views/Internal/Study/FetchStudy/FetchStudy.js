import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { createStudy } from "database/cloud";

import { Grid, Heading, Text, Button } from "@chakra-ui/react";
import { Link, Form, TextInput } from "components";

function FetchStudy() {
  const history = useHistory();
  const [nctID, setNctID] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (_, value) => {
    setNctID(value);
    setError("");
  };

  const getValidID = (studyID) => {
    const lastEight = studyID.substr(studyID.length - 8);
    if (lastEight.length < 8) return "";
    if (isNaN(lastEight)) return "";
    return "NCT" + lastEight;
  };

  const handleSubmit = () => {
    const validID = getValidID(nctID);

    if (!validID) {
      setError("The entered NCT ID is invalid");
      return;
    }

    setLoading(true);
    setError("");
    createStudy({ nctID: validID })
      .then(() => history.push(`/create/${validID}/details`))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Heading size="lg">Fetch Study Data</Heading>
      <Text mt="8px" mb="10px" color="gray.500">
        In an effort to simplify study creation and verify study owners, we require that your study
        is registered on <Link to="https://clinicaltrials.gov">clinicaltrials.gov</Link>.
        <br />
        Please submit your study{"'"}s <b>Clinical Trials ID</b> to help us identify your research
        study and add it to your StudyFind account.
      </Text>
      <Grid w="210px" pt="10px" gap="10px">
        <TextInput
          label="Clinical Trials ID"
          placeholder="NCT00000000"
          value={nctID}
          error={error}
          onChange={handleChange}
        />
        <Button type="submit" colorScheme="blue" loadingText="Fetching" isLoading={loading}>
          Fetch
        </Button>
      </Grid>
    </Form>
  );
}

export default FetchStudy;
