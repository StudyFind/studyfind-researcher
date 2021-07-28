import { Flex } from "@chakra-ui/react";
import { ActionButton } from "@studyfind/components";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function RemindersButtons({ handleEdit, handleDelete }) {
  return (
    <Flex gridGap="4px">
      <ActionButton icon={<FaPencilAlt />} hint="Edit" color="blue" onClick={handleEdit} />
      <ActionButton icon={<FaTrashAlt />} hint="Delete" color="red" onClick={handleDelete} />
    </Flex>
  );
}

export default RemindersButtons;
