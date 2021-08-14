import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  useColorModeValue,
} from "@chakra-ui/react";

function Modal({ children, open, handleClose, ...rest }) {
  const backgroundColor = useColorModeValue("white", "gray.800");

  return (
    <AlertDialog
      motionPreset="scale"
      isCentered
      isOpen={open}
      onClose={handleClose}
    >
      <AlertDialogOverlay onClick={handleClose} background="rgb(0, 0, 0, 0.75)">
        <AlertDialogContent background={backgroundColor} {...rest}>
          {children}
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default Modal;
