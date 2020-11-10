import React from "react";
import styled from "styled-components";

import StudyCardLarge from "views/Internal/StudyCardLarge";

import { Heading, Text, Button } from "@chakra-ui/core";

function ReviewStudy({ studyID, study }) {
  if (!studyID) {
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
  }

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
      <StudyCardLarge study={study} />
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

export default ReviewStudy;
