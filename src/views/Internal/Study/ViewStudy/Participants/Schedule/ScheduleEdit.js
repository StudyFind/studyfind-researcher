import React from "react";
import styled from "styled-components";
import { Input } from "components";
import {
  Grid,
  Flex,
  Tag,
  TagCloseButton,
  TagLabel,
  FormLabel,
  Button,
} from "@chakra-ui/react";

function ScheduleEdit({
  inputs,
  errors,
  handleChange,
  handleCancel,
  handleSubmit,
}) {
  console.log(inputs);
  return (
    <Grid gap="32px">
      <Input
        label="Meeting Name"
        name="name"
        value={inputs.name}
        error={errors.name}
        onChange={handleChange}
      />
      <Input
        label="Meeting Time"
        name="time"
        value={inputs.time}
        error={errors.time}
        onChange={handleChange}
        type="time"
      />
      <Input
        label="Meeting Link"
        name="link"
        value={inputs.link}
        error={errors.link}
        onChange={handleChange}
      />

      <Input
        label="Meeting Date"
        name="date"
        value={inputs.date}
        error={errors.date}
        onChange={handleChange}
        type="Date"
      />
      <Flex justify="flex-end" gridGap="8px">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Save
        </Button>
      </Flex>
    </Grid>
  );
}

export default ScheduleEdit;
