import { useState, useEffect } from "react";
import moment from "moment";
import styled from "styled-components";

import { datetime, helpers } from "functions";
import { auth, firestore } from "database/firebase";
import { useParams, useLocation } from "react-router-dom";

import { TextInput } from "components";
import { Grid, Flex, Tag, TagCloseButton, TagLabel, FormLabel, Button } from "@chakra-ui/react";

function RemindersEdit({ reminder }) {
  const location = useLocation();
  const { studyID } = useParams();
  const participantID = new URLSearchParams(location.search).get("participantID");

  const [inputs, setInputs] = useState({
    title: "",
    weekdays: [false, false, false, false, false, false, false],
    times: [],
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState({});

  const checker = (name, value) => {
    if (!value) return true;

    if (name === "times" && !value.length) {
      return "Please add at least one time";
    }

    if (name === "weekdays" && !value.some((v) => v)) {
      return "Please add at least one time";
    }

    if (name === "startDate" && value < datetime.getToday()) {
      return "Start date must be in the future";
    }

    if (name === "endDate" && value < inputs.startDate) {
      return "End date must be after start date";
    }

    return false;
  };

  const validate = ({ title, weekdays, times, startDate, endDate }) => ({
    title: checker("title", title),
    weekdays: checker("weekday", weekdays),
    times: checker("times", times),
    startDate: checker("startDate", startDate),
    endDate: checker("endDate", endDate),
  });

  const handleInitial = () => {
    const [weekdays, times] = helpers.convertOffsetsToWeekdaysAndTimes(reminder.times);
    const { title, startDate, endDate } = reminder;
    const initial = { title, times, weekdays, startDate, endDate };

    if (reminder) {
      setInputs(initial);
      setErrors(validate(initial));
    }
  };

  useEffect(handleInitial, [reminder]);

  const handleCheckTime = (time, prev) => {
    if (!time) return true;
    if (prev.times.includes(time)) return "Time has been already added";
    if (time.split(":")[1] % 30) return "Time must be divisible by 30 minutes";
  };

  const handleAddTime = (time) => {
    setErrors((prev) => {
      const error = handleCheckTime(time, prev);
      return { ...prev, times: error };
    });

    setInputs((prev) => {
      const times = prev.times;
      times.push(time);
      times.sort();
      return { ...prev, times };
    });
  };

  const handleDeleteTime = (index) => {
    setInputs((prev) => ({ ...prev, times: prev.times.filter((_, i) => i !== index) }));
  };

  const handleToggleDay = (index) => {
    setInputs((prev) => ({ ...prev, weekdays: prev.weekdays.map((v, i) => (i !== index) ^ v) }));
  };

  const handleSubmit = ({ title, weekdays, times, startDate, endDate }) => {
    const err = validate({ title, weekdays, times, startDate, endDate });

    if (err.title || err.weekdays || err.times || err.startDate || err.endDate) {
      setErrors(err);
    }

    const payload = {
      title,
      times: helpers.convertWeekdaysAndTimesToOffsets(weekdays, times),
      startDate,
      endDate,
      researcherID: auth.currentUser.uid,
      participantID,
      studyID,
      confirmedByParticipant: false,
    };

    reminder
      ? firestore.collection("reminders").doc(reminder.id).update(payload)
      : firestore.collection("reminders").add(payload);
  };

  const handleCancel = handleInitial;

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const weekdayAcronyms = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <Grid gap="32px">
      <TextInput
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
              onClick={() => handleToggleDay(i)}
              _focus={{ zIndex: 100 }}
            >
              {value}
            </Button>
          ))}
        </Weekdays>
      </div>
      <Grid>
        <TextInput
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
        <TextInput
          label="Start Date"
          name="startDate"
          value={inputs.startDate}
          error={errors.startDate}
          onChange={handleChange}
          type="Date"
        />
        <TextInput
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
