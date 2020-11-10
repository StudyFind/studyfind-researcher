import React from "react";
import styled from "styled-components";

import { Heading, Text, Box, Tag, TagLabel, Stack, Button } from "@chakra-ui/core";
import { FaVenusMars, FaBirthdayCake, FaHeart } from "react-icons/fa";

function ReviewStudy({ studyID, study }) {
  studyID = "NCT04316676";
  study = {
    title: "The MATCH Investigation: CT Myocardial Perfusion and CT-FFR vs PET MPI",
    description: `In an effort to simplify and validate study creation, we require that your research study is
    registered on clinicaltrials.gov. Submitting your Clinical Trials ID below allows us to
    identify your study and add it to your StudyFind account. In an effort to simplify and validate study creation, we require that your research study is
    registered on clinicaltrials.gov. Submitting your Clinical Trials ID below allows us to
    identify your study and add it to your StudyFind account.In an effort to simplify and validate study creation, we require that your research study is
    registered on clinicaltrials.gov.`,
    conditions: ["Diabetes", "Myocardial", "Ulcers"],
    sex: "Male",
    age: "20-45",
    control: "Yes",
  };

  return (
    <div>
      <Heading size="lg" mb="10px">
        Review Your Study
      </Heading>
      <Text mb="15px" color="gray.500">
        This is how your research study will appear to participants. Please check that the details
        of the study match what you would like to present to the participants. If you would like the
        change anything, please update your study on clinicaltrials.gov and re-create the study.
      </Text>
      <Study borderWidth="1px" rounded="lg" overflow="hidden" bg="white" p="25px">
        <Text fontSize="sm" color="gray.400">
          {studyID}
        </Text>
        <Heading size="md" mt="5px">
          {study.title}
        </Heading>
        <Conditions spacing={1} isInline mt="6px">
          {study.conditions.map((condition, index) => (
            <Condition key={index} variant="solid" size="sm" variantColor="teal">
              <TagLabel>{condition}</TagLabel>
            </Condition>
          ))}
        </Conditions>
        <Text color="gray.500" my="15px">
          {study.description}
        </Text>
        <Eligibility>
          <Criterion>
            <Box as={FaVenusMars} color="teal.500" size="16px" />
            <Text fontWeight="500" fontSize="sm">
              {study.sex}
            </Text>
          </Criterion>
          <Criterion>
            <Box as={FaBirthdayCake} color="teal.500" size="16px" />
            <Text fontWeight="500" fontSize="sm">
              {study.age} years
            </Text>
          </Criterion>
          <Criterion>
            <Box as={FaHeart} color="teal.500" size="16px" />
            <Text fontWeight="500" fontSize="sm">
              {study.control === "Yes" && "Accepts Healthy Volunteers"}
            </Text>
          </Criterion>
        </Eligibility>
      </Study>
      <Buttons>
        <Button variantColor="red">Cancel</Button>
        <Button variantColor="blue">Publish</Button>
      </Buttons>
    </div>
  );
}

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  grid-gap: 10px;
  margin: 15px 0;
`;

const Study = styled(Box)``;

const Conditions = styled(Stack)`
  display: grid;
`;

const Condition = styled(Tag)``;

const Eligibility = styled.div`
  display: grid;
  grid-gap: 10px;
`;

const Criterion = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 10px;
`;

export default ReviewStudy;
