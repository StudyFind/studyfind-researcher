import React from "react";
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

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const meridian = hours < 12 ? "am" : "pm";
    const hours12 = hours % 12 || 12;
    return `${hours12 < 10 ? "0" : ""}${hours12}:${minutes}${meridian}`;
  };

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
          {weekdayAcronyms.map((value, index) => (
            <Button
              key={index}
              colorScheme={inputs.weekdays[index] ? "blue" : "gray"}
              bg={inputs.weekdays[index] ? "blue.500" : "white"}
              borderColor={inputs.weekdays[index] ? "blue.500" : "rgb(226, 232, 240)"}
              borderWidth="1px"
              onClick={() => handleDayToggle(index)}
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
        <Flex gridGap="8px" mt="8px">
          {inputs.times &&
            inputs.times.map((time, index) => (
              <Tag key={index} colorScheme="blue">
                <TagLabel>{formatTime(time)}</TagLabel>
                <TagCloseButton onClick={() => handleDeleteTime(index)} />
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
          value={inputs.endDate}
          error={errors.endDate}
          onChange={handleChange}
          type="Date"
        />
      </Flex>
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
