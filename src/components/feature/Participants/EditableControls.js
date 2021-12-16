import { useEditableControls, ButtonGroup, IconButton } from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/fa";

function EditableControls({ isLoading }) {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
    useEditableControls();

  return (
    isEditing && (
      <ButtonGroup justifyContent="center" size="xs">
        <IconButton
          colorScheme="green"
          icon={<FaCheck />}
          isLoading={isLoading}
          {...getSubmitButtonProps()}
        />
        <IconButton
          colorScheme="red"
          icon={<FaTimes />}
          isDisabled={isLoading}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    )
  );
}

export default EditableControls;
