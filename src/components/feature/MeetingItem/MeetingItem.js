import { useContext } from "react";
import { useDetectDevice } from "hooks";

import { datetime } from "utils";

import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { FaPencilAlt, FaPhone, FaTrashAlt } from "react-icons/fa";
import { Hint, Link, ActionButton } from "components";

function MeetingItem({ participant, meeting, handleEdit, handleDelete }) {
  const { isPhone } = useDetectDevice();

  const meetingInfo = (
    <>
      <Text>Status: {meeting.confirmedByParticipant ? "Confirmed" : "Pending"}</Text>
      <Text>Study: {meeting.studyID}</Text>
      <Text>Participant: {participant?.fakename}</Text>
    </>
  );

  const background = useColorModeValue("white", "gray.900");

  return (
    <Flex
      gridGap="8px"
      borderWidth="1px"
      padding="10px 12px"
      rounded="md"
      align="center"
      background={background}
    >
      <Flex direction={isPhone && "column-reverse"} align={isPhone ? "flex-start" : "center"}>
        <Flex>
          <Text
            fontSize="0.9rem"
            color="gray.500"
            width={isPhone || "64px"}
            textAlign={isPhone ? "left" : "right"}
          >
            {datetime.get12HourTime(meeting.time)}
          </Text>
          {isPhone && <Hint fontSize="12px" label={meetingInfo} marginLeft="4px" />}
        </Flex>
        <Text fontWeight="600" marginX={isPhone || "8px"}>
          {meeting.name}
        </Text>
        {isPhone || <Hint fontSize="12px" label={meetingInfo} />}
      </Flex>
      <Flex gridGap="4px" marginLeft="auto">
        <Link to={meeting.link} isWrapper>
          <ActionButton
            icon={<FaPhone />}
            color={meeting.confirmedByParticipant ? "green" : "gray"}
            hint={meeting.confirmedByParticipant ? "Confirmed" : "Pending"}
          />
        </Link>
        <ActionButton icon={<FaPencilAlt />} hint="Edit" color="blue" onClick={handleEdit} />
        <ActionButton icon={<FaTrashAlt />} hint="Delete" color="red" onClick={handleDelete} />
      </Flex>
    </Flex>
  );
}

export default MeetingItem;
