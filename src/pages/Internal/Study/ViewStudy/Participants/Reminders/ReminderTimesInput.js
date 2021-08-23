import moment from "moment";

import { useState, useEffect } from "react";
import { Flex, Tag, TagCloseButton, TagLabel, Button } from "@chakra-ui/react";
import { TimeInput } from "components";

function ReminderTimesInput({ times, error, handleChange }) {
  const [time, setTime] = useState("");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    setLocalError(error);
  }, [error]);

  const handleCheckTime = () => {
    if (time === "")
      return 'Please select a time and click the "Add Time" button';
    if (time.split(":")[1] % 30) return "Time must be divisible by 30 minutes";
    if (times.includes(time)) return "Time has been already added";
  };

  const handleAddTime = () => {
    const errorMessage = handleCheckTime();

    if (errorMessage) {
      setLocalError(errorMessage);
      return;
    }

    const updated = [...times, time].sort();
    handleChange("times", updated);
    setTime("");
  };

  const handleDeleteTime = (index) => {
    const updated = times.filter((_, i) => i !== index);
    handleChange("times", updated);
  };

  return (
    <>
      <Flex gridGap="10px" align="flex-start">
        <TimeInput
          name="time"
          value={time}
          error={localError}
          onChange={(n, v) => setTime(v)}
        />
        <Button
          variant="outline"
          colorScheme="blue"
          px="20px"
          onClick={handleAddTime}
        >
          Add Time
        </Button>
      </Flex>
      <Flex gridGap="8px" mt="8px" wrap="wrap">
        {times?.map((time, i) => (
          <Tag key={i} colorScheme="blue">
            <TagLabel>{moment(time, ["HH:mm"]).format("hh:mma")}</TagLabel>
            <TagCloseButton onClick={() => handleDeleteTime(i)} />
          </Tag>
        ))}
      </Flex>
    </>
  );
}

export default ReminderTimesInput;
