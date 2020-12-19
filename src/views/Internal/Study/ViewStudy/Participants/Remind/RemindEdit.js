import React, {useState} from "react";
import styled from "styled-components";
import { Text, Heading, Input, Select, Button, IconButton } from "components";
import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
function RemindEdit({setEdit}) {
    const [value, setValue] = useState("")
    const [times, setTimes] = useState([])
    const [title, setTitle] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [sunday, setSunday] = useState(false)
    const [monday, setMonday] = useState(false)
    const [tuesday, setTuesday] = useState(false)
    const [wednesday, setWednesday] = useState(false)
    const [thursday, setThursday] = useState(false)
    const [friday, setFriday] = useState(false)
    const [saturday, setSaturday] = useState(false)

    const saveTime = () => {
      const oldtimes = [...times];
      oldtimes[oldtimes.length] = {value}
      setTimes(oldtimes)
      setValue("")
    }
    const deleteTime = (index) => {
      const updated = times.filter((_, i) => i !== index);
      setTimes(updated);
    };
    const handleSubmit = () => {
      const allTimes = convertToTimes();
      /* firebase connection, all information are recorded */
      setEdit(false);
    };
    const convertToTimes = () => {
      var allTimes = []
      const weekdayBoolean = [sunday, monday, tuesday, wednesday, thursday, friday, saturday]
      for (const weekday in weekdayBoolean) {
        if (weekdayBoolean[weekday]) {
          times.map((time, index) => {
            const hour = time.value.split(":")[0];
            const min = time.value.split(":")[1];
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
       />
      </Row>
      <Row/>
      <Row_align_left>
        {times.map((time,index) => (
          <Tag key={index}>
            <TagLabel>{time.value}</TagLabel>
            <TagCloseButton onClick={()=>deleteTime(index)}/>
          </Tag>
        ))}
      </Row_align_left>
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
      />
      <Input
        label="End Date"
        placeholder="12/25/2020"
        value={endDate}
        onChange={(_, endDate) => setEndDate(endDate)}
      />
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