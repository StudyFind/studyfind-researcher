import { useState, useEffect } from "react";
import moment from "moment";
import styled from "styled-components";

import { datetime, helpers } from "functions";
import { auth, firestore } from "database/firebase";
import { useParams, useLocation } from "react-router-dom";

import { TextInput, DateInput, TimeInput } from "@studyfind/components";
import { Grid, Flex, Tag, TagCloseButton, TagLabel, FormLabel, Button } from "@chakra-ui/react";

import ReminderWeekdayInput from "./ReminderWeekdayInput";
import ReminderTimesInput from "./ReminderTimesInput";

function RemindersEdit({ reminder }) {
  const location = useLocation();

  const { studyID } = useParams();
  const participantID = new URLSearchParams(location.search).get("participantID");

  const [inputs, setInputs] = useState({
    time: "",
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
      return "Please select at least one day";
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
    if (reminder) {
      const [weekdays, times] = helpers.convertOffsetsToWeekdaysAndTimes(reminder.times);
      const { title, startDate, endDate } = reminder;
      const initial = { title, times, weekdays, startDate, endDate };

      setInputs(initial);
      setErrors(validate(initial));
    }
  };

  useEffect(handleInitial, [reminder]);

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
    setErrors((prev) => ({ ...prev, [name]: checker(name, value) }));
  };

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
        <ReminderWeekdayInput
          weekdays={inputs.weekdays}
          error={errors.weekdays}
          handleChange={handleChange}
        />
      </div>
      <div>
        <FormLabel>Reminder Times</FormLabel>
        <ReminderTimesInput times={inputs.times} error={errors.times} handleChange={handleChange} />
      </div>
      <Flex gridGap="16px">
        <DateInput
          label="Start Date"
          name="startDate"
          value={inputs.startDate}
          error={errors.startDate}
          onChange={handleChange}
        />
        <DateInput
          label="End Date"
          name="endDate"
          min={inputs.startDate}
          value={inputs.endDate}
          error={errors.endDate}
          onChange={handleChange}
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
