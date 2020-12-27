import React, { useState } from "react";
import styled from "styled-components";
import { makeStudy } from "database/studies";
import { Heading, Text, Button } from "@chakra-ui/react";
import { Form, Input } from "components";

function Fetch({ setTab, setStudy }) {
  const [nctID, setNctID] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getValidID = (nctID) => {
    const lastEight = nctID.substr(nctID.length - 8);
    if (lastEight.length < 8) return "";
    if (isNaN(lastEight)) return "";
    return "NCT" + lastEight;
  };

  const handleChange = (_, value) => {
    setNctID(value);
    setError("");
  };

  const handleSubmit = () => {
    const validID = getValidID(nctID);

    if (validID) {
      setLoading(true);
      setError("");
      makeStudy(validID)
        .then((study) => {
          setStudy({ id: validID, ...study });
          setTab("details");
        })
        .catch((error) => setError(error.toString()))
        .finally(() => setLoading(false));
    } else {
      setError("The entered NCT ID is invalid");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Heading size="lg" mb="10px">
        Add Study using Clinical Trials ID
      </Heading>
      <Text mb="10px" color="gray.500">
        In an effort to simplify and validate study creation, we require that your research study is
        registered on clinicaltrials.gov. Submitting your Clinical Trials ID below allows us to
        identify your study and add it to your StudyFind account.
      </Text>
      <Inputs>
        <Input
          label="Clinical Trials ID"
          placeholder="NCT00000000"
          value={nctID}
          error={error}
          onChange={handleChange}
        />
        <Button
          mt="10px"
          colorScheme="blue"
          loadingText="Fetching..."
          isLoading={loading}
          type="submit"
        >
          Fetch
        </Button>
      </Inputs>
    </Form>
  );
}

const Inputs = styled.div`
  display: grid;
  padding-top: 10px;
  width: 210px;
`;

export default Fetch;
