import React, { useState } from "react";

import validator from "validator";
import { auth, firestore } from "database/firebase";
import { Loader } from "components";
import { useCollection } from "hooks";

import MeetingsView from "./MeetingsView";
import MeetingsEdit from "./MeetingsEdit";
import MeetingsError from "./MeetingsError";

function Meetings({ participant, study }) {
  const defaultInputs = {
    name: "",
    link: "",
    time: "",
    date: "",
  };

  const meetingsCollectionRef = firestore.collection("meetings");

  const [meetings, loading, error] = useCollection(
    firestore
      .collection("meetings")
      .where("participantID", "==", participant.id)
      .where("studyID", "==", study.id)
      .orderBy("time", "desc")
  );

  const [edit, setEdit] = useState(false);
  const [inputs, setInputs] = useState(defaultInputs);
  const [errors, setErrors] = useState({});
  const [meetingsID, setMeetingsID] = useState("");

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

  const getDate = (epoch) => {
    const date = new Date(epoch);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const pad = (value) => (value < 10 ? "0" : "");
    return `${year}-${pad(month)}${month}-${pad(day)}${day}`;
  };

  const getTime = (epoch) => {
    const date = new Date(epoch);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const pad = (value) => (value < 10 ? "0" : "");
    return `${pad(hours)}${hours}:${pad(minutes)}${minutes}`;
  };

  const handleEdit = (meetings) => {
    if (meetings) {
      setInputs({
        name: meetings.name,
        link: meetings.link,
        time: getTime(meetings.time),
        date: getDate(meetings.time),
      });
      setMeetingsID(meetings.id);
    }
    setEdit(true);
  };

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: checker(name, value) });
  };

  const handleDelete = (meetings) => {
    meetingsCollectionRef.doc(meetings.id).delete();
  };

  const handleCancel = () => {
    setInputs(defaultInputs);
    setErrors(defaultInputs);
    setEdit(false);
    setMeetingsID("");
  };

  const handleSubmit = () => {
    const err = validate(inputs);
    setErrors(err);
    if (err.name || err.date || err.link || err.time) return;

    const data = {
      name: inputs.name,
      time: getEpoch(inputs.date, inputs.time),
      link: inputs.link,
      participantID: participant.id,
      researcherID: auth.currentUser.uid,
      studyID: study.id,
    };

    if (meetingsID) {
      meetingsCollectionRef.doc(meetingsID).update(data);
    } else {
      meetingsCollectionRef.add(data);
    }

    handleCancel();
  };

  if (loading) return <Loader />;
  if (error) return <MeetingsError />;

  return edit ? (
    <MeetingsEdit
      inputs={inputs}
      errors={errors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
    />
  ) : (
    <MeetingsView handleEdit={handleEdit} meetings={meetings} handleDelete={handleDelete} />
  );
}

export default Meetings;
