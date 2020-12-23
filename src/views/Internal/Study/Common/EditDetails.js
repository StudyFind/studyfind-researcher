import React from "react";
import styled from "styled-components";
import { Textarea } from "components";
import DescriptionAccessibilityScore from "views/Internal/Study/DescriptionAccessibilityScore";

function EditDetails({ inputs, errors, handleChange }) {
  return (
    <Inputs>
      <Textarea
        label="Study Title"
        name="title"
        value={inputs.title}
        error={errors.title}
        limit={100}
        height="60px"
        onChange={handleChange}
      />
      <Textarea
        label="Study Description"
        name="description"
        value={inputs.description}
        error={errors.description}
        limit={500}
        height="150px"
        onChange={handleChange}
      />
      <DescriptionAccessibilityScore description={inputs.description} />
    </Inputs>
  );
}

const Inputs = styled.div`
  display: grid;
  padding-top: 10px;
  grid-gap: 10px;
`;

export default EditDetails;
