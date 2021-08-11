import styled from "styled-components";
import { Flex, Tag, useColorModeValue } from "@chakra-ui/react";

function ReminderWeekdays({ weekdays }) {
  const acronyms = ["S", "M", "T", "W", "T", "F", "S"];

  const tagColor = useColorModeValue("gray.500", "gray.400");
  const tagBackground = useColorModeValue("gray.200", "gray.700");
  const tagActiveColor = useColorModeValue("white", "white");
  const tagActiveBackground = useColorModeValue("blue.500", "blue.400");

  return (
    <Weekdays>
      {acronyms.map((value, i) => (
        <Tag
          key={i}
          color={weekdays[i] ? tagActiveColor : tagColor}
          background={weekdays[i] ? tagActiveBackground : tagBackground}
        >
          {value}
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
