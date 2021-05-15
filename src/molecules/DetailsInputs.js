import React from "react";

import { Textarea } from "components";
import { Grid } from "@chakra-ui/react";
import DescriptionAccessibilityScore from "./DescriptionAccessibilityScore";

function DetailsInputs({ inputs, errors, handleChange }) {
  return (
    <Grid py="10px" gap="10px">
      <Textarea
        label="Study Title"
        name="title"
        value={inputs.title}
        error={errors.title}
        limit={100}
        height="50px"
        onChange={handleChange}
      />
      <Textarea
        label="Study Description"
        name="description"
        value={inputs.description}
        error={errors.description}
        limit={500}
        height="128px"
        onChange={handleChange}
      />
      <DescriptionAccessibilityScore description={inputs.description} />
    </Grid>
  );
}

export default DetailsInputs;
