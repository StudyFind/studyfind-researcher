import moment from "moment";
import validator from "validator";

import { useState, useEffect, useContext } from "react";
import { datetime, object } from "utils";

import { MeetingsContext } from "./MeetingsContext";

import { SecondaryButton, TextInput } from "components";
import { Grid, Flex, Button } from "@chakra-ui/react";

function MeetingsEdit() {
  const { selectedMeeting, isCreating, isUpdating, handleSave, handleCancel } =
    useContext(MeetingsContext);

  const isSaving = isCreating || isUpdating;

  const initial = { name: "", link: "", time: "", date: "" };
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState(initial);

  const checker = (name, value) => {
    if (!value) return true;

    if (name === "date" && value < datetime.getToday()) {
      return "Date must be in the future";
    }

    if (name === "time" && value.split(":")[1] % 30) {
      return "Time must be divisible by 30 minutes";
    }

    if (name === "link" && !validator.isURL(value)) {
      return "Link is invalid";
    }

    return false;
  };

  const validate = ({ name, date, time, link }) => ({
    name: checker("name", name),
    date: checker("date", date),
    time: checker("time", time),
    link: checker("link", link),
  });

  useEffect(() => {
    if (selectedMeeting) {
      const meetingInputs = {
        name: selectedMeeting.name,
        link: selectedMeeting.link,
        time: datetime.get24HourTime(selectedMeeting.time),
        date: datetime.getStandardDate(selectedMeeting.time),
      };

      const errorMessages = validate(meetingInputs);

      setValues(meetingInputs);
      setErrors(errorMessages);
    }
  }, [selectedMeeting]);

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: checker(name, value) });
  };

  const handleSubmit = () => {
    const error = validate(values);

    if (object.some(error)) {
      setErrors(error);
      return;
    }

    handleSave({
      name: values.name,
      link: values.link,
      time: datetime.getTimestampFromDatetime(values.time, values.date),
    });
  };

  return (
    <Grid gap="32px" padding="20px">
      <TextInput
        name="name"
        label="Meeting Name"
        value={values.name}
        error={errors.name}
        onChange={handleChange}
      />
      <TextInput
        type="date"
        name="date"
        label="Meeting Date"
        min={moment().format("YYYY-MM-DD")}
        value={values.date}
        error={errors.date}
        onChange={handleChange}
      />
      <TextInput
        type="time"
        name="time"
        label="Meeting Time"
        value={values.time}
        error={errors.time}
        onChange={handleChange}
      />
      <TextInput
        label="Meeting Link"
        name="link"
        value={values.link}
        error={errors.link}
        onChange={handleChange}
      />
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

export default MeetingsEdit;
