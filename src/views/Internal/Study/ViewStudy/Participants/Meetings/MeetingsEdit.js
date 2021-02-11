import React from "react";
import moment from "moment";
import { Input } from "components";
import { Grid, Flex, Button } from "@chakra-ui/react";

function MeetingsEdit({ inputs, errors, handleChange, handleCancel, handleSubmit }) {
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
        label="Meeting Date"
        name="date"
        type="date"
        min={moment().format("YYYY-MM-DD")}
        value={inputs.date}
        error={errors.date}
        onChange={handleChange}
      />
      <Input
        label="Meeting Time"
        name="time"
        type="time"
        value={inputs.time}
        error={errors.time}
        onChange={handleChange}
      />
      <Input
        label="Meeting Link"
        name="link"
        value={inputs.link}
        error={errors.link}
        onChange={handleChange}
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

export default MeetingsEdit;
