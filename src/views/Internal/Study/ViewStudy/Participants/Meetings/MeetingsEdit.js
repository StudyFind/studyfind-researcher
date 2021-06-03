import { useState, useEffect } from "react";
import moment from "moment";
import validator from "validator";

import { datetime, object } from "functions";
import { auth, firestore } from "database/firebase";
import { useParams, useLocation } from "react-router-dom";

import { TextInput } from "components";
import { Grid, Flex, Button } from "@chakra-ui/react";

function MeetingsEdit({ meeting, handleCancel }) {
  const location = useLocation();
  const { studyID } = useParams();
  const participantID = new URLSearchParams(location.search).get("participantID");

  const initial = { name: "", link: "", time: "", date: "" };
  const [inputs, setInputs] = useState(initial);
  const [errors, setErrors] = useState(initial);

  useEffect(() => {
    if (meeting) {
      setInputs({
        name: meeting.name,
        link: meeting.link,
        time: datetime.get24HourTime(meeting.time),
        date: datetime.getStandardDate(meeting.time),
      });
    }
  }, [meeting]);

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

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: checker(name, value) });
  };

  const validate = ({ name, date, time, link }) => ({
    name: checker("name", name),
    date: checker("date", date),
    time: checker("time", time),
    link: checker("link", link),
  });

  const handleSubmit = () => {
    const error = validate(inputs);
    const valid = !object.some(error);

    if (!valid) {
      setErrors(error);
      return;
    }

    const data = {
      name: inputs.name,
      link: inputs.link,
      time: datetime.getTimestampFromDatetime(inputs.date, inputs.time),
      researcherID: auth.currentUser.uid,
      participantID,
      studyID,
      confirmedByParticipant: false,
    };

    meeting
      ? firestore.collection("meetings").doc(meeting.id).update(data)
      : firestore.collection("meetings").add(data);

    handleCancel();
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

export default MeetingsEdit;
