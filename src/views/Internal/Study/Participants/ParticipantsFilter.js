import React from "react";
import styled from "styled-components";
import { Input } from "chakra";
import { Checkbox, FormLabel } from "@chakra-ui/react";

function ParticipantsFilter() {
  return (
    <Filters>
      <Inputs>
        <Input label="Minimum Eligibility" type="number" />
        <Input label="Search Participant" />
      </Inputs>
      <Status>
        <FormLabel>Status</FormLabel>
        <CheckboxGrid>
          <Checkbox>Interested</Checkbox>
          <Checkbox>Messaged</Checkbox>
          <Checkbox>Interviewed</Checkbox>
          <Checkbox>Rejected</Checkbox>
          <Checkbox>Accepted</Checkbox>
        </CheckboxGrid>
      </Status>
    </Filters>
  );
}

const Filters = styled.div`
  display: flex;
  margin: 15px 0;
  align-items: stretch;
  grid-gap: 20px;
`;

const Status = styled.div``;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CheckboxGrid = styled.div`
  display: grid;
`;

export default ParticipantsFilter;
