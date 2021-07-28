import styled from "styled-components";
import { Flex, Tag } from "@chakra-ui/react";

function ReminderWeekdays({ weekdays }) {
  const weekdayAcronyms = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <Weekdays>
      {weekdays.map((value, i) => (
        <Tag key={i} color={value ? "white" : "gray.500"} bg={value ? "blue.500" : "gray.100"}>
          {weekdayAcronyms[i]}
        </Tag>
      ))}
    </Weekdays>
  );
}

const Weekdays = styled(Flex)`
  & > span {
    border-radius: 0;
    margin-left: -1px;

    &:first-child {
      border-top-left-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
    }

    &:last-child {
      border-top-right-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
    }
  }
`;

export default ReminderWeekdays;
