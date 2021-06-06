import { firestore } from "database/firebase";
import { useParams } from "react-router-dom";
import { useConfirm } from "hooks";

import { Flex, Text, useToast } from "@chakra-ui/react";
import { EditorButton } from "components";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function Survey({ survey, handleEdit }) {
  const { studyID } = useParams();
  const toast = useToast();
  const confirm = useConfirm();

  const handleDelete = () => {
    return firestore
      .collection("studies")
      .doc(studyID)
      .collection("surveys")
      .doc(survey.id)
      .delete()
      .then(() => toast({}))
      .catch(() => toast({}));
  };

  const handleConfirmOpen = () => {
    confirm({
      title: "Delete Survey",
      description:
        "This is a permanant action and cannot be undone. Are you sure you want to delete this survey?",
      color: "red",
      button: "Delete",
      handleConfirm: handleDelete,
    });
  };

  return (
    <Flex rounded="md" justify="space-between" align="center" p="8px">
      <Text fontWeight="500">{survey.title}</Text>
      <Flex gridGap="8px">
        <EditorButton icon={<FaPencilAlt />} color="blue" onClick={handleEdit} borderWidth="0">
          Edit
        </EditorButton>
        <EditorButton icon={<FaTrashAlt />} color="red" onClick={handleConfirmOpen} borderWidth="0">
          Delete
        </EditorButton>
      </Flex>
    </Flex>
  );
}

export default Survey;
