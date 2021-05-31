import React, { useState } from "react";
import moment from "moment";
import validator from "validator";

import { firestore } from "database/firebase";

import { TextInput } from "components";
import { Grid, Flex, Button } from "@chakra-ui/react";

function MeetingsForm({ meeting, onClose }) {
  const [inputs, setInputs] = useState({
    name: meeting.name,
    link: meeting.link,
    time: moment(meeting.time).format("HH:mm"),
    date: moment(meeting.time).format("YYYY-MM-DD"),
  });
  const [errors, setErrors] = useState({});

  const checker = (name, value) => {
    if (!value) return true;

    switch (name) {
      case "date":
        return value < Date.now() && "Date must be in the future";
      case "link":
        return (
          (!validator.isURL(value) || value.substring(0, 8) !== "https://") && "Link is invalid"
        );
      default:
        return !value;
    }
  };

  const validate = ({ name, date, time, link }) => ({
    name: checker("name", name),
    date: checker("date", date),
    time: checker("time", time),
    link: checker("link", link),
  });

  const getEpoch = (date, time) => {
    const [year, month, day] = date.split("-");
    const [hour, minute] = time.split(":");
    return new Date(year, month - 1, day, hour, minute).getTime();
  };

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: checker(name, value) });
  };

  const handleCancel = () => {
    setInputs({
      name: meeting.name,
      link: meeting.link,
      time: moment(meeting.time).format("HH:mm"),
      date: moment(meeting.time).format("YYYY-MM-DD"),
    });
    setErrors({
      name: "",
      link: "",
      time: "",
      date: "",
    });
    onClose();
  };

  const handleSubmit = () => {
    const err = validate(inputs);
    setErrors(err);
    if (err.name || err.date || err.link || err.time) return;

    const data = {
      name: inputs.name,
      time: getEpoch(inputs.date, inputs.time),
      link: inputs.link,
    };

    firestore.collection("meetings").doc(meeting.id).update(data).then(onClose);
  };

  return (
    <Grid gap="32px">
      <TextInput
        label="Meeting Name"
        name="name"
        value={inputs.name}
        error={errors.name}
        onChange={handleChange}
      />
      <TextInput
        label="Meeting Date"
        name="date"
        type="date"
        min={moment().format("YYYY-MM-DD")}
        value={inputs.date}
        error={errors.date}
        onChange={handleChange}
      />
      <TextInput
        label="Meeting Time"
        name="time"
        type="time"
        value={inputs.time}
        error={errors.time}
        onChange={handleChange}
      />
      <TextInput
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

export default MeetingsForm;
