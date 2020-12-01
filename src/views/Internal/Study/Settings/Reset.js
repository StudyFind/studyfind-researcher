import React, { useState } from "react";
import styled from "styled-components";
import { Heading, Text, Button, Form } from "@chakra-ui/react";
import { updateStudy } from "database/studies";

function Reset({ study }) {
    const [loading, setLoading] = useState(false);

    const handleReset = () => {
        setLoading(true)
        updateStudy(study.nctID)
            .finally(() => setLoading(false))
    }

    return (
        <Section>
            <Heading mb="8px" size="md">
                Reset Study Data
            </Heading>

            <Text color="gray.500" my="8px">
                Resetting the Study Data will update many of the unchangeable fields within your
                StudyFind study listing to the ones currently found on the public listing of this
                study.
            </Text>

            <DeleteForm onSubmit={handleReset}>
                <Button type="submit" colorScheme="blue" isLoading={loading} loadingText="Updating">
                    Reset
                </Button>
            </DeleteForm>
        </Section>
    )
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

export default Reset;