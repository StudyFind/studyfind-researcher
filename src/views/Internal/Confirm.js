import React, { useState } from "react";

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

function Confirm({ title, description, color, button, handleClose, handleConfirm }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    handleConfirm().finally(() => {
      handleClose();
      setLoading(false);
    });
  };

  return (
    <AlertDialog size="lg" motionPreset="scale" isCentered isOpen={true} onClose={handleClose}>
      <AlertDialogOverlay bg="rgb(0, 0, 0, 0.75)">
        <AlertDialogContent>
          <Box p="20px" w="100%">
            <Heading fontSize="lg" mb="8px">
              {title}
            </Heading>
            <Text color="gray.500">{description}</Text>
            <Flex mt="24px" gridGap="10px" justify="flex-end">
              <Button variant="outline" color="gray.500" isDisabled={loading} onClick={handleClose}>
                Cancel
              </Button>
              <Button
                colorScheme={color}
                isLoading={loading}
                loadingText={button}
                onClick={handleSubmit}
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
