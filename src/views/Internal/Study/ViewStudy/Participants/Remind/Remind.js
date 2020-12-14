import React from "react";
import { Tag, Button, Heading, Text, Box, Flex, Grid } from "components";
import { compute } from "functions";
import styled from "styled-components";

function Remind({ reminder }) {
  return (
    <Grid gap="15px">
      <Button colorScheme="blue" mr={3}>
        Create New
      </Button>
      {reminder &&
        reminder &&
        reminder.map((remind, index) => (
          <Box borderWidth="1px" bg="white" rounded="md" p="10px" key={index}>
            <Text fontWeight="600" color="black">
              {remind.title}
            </Text>
            <Row>
              <Text color="gray.600" fontSize="xs">
                {convertMonth(remind.start.toDate().getMonth())}-{remind.start.toDate().getDate()}-{remind.start.toDate().getFullYear()} to {convertMonth(remind.stop.toDate().getMonth())}-{remind.stop.toDate().getDate()}-{remind.stop.toDate().getFullYear()}
              </Text>
              <Tag colorScheme="green" fontSize="xs">
                {convertRepeat(remind.repeat)}
              </Tag>
            </Row>
          </Box>
        ))}
    </Grid>
  );
}
function convertRepeat(repeat) {
    var a = ''
    if (repeat.Sunday) {
        a = a + 'U ';
    }
    if (repeat.Monday) {
        a = a + 'M '
    }
    if (repeat.Tuesday) {
        a = a + 'T ';
    }
    if (repeat.Wednesday) {
        a = a + 'W '
    }
    if (repeat.Thursday) {
        a = a + 'R ';
    }
    if (repeat.Friday) {
        a = a + 'F '
    }
    if (repeat.Saturday) {
        a = a + 'S ';
    }
    return a;
}
function convertMonth(month) {
    switch(month) {
        case 1:
          return 'Jan'
        case 2:
          return 'Feb'
        case 3:
          return 'Mar'
        case 4:
          return 'Apr'
        case 5:
          return 'May'
        case 6:
          return 'Jun'
        case 7:
          return 'Jul'
        case 8:
          return 'Aug'
        case 9:
          return 'Sep'
        case 10:
          return 'Oct'
        case 11:
          return 'Nov'
        case 12:
          return 'Dec'


        default:
          // code block
      }
}
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;
export default Remind;