import React, {useState} from "react";
import styled from "styled-components";
import { Text, Heading, Input, Select, Button, IconButton } from "components";
import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import {auth, firestore} from "../../../../../../database/firebase";
import firebase from "firebase";
function RemindEdit({
  participant, 
  study, 
  setEdit, 
  setTitle, 
  title, 
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  sunday,
  setSunday,
  monday,
  setMonday,
  tuesday,
  setTuesday,
  wednesday,
  setWednesday,
  thursday,
  setThursday,
  friday,
  setFriday,
  saturday,
  setSaturday,
  times,
  setTimes,
  oldReminder
}) {
    const [value, setValue] = useState("")
    const [titleError, setTitleError] = useState("")
    const [startEndTimeError, setStartEndTimeError] = useState("")
    const [timeError, setTimeError] = useState("")
    const saveTime = () => {
      var error = false
      if (value == ""){
        setTimeError("Please Enter A Valid Time")
        return
      }
      const [newHour, newMin] = value.split(":");
      const newTime = ((parseInt(newHour)) * 60 + parseInt(newMin))
      times.map((time, index) => {
        const hour = time.split(":")[0];
        const min = time.split(":")[1];
        const thisTime = ((parseInt(hour)) * 60 + parseInt(min))
        if (newTime - thisTime < 30 && newTime - thisTime > -30) {
          setTimeError("Reminder Times Need to be At Least 30 Minute Apart")
          error = true
        }
      }) 
      if (error) {
        return
      }
      const oldtimes = [...times];
      oldtimes[oldtimes.length] = value
      setTimes(oldtimes)
      setValue("")
      setTimeError("")
    }
    const deleteTime = (index) => {
      const updated = times.filter((_, i) => i !== index);
      setTimes(updated);
    };
    const handleSubmit = () => {
      if (title == "") {
        setTitleError("Please Enter a Title");
        return
      }
      if (startDate == "") {
        setStartEndTimeError("Please Enter a Start Date")
        return
      }
      if (endDate == "") {
        setStartEndTimeError("Please Enter a End Date")
        return
      }
      const allTimes = convertToTimes();
      const [startYear, startMonth, startDay] = startDate.split("-")
      const thisStartDate = firebase.firestore.Timestamp.fromDate(new Date(startYear, startMonth - 1, startDay))
      const [endYear, endMonth, endDay] = endDate.split("-")
      const thisEndDate = firebase.firestore.Timestamp.fromDate(new Date(endYear, endMonth - 1, endDay))
      /* firebase connection, all information are recorded */
      const newReminder = {
        title: title,
        times: allTimes,
        startDate: thisStartDate,
        endDate: thisEndDate,
        lastNotified: new Date(0, 0, 0)
      }
      if(thisStartDate > thisEndDate) {
        setStartEndTimeError("Please Enter a End Date Later Than Start Date")
        return
      }
      var updatedReminders
      if (oldReminder == -1) {
        updatedReminders = participant.reminders.concat([newReminder]);
      } else {
        updatedReminders = participant.reminders
        updatedReminders[oldReminder] = newReminder
      }
      // const updatedReminders = participant.reminders.concat([newReminder]);
      firestore.collection("studies").doc(study.id).collection("participants").doc(participant.id).update({
        reminders: updatedReminders
      })
      setEdit(false);
    };
    const convertToTimes = () => {
      var allTimes = []
      const weekdayBoolean = [sunday, monday, tuesday, wednesday, thursday, friday, saturday]
      for (const weekday in weekdayBoolean) {
        if (weekdayBoolean[weekday]) {
          times.map((time, index) => {
            const hour = time.split(":")[0];
            const min = time.split(":")[1];
            const thisTime = ((parseInt(hour) + 24 * weekday) * 60 + parseInt(min)) * 60 * 1000 
            allTimes.push(thisTime)
          }) 
        }
      }
      return allTimes
    
    }
    return (
    <>
      <Input
        label="Title"
        placeholder="Research Remind"
        value={title}
        onChange={(_,title) => setTitle(title)}
      />
      <Row>
        <Text color="tomato">
          {titleError}
        </Text>
      </Row>
      <Row/>
      <Row>
        <Input 
          right={
            <Button size="sm" onClick={saveTime}>
              Add Time
            </Button>}
          value={value}
          rightWidth="5rem"
          label="Remind time"
          placeholder="23:00"
          onChange={(_, value) => setValue(value)}
          type="Time"
       />
      </Row>
      <Row>
        <Text color="tomato">
          {timeError}
        </Text>
      </Row>
      <Row_align_left>
        {times.map((time,index) => (
          <Tag key={index}>
            <TagLabel>{time}</TagLabel>
            <TagCloseButton onClick={()=>deleteTime(index)}/>
          </Tag>
        ))}
      </Row_align_left>
      <Row/>
      <Row>
          <Button colorScheme={sunday ? "red" : "green"} size = "md" onClick={() => sunday ? setSunday(false) : setSunday(true)}>U</Button>
          <Button colorScheme={monday ? "red" : "green"} size = "md" onClick={() => monday ? setMonday(false) : setMonday(true)}>M</Button>
          <Button colorScheme={tuesday ? "red" : "green"} size = "md" onClick={() => tuesday ? setTuesday(false) : setTuesday(true)}>T</Button>
          <Button colorScheme={wednesday ? "red" : "green"} size = "md" onClick={() => wednesday ? setWednesday(false) : setWednesday(true)}>W</Button>
          <Button colorScheme={thursday ? "red" : "green"} size = "md" onClick={() => thursday ? setThursday(false) : setThursday(true)}>R</Button>
          <Button colorScheme={friday ? "red" : "green"} size = "md" onClick={() => friday ? setFriday(false) : setFriday(true)}>F</Button>
          <Button colorScheme={saturday ? "red" : "green"} size = "md" onClick={() => saturday ? setSaturday(false) : setSaturday(true)}>S</Button>
      </Row>
      <Row>
      <Input
        label="Start Date"
        placeholder="12/20/2020"
        value={startDate}
        onChange={(_, startDate) => setStartDate(startDate)}
        type="Date"
      />
      <Input
        label="End Date"
        placeholder="12/25/2020"
        value={endDate}
        onChange={(_, endDate) => setEndDate(endDate)}
        type="Date"
      />
      </Row>
      <Row>
        <Text color="tomato">
          {startEndTimeError}
        </Text>
      </Row>
      <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save New Reminder
      </Button>
    </>

    );
}
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;
const Row_align_left = styled.div`
  display: flex;
  align-items:center;
  margin: 15px 0;
`;
export default RemindEdit;