import React, { useRef, useState } from "react";
import {
  Heading, Text, Box, Button, Flex,
  ModalBody, ModalFooter, FormControl, Input,
  useDisclosure
} from "@chakra-ui/core";

import { Modal } from "chakra"
import { deleteStudy } from "database/studies"


function Settings({ study }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteConfirmed, setDeleteConfirmed] = useState(true)
  const deleteInput = useRef()

  const onDelete = async e => {
    if (deleteInput.current.value != study.nctID) {
      setDeleteConfirmed(false)
      return
    }
    await deleteStudy(study.nctID)
    onClose()
  }

  return (
    <Box borderWidth="1px" rounded="md" overflow="hidden" bg="white" p="20px">
      <Text fontSize="sm" color="gray.400" pb="3">
        {study.nctID}
      </Text>
      <Flex align="center">
        <Button variantColor="red" onClick={onOpen} >Delete</Button>
        <Heading size="sm" pl="5">Delete this study:</Heading>
      </Flex>

      {/* DELETE MODAL */}
      <Modal isOpen={isOpen} onClose={onClose} title="Delete study?">

        <ModalBody>
          <Text>This is a permanent action. Please re-enter the NCT-ID of the study you want to delete.</Text>
          <FormControl pt={5}>
            <Input placeholder="Type here..." ref={deleteInput} isInvalid={!deleteConfirmed} />
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
