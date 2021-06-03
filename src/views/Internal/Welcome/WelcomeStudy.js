import { toasts } from "templates";
import { firestore } from "database/firebase";
import { useHistory } from "react-router-dom";
import { Flex, Text, Button, useToast } from "@chakra-ui/react";
import { FaBan, FaCheck } from "react-icons/fa";

function WelcomeStudy({ study }) {
  const history = useHistory();
  const toast = useToast();

  const handleRemove = () => {
    firestore
      .collection("studies")
      .doc(study.id)
      .delete()
      .then(() => toast(toasts.removedStudy))
      .catch(() => toast(toasts.connectionError));
  };

  const handleAccept = () => {
    history.push(`/create/${study.id}/details?from=welcome`);
  };

  return (
    <Flex p="10px" align="center" w="100%">
      <Text fontSize="sm" fontWeight="500" color="gray.500" mx="8px" minW="100px">
        {study.id}
      </Text>
      <Text fontSize="md" fontWeight="600" noOfLines={1}>
        {study.title}
      </Text>
      <Flex minW="240px" justify="flex-end" gridGap="8px" ml="auto">
        <Button leftIcon={<FaBan />} color="gray.500" onClick={handleRemove}>
          Remove
        </Button>
        <Button leftIcon={<FaCheck />} colorScheme="green" onClick={handleAccept}>
          Accept
        </Button>
      </Flex>
    </Flex>
  );
}

export default WelcomeStudy;
