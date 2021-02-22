import React, { useRef } from "react";

import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

function Confirm({
  title,
  children,
  color,
  buttonText,
  loading,
  loadingText,
  open,
  setOpen,
  handleConfirm,
}) {
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={open}
      leastDestructiveRef={cancelRef}
      onClose={() => setOpen(false)}
      size="lg"
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{children}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => setOpen(false)} color="gray.500">
              Cancel
            </Button>
            <Button
              colorScheme={color}
              onClick={handleConfirm}
              ml={3}
              isLoading={loading}
              loadingText={loadingText}
            >
              {buttonText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default Confirm;
