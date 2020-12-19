import React, {useState} from "react";
import styled from "styled-components";
import { Text, Heading, Input, Select, Button, IconButton } from "components";
import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
function RemindEdit({setEdit}) {
    const [value, setValue] = useState("")
    const [times, setTimes] = useState([])
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
    return (
    <>
      <Input
        label="Title"
        placeholder="Research Remind"
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
            <TagCloseButton onClick={() =>deleteTime(index)}/>
          </Tag>
        ))}
      </Row_align_left>
      <Row>
          <Button colorScheme="green" size = "md">U</Button>
          <Button colorScheme="green" size = "md">M</Button>
          <Button colorScheme="green" size = "md">T</Button>
          <Button colorScheme="green" size = "md">W</Button>
          <Button colorScheme="green" size = "md">R</Button>
          <Button colorScheme="green" size = "md">F</Button>
          <Button colorScheme="green" size = "md">S</Button>
      </Row>
      <Row>
      <Input
        label="Start Date"
        placeholder="12/20/2020"
      />
      <Input
        label="End Date"
        placeholder="12/25/2020"
      />
      </Row>
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