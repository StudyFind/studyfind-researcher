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
  buttonText,
  loading,
  loadingText,
  open,
  setOpen,
  handleConfirm,
}) {
  return (
    <AlertDialog
      isOpen={open}
      onClose={() => !loading && setOpen(false)}
      size="lg"
      motionPreset="scale"
      isCentered
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
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                colorScheme={color}
                isLoading={loading}
                loadingText={loadingText}
                onClick={handleConfirm}
              >
                {buttonText}
              </Button>
            </Flex>
          </Box>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default Confirm;
