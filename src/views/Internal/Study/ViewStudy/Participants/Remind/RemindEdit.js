import React, {useState} from "react";
import styled from "styled-components";
import { Text, Heading, Input, Select, Button, IconButton } from "components";
function RemindEdit({setEdit}) {
    return (
    <>
      <Input
        label="Title"
        placeholder="Research Remind"
      />
      <Row/>
      <Input
        label="Remind time"
        placeholder="23:00"
      />
      <Row/>
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
export default RemindEdit;