import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Text,
  Button,
  Switch,
  Stack,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  useDisclosure,
} from "@chakra-ui/core";

import { Input } from "chakra";

import { Modal } from "chakra";
import { deleteStudy, updateStudy } from "database/studies";

function Settings({ study, setStudy }) {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nctID, setNctID] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setNctID(value);
    setError("");
  };

  const handleDelete = () => {
    if (nctID !== study.nctID) {
      setError("Entered ID does not match");
      return;
    }
    setLoading(true);
    deleteStudy(study.nctID)
      .then(() => {
        history.push("/studies");
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  };

  const handleToggle = () => {
    const updated = { ...study, activated: !study.activated };
    updateStudy(updated);
    setStudy(updated);
  };

  return (
    <Stack spacing={2} borderWidth="1px" rounded="md" overflow="hidden" bg="white" p="20px">
      <Text fontSize="sm" color="gray.400">
        {study.nctID}
      </Text>

      <FormControl display="flex" alignItems="center">
        <Switch
          id="activate-toggle"
          size="lg"
          isDisabled={!study.published}
          isChecked={study.activated}
          onChange={handleToggle}
        />
        <FormLabel for="activate-toggle" pl={3}>
          Activate this study
        </FormLabel>
      </FormControl>

      <FormControl display="flex" alignItems="center">
        <Button id="delete-button" variantColor="red" onClick={onOpen}>
          Delete
        </Button>
        <FormLabel for="delete-button" pl={3}>
          Delete this study
        </FormLabel>
      </FormControl>

      {/* DELETE MODAL */}
      <Modal isOpen={isOpen} onClose={onClose} title="Delete study">
        <ModalBody>
          <Text>
            This is a permanent action. Please re-enter the NCT-ID of the study you want to delete.
          </Text>
          <Input placeholder="Type here..." value={nctID} error={error} onChange={handleChange} />
        </ModalBody>
        <ModalFooter>
          <Button
            variantColor="red"
            onClick={handleDelete}
            isLoading={loading}
            loadingText="Deleting"
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </Stack>
  );
}

export default Settings;
