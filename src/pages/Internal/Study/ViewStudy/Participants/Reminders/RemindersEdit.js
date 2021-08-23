import { useState, useEffect, useContext } from "react";
import { datetime, helpers, object } from "utils";

import { RemindersContext } from "./RemindersContext";

import { TextInput, DateInput, ToggleSelectInput, SecondaryButton } from "components";
import { Grid, Flex, FormLabel, Button } from "@chakra-ui/react";

import ReminderTimesInput from "./ReminderTimesInput";

function RemindersEdit() {
  const { selectedReminder, isCreating, isUpdating, handleSave, handleCancel } =
    useContext(RemindersContext);

  const isSaving = isCreating || isUpdating;

  const [values, setValues] = useState({
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

    if (name === "endDate" && value < values.startDate) {
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

  useEffect(() => {
    if (selectedReminder) {
      const [weekdays, times] = helpers.convertOffsetsToWeekdaysAndTimes(selectedReminder.times);
      const { title, startDate, endDate } = selectedReminder;

      const reminderInputs = { title, times, weekdays, startDate, endDate };
      const errorMessages = validate(reminderInputs);

      setValues(reminderInputs);
      setErrors(errorMessages);
    }
  }, [selectedReminder]);

  const handleSubmit = () => {
    const error = validate(values);

    if (object.some(error)) {
      setErrors(error);
      return;
    }

    handleSave({
      title: values.title,
      times: helpers.convertWeekdaysAndTimesToOffsets(values.weekdays, values.times),
      startDate: values.startDate,
      endDate: values.endDate,
    });
  };

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: checker(name, value) }));
  };

  return (
    <Grid gap="32px" padding="20px">
      <TextInput
        name="title"
        label="Reminder Title"
        value={values.title}
        error={errors.title}
        onChange={handleChange}
      />
      <div>
        <FormLabel>Reminder Weekdays</FormLabel>
        <ToggleSelectInput
          name="weekdays"
          value={values.weekdays}
          error={errors.weekdays}
          options={[
            { label: "M", value: "Monday" },
            { label: "T", value: "Tuesday" },
            { label: "W", value: "Wednesday" },
            { label: "T", value: "Thursday" },
            { label: "F", value: "Friday" },
            { label: "S", value: "Saturday" },
            { label: "S", value: "Sunday" },
          ]}
          onChange={handleChange}
          showValueOnHover
        />
      </div>
      <div>
        <FormLabel>Reminder Times</FormLabel>
        <ReminderTimesInput times={values.times} error={errors.times} handleChange={handleChange} />
      </div>
      <Flex gridGap="16px">
        <DateInput
          name="startDate"
          label="Start Date"
          max={values.endDate}
          value={values.startDate}
          error={errors.startDate}
          onChange={handleChange}
        />
        <DateInput
          name="endDate"
          label="End Date"
          min={values.startDate}
          value={values.endDate}
          error={errors.endDate}
          onChange={handleChange}
        />
      </Flex>
      <Flex justify="flex-end" gridGap="8px">
        <SecondaryButton onClick={handleCancel} isDisabled={isSaving}>
          Cancel
        </SecondaryButton>
        <Button
          colorScheme="blue"
          onClick={handleSubmit}
          isLoading={isSaving}
          loadingText="Saving..."
        >
          Save
        </Button>
      </Flex>
    </Grid>
  );
}

export default RemindersEdit;
