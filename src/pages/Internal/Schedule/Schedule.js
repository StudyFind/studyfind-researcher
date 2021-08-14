import moment from "moment";

import { datetime } from "utils";
import { useState } from "react";
import { useDetectDevice } from "hooks";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { FaCalendar } from "react-icons/fa";
import { SecondaryButton } from "components";

import Modal from "components/complex/Modal/Modal";

import Calendar from "components/complex/Calendar/Calendar";
import Meetings from "./Meetings";

function Schedule() {
  const { isDesktop } = useDetectDevice();

  const today = moment().format("YYYY-MM-DD");
  const [date, setDate] = useState(today);
  const [open, setOpen] = useState(false);

  const displayDate = datetime.getFriendlyDate(date);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSelectDate = (value) => {
    setDate(value);
    handleCloseModal();
  };

  return (
    <Flex direction={isDesktop ? "row" : "column-reverse"} gridGap="50px">
      <Box width="100%">
        <Flex justify="space-between" align="center">
          <Box>
            <Heading size="md">Meetings</Heading>
            {isDesktop && <Text color="gray.500">{displayDate}</Text>}
          </Box>
          {isDesktop || (
            <SecondaryButton
              size="sm"
              leftIcon={<FaCalendar />}
              onClick={handleOpenModal}
            >
              {displayDate || "Select Date"}
            </SecondaryButton>
          )}
        </Flex>
        <Meetings date={date} />
      </Box>
      {isDesktop && (
        <Flex justify="center">
          <Calendar date={date} setDate={setDate} />
        </Flex>
      )}
      <Modal open={open} handleClose={handleCloseModal} width="330px">
        <Box padding="15px">
          <Calendar date={date} setDate={handleSelectDate} />
        </Box>
      </Modal>
    </Flex>
  );
}

export default Schedule;
