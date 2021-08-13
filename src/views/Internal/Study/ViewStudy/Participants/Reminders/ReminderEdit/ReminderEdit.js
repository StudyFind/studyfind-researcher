import { useState, useEffect } from "react";
import { datetime, helpers } from "utils";
import { auth, firestore } from "database/firebase";
import { useParams } from "react-router-dom";

import { TextInput, DateInput } from "@studyfind/components";
import { Grid, Flex, FormLabel, Button } from "@chakra-ui/react";

import ReminderWeekdayInput from "./ReminderWeekdayInput";
import ReminderTimesInput from "./ReminderTimesInput";

function RemindersEdit({ reminder, handleCancel }) {
  const { studyID, participantID } = useParams();

  const [inputs, setInputs] = useState({
    time: "",
    title: "",
    weekdays: [false, false, false, false, false, false, false],
    times: [],
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState({
    time: "",
    title: "",
    weekdays: "",
    times: "",
    startDate: "",
    endDate: "",
  });

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
    weekdays: checker("weekdays", weekdays),
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

  const handleSubmit = () => {
    const { title, weekdays, times, startDate, endDate } = inputs;
    const error = validate(inputs);

    if (error.title || error.weekdays || error.times || error.startDate || error.endDate) {
      setErrors(error);
      return;
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

    handleCancel();
  };

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
          value={inputs.weekdays}
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
          max={inputs.endDate}
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

export default RemindersEdit;
