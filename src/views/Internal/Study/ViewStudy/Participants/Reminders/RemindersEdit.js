import React from "react";
import moment from "moment";
import styled from "styled-components";
import { Input } from "components";
import { Grid, Flex, Tag, TagCloseButton, TagLabel, FormLabel, Button } from "@chakra-ui/react";

function RemindersEdit({
  inputs,
  errors,
  handleChange,
  handleDayToggle,
  handleAddTime,
  handleDeleteTime,
  handleCancel,
  handleSubmit,
}) {
  const weekdayAcronyms = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <Grid gap="32px">
      <Input
        label="Reminder Title"
        name="title"
        value={inputs.title}
        error={errors.title}
        onChange={handleChange}
      />
      <div>
        <FormLabel>Reminder Weekdays</FormLabel>
        <Weekdays>
          {weekdayAcronyms.map((value, i) => (
            <Button
              key={i}
              colorScheme={inputs.weekdays[i] ? "blue" : "gray"}
              color={inputs.weekdays[i] ? "white" : "gray.500"}
              bg={inputs.weekdays[i] ? "blue.500" : "white"}
              borderColor={inputs.weekdays[i] ? "blue.500" : "rgb(226, 232, 240)"}
              borderWidth="1px"
              onClick={() => handleDayToggle(i)}
              _focus={{ zIndex: 100 }}
            >
              {value}
            </Button>
          ))}
        </Weekdays>
      </div>
      <Grid>
        <Input
          label="Reminder Times"
          name="time"
          value={inputs.time}
          error={errors.time}
          onChange={handleChange}
          type="time"
          rightWidth="6rem"
          right={
            <Button colorScheme="blue" size="sm" onClick={handleAddTime}>
              Add Time
            </Button>
          }
        />
        <Flex gridGap="8px" mt="8px" wrap="wrap">
          {inputs.times &&
            inputs.times.map((time, i) => (
              <Tag key={i} colorScheme="blue">
                <TagLabel>{moment(time, ["HH:mm"]).format("hh:mma")}</TagLabel>
                <TagCloseButton onClick={() => handleDeleteTime(i)} />
              </Tag>
            ))}
        </Flex>
      </Grid>
      <Flex gridGap="16px">
        <Input
          label="Start Date"
          name="startDate"
          value={inputs.startDate}
          error={errors.startDate}
          onChange={handleChange}
          type="Date"
        />
        <Input
          label="End Date"
          name="endDate"
          min={inputs.startDate}
          value={inputs.endDate}
          error={errors.endDate}
          onChange={handleChange}
          type="Date"
        />
      </Flex>
      <Flex justify="flex-end" gridGap="8px">
        <Button variant="outline" color="gray.500" onClick={handleCancel}>
          Cancel
        </Button>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Save
        </Button>
      </Flex>
    </Grid>
  );
}

const Weekdays = styled(Flex)`
  & > button {
    border-radius: 0;
    margin-left: -1px;

    &:first-child {
      border-top-left-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
    }

    &:last-child {
      border-top-right-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
    }
  }
`;

export default RemindersEdit;
