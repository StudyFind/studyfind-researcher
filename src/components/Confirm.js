import React from "react";

import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

function Confirm({
  title,
  children,
  color,
  button,
  loading,
  open,
  setOpen,
  handleConfirm,
}) {
  const handleClose = () => !loading && setOpen(false);

  return (
    <AlertDialog
      size="lg"
      motionPreset="scale"
      isCentered
      isOpen={open}
      onClose={handleClose}
    >
      <AlertDialogOverlay bg="rgb(0, 0, 0, 0.75)">
        <AlertDialogContent>
          <Box p="20px" w="100%">
            <Heading fontSize="lg" mb="8px">
              {title}
            </Heading>
            <Text color="gray.500">{children}</Text>
            <Flex mt="24px" gridGap="10px" justify="flex-end">
              <Button
                variant="outline"
                color="gray.500"
                isDisabled={loading}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                colorScheme={color}
                isLoading={loading}
                loadingText={button}
                onClick={handleConfirm}
              >
                {button}
              </Button>
            </Flex>
          </Box>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default Confirm;
