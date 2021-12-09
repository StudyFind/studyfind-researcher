import { useContext, useState } from "react";
import { PlanContext } from "context";

import { Text, Avatar, Badge, Flex, Editable, EditableInput, EditablePreview, useEditableControls, ButtonGroup, IconButton } from "@chakra-ui/react";
import { ActionButton } from "components";
import {
  FaClock,
  FaCalendar,
  FaClipboard,
  FaStickyNote,
  FaComment,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { studyParticipant } from "database/mutations"

function ParticipantsItem({ study, participant, handleOpen, hasQuestions }) {
  const plan = useContext(PlanContext);
  const displayName = participant?.firstname ? participant.firstname : participant.id

  function EditableParticipantName() {
    
    const [placeHolder, setplaceHolder] = useState(displayName)

    const handleConfirm = () => {
      studyParticipant.updateName(study.id, participant.id, {firstname: placeHolder})
    }

    function EditableControls() {
      const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
      } = useEditableControls()
  
      return isEditing && (
        <ButtonGroup color="#718096" justifyContent='center' size='sm'>
          <IconButton onClickCapture={handleConfirm} background={"white"} icon={<FaCheck />} {...getSubmitButtonProps()} />
          <IconButton background={"white"} icon={<FaTimes />} {...getCancelButtonProps()} />
        </ButtonGroup>
      )
    }
  
    return (
      <Editable
        defaultValue={placeHolder}
        fontWeight="500"
        mr="auto"
        value={placeHolder}
        onChange={(val) => {setplaceHolder(val)}}
        onSubmit={() => {setplaceHolder(displayName)}}
      >
        <Flex align="center" gridGap="10px">
          <Flex>
          <EditablePreview paddingLeft="10px" />
          <EditableInput paddingLeft="10px" />
          </Flex>
          <EditableControls />
        </Flex>
      </Editable>
    )
  }

  const statusColors = {
    interested: "gray",
    screened: "purple",
    consented: "cyan",
    accepted: "green",
    rejected: "red",
  };

  return (
    <Flex align="center" gridGap="10px" padding="10px">
      <Avatar
        size="1rem"
        width="30px"
        height="30px"
        color="white"
        background={participant?.color ? participant.color : 'blue.500'}
        name={displayName}
      />
      <EditableParticipantName />
      <Badge
        size="sm"
        cursor="pointer"
        colorScheme={statusColors[participant.status]}
        onClick={() => handleOpen(participant.id, "status")}
      >
        {participant.status}
      </Badge>
      {hasQuestions && (
        <Text color="gray.400" w="100px" textAlign="right">
          {participant.score}% eligible
        </Text>
      )}
      <Flex align="center" gridGap="5px">
        <ActionButton
          hint="Questions"
          icon={<FaClipboard />}
          onClick={() => handleOpen(participant.id, "questions")}
        />
        <ActionButton
          hint="Notes"
          icon={<FaStickyNote />}
          onClick={() => handleOpen(participant.id, "notes")}
        />
        <ActionButton
          hint="Meetings"
          icon={<FaCalendar />}
          onClick={() => handleOpen(participant.id, "meetings")}
        />
        <ActionButton
          hint="Reminders"
          icon={<FaClock />}
          onClick={() => handleOpen(participant.id, "reminders")}
        />
        <ActionButton
          hint="Messages"
          icon={<FaComment />}
          onClick={() => handleOpen(participant.id, "messages")}
        />
      </Flex>
    </Flex>
  );
}

export default ParticipantsItem;
