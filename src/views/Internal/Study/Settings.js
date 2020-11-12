import React, { useRef } from "react";
import {
  Heading, Text, Box, Button, Flex,
  ModalBody, ModalFooter,
  FormControl, Input,
  useDisclosure
} from "@chakra-ui/core";

import { Modal } from "chakra"


function Settings({ study }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteInput = useRef()

  const onDelete = e => {
    console.log(deleteInput.current.value)
    if (deleteInput.current.value != study.nctID) {
      // TODO: Error out
      return
    }
    // TODO: delete
    onClose()
  }

  return (
    <Box borderWidth="1px" rounded="md" overflow="hidden" bg="white" p="20px">
      <Text fontSize="sm" color="gray.400">
        {study.nctID}
      </Text>
      <Flex align="center">
        <Button variantColor="red" onClick={onOpen} >Delete</Button>
        <Heading size="sm" pl="4">Delete this study:</Heading>
      </Flex>

      {/* MODAL */}
      <Modal isOpen={isOpen} onClose={onClose} title="Delete study?">

        <ModalBody>
          <Text>This is a permanent action. Please re-enter the NCT-ID of the study you want to delete.</Text>
          <FormControl pt={5}>
            <Input placeholder="Type here..." ref={deleteInput} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variantColor="red" onClick={onDelete}>Delete</Button>
        </ModalFooter>

      </Modal>
    </Box>
  )
}

export default Settings;
