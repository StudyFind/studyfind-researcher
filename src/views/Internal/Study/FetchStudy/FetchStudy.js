import { useState, useEffect } from "react";

import { auth } from "database/firebase";
import { useHistory } from "react-router-dom";
import { createStudy } from "database/cloud";

import { Grid, Heading, Text, Button } from "@chakra-ui/react";
import { Link, Form, TextInput } from "components";

function FetchStudy() {
  const history = useHistory();
  const [inputs, setInputs] = useState({ studyID: "" });
  const [errors, setErrors] = useState({ studyID: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!auth.currentUser.emailVerified) {
      history.push("/");
    }
  }, []);

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const inferID = (studyID) => {
    const { length } = studyID;
    const lastEight = studyID.substr(length - 8);

    if (length < 8 || isNaN(lastEight)) {
      return "";
    }

    return "NCT" + lastEight.trim();
  };

  const handleSubmit = () => {
    const validID = inferID(inputs.studyID);

    if (!validID) {
      setErrors({ studyID: "The entered NCT ID is invalid" });
      return;
    }

    setLoading(true);
    createStudy({ nctID: validID })
      .then(() => history.push(`/create/${validID}/details`))
      .catch((error) => setErrors({ studyID: error.message }))
      .finally(() => setLoading(false));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Heading size="lg">Fetch Study Data</Heading>
      <Text mt="8px" mb="10px" color="gray.500">
        In an effort to simplify study creation and verify study owners, we require that your study
        is registered on <Link to="https://clinicaltrials.gov">clinicaltrials.gov</Link>.
        <br />
        Please submit your study{"'"}s <b>Clinical Trials ID (NCTID)</b> to help us identify your
        research study and add it to your StudyFind account.
      </Text>
      <Grid w="210px" pt="10px" gap="10px">
        <TextInput
          label="Clinical Trials ID"
          placeholder="NCT00000000"
          name="studyID"
          value={inputs.studyID}
          error={errors.studyID}
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
