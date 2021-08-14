import styled from "styled-components";
import { Flex, Text, Button } from "@chakra-ui/react";

function WeekdayInput({ value, error, handleChange }) {
  const weekdayAcronyms = ["S", "M", "T", "W", "T", "F", "S"];

  const handleToggleDay = (i) => {
    const updated = [...value];
    updated[i] = !updated[i];
    handleChange("weekdays", updated);
  };

  return (
    <>
      <Weekdays>
        {value.map((v, i) => {
          const styles = v
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
              borderColor={error && "red.500"}
              onClick={() => handleToggleDay(i)}
              _focus={{ zIndex: 100 }}
              {...styles}
            >
              {weekdayAcronyms[i]}
            </Button>
          );
        })}
      </Weekdays>
      <Text color="red.500" fontSize="14px" marginTop="4px">
        {error}
      </Text>
    </>
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
