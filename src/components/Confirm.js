import React, { useRef } from "react";

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
          <Box p="20px" w="100%">
            <Heading mb="10px" fontSize="lg" fontWeight="bold">
              {title}
            </Heading>

            <Text color="gray.500">{children}</Text>

            <Flex mt="20px" gridGap="15px" justify="flex-end">
              <Button ref={cancelRef} onClick={() => setOpen(false)} color="gray.500">
                Cancel
              </Button>
              <Button
                colorScheme={color}
                onClick={handleConfirm}
                isLoading={loading}
                loadingText={loadingText}
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
