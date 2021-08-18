import { Grid, Flex } from "@chakra-ui/react";
import { TagInput, NumberInput, RadioInput } from "components";
import CheckboxInput from "components/simple/Inputs/CheckboxInput";

function EligibilityInputs({ values, errors, handleChange }) {
  return (
    <Grid paddingY="10px" gap="40px" maxWidth="360px">
      <CheckboxInput
        name="acceptsHealthyVolunteers"
        label="Accepts Healthy Volunteers"
        details="Check this box if your research study accepts healthy volunteers"
        value={values.acceptsHealthyVolunteers}
        onChange={handleChange}
      />
      <RadioInput
        name="sex"
        label="Biological Sex"
        value={values.sex}
        error={errors.sex}
        options={[
          { label: "All", value: "All" },
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
        ]}
        onChange={handleChange}
      />
      <Flex gridGap="20px">
        <NumberInput
          min={0}
          max={150}
          step={1}
          precision={0}
          name="minAge"
          label="Min Age"
          value={values.minAge}
          error={errors.minAge}
          onChange={handleChange}
        />
        <NumberInput
          min={values.minAge}
          max={100}
          step={1}
          precision={0}
          name="maxAge"
          label="Max Age"
          value={values.maxAge}
          error={errors.maxAge}
          onChange={handleChange}
        />
      </Flex>
      <TagInput
        name="conditions"
        label="Medical Conditions"
        value={values.conditions}
        error={errors.conditions}
        onChange={handleChange}
        buttonText="Add Condition"
      />
    </Grid>
  );
}

export default EligibilityInputs;
