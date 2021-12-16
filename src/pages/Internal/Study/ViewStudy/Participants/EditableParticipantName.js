import {
  Flex,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";

import EditableControls from "components/feature/Participants/EditableControls";

function EditableParticipantName({
  value,
  isLoading,
  handleChange,
  handleConfirm,
}) {
  return (
    <Editable
      defaultValue={value}
      fontWeight="500"
      value={value}
      flex={1}
      onChange={handleChange}
      onSubmit={handleConfirm}
    >
      <Flex align="center" gridGap="10px" maxWidth="300px">
        <Flex flexGrow="1">
          <EditablePreview />
          <EditableInput paddingLeft="5px" />
        </Flex>
        <EditableControls isLoading={isLoading} />
      </Flex>
    </Editable>
  );
}

export default EditableParticipantName;
