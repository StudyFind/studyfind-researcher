import React, { useRef, useState } from "react";
import {
  Text, Button, Switch, Stack,
  ModalBody, ModalFooter, FormControl, Input, FormLabel,
  useDisclosure
} from "@chakra-ui/core";


import { Modal } from "chakra"
import { deleteStudy, updateStudy } from "database/studies"


function Settings({ study }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteConfirmed, setDeleteConfirmed] = useState(true)
  const deleteInput = useRef()

  const onToggleActive = e => {
    const toggledStudy = { ...study, activated: !study.activated }
    updateStudy(toggledStudy)
  }

  const onDelete = async e => {
    if (deleteInput.current.value != study.nctID) {
      setDeleteConfirmed(false)
      return
    }
    await deleteStudy(study.nctID)
    onClose()
  }

  return (
    <Stack spacing={2} borderWidth="1px" rounded="md" overflow="hidden" bg="white" p="20px">
      <Text fontSize="sm" color="gray.400">
        {study.nctID}
      </Text>

      <FormControl display="flex" alignItems="center">
        <Switch id="activate-toggle" size="lg"
          isDisabled={!study.published}
          isChecked={study.activated}
          onChange={onToggleActive}
        />
        <FormLabel for="activate-toggle" pl={3}>Activate this study</FormLabel>
      </FormControl>

      <FormControl display="flex" alignItems="center">
        <Button id="delete-button" variantColor="red"
          onClick={onOpen}
        >Delete</Button>
        <FormLabel for="delete-button" pl={3}>Delete this study</FormLabel>
      </FormControl>


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
    </Stack>
  )
}

export default Settings;
