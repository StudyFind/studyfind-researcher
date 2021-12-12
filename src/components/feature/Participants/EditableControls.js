import { useEditableControls, ButtonGroup, IconButton } from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function EditableControls(props) {
  const { handleConfirm } = props;
  const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
    useEditableControls();

  return (
    isEditing && (
      <ButtonGroup justifyContent="center" size="xs">
        <IconButton
          onClickCapture={handleConfirm}
          colorScheme="green"
          icon={<FaCheck />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          colorScheme="red"
          icon={<FaTimes />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    )
  );
}
