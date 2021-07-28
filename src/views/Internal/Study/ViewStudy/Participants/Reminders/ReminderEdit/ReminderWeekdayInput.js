import styled from "styled-components";
import { Flex, Button } from "@chakra-ui/react";

function WeekdayInput({ weekdays, handleChange }) {
  const weekdayAcronyms = ["S", "M", "T", "W", "T", "F", "S"];

  const handleToggleDay = (i) => {
    const updated = [...weekdays];
    updated[i] = !updated[i];
    handleChange("weekdays", updated);
  };

  return (
    <Weekdays>
      {weekdays.map((value, i) => {
        const styles = value
          ? {
              colorScheme: "blue",
              color: "white",
              bg: "blue.500",
              borderColor: "blue.500",
            }
          : {
              colorScheme: "gray",
              color: "gray.500",
              bg: "white",
              borderColor: "rgb(226, 232, 240)",
            };

        return (
          <Button
            key={i}
            borderWidth="1px"
            onClick={() => handleToggleDay(i)}
            _focus={{ zIndex: 100 }}
            {...styles}
          >
            {weekdayAcronyms[i]}
          </Button>
        );
      })}
    </Weekdays>
  );
}

const Weekdays = styled(Flex)`
  & > button {
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

export default WeekdayInput;
