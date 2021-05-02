import React from "react";

import { Flex } from "@chakra-ui/react";
import { Link, ActionButton } from "components";
import { FaPencilAlt, FaTrashAlt, FaPhone } from "react-icons/fa";

function MeetingButtons({ link, confirmed, handleEdit, handleDelete }) {
  return (
    <Flex gridGap="4px">
      <Link to={link} isWrapper>
        <ActionButton icon={<FaPhone />} hint="Join" color={confirmed ? "green" : "gray"} />
      </Link>
      <ActionButton icon={<FaPencilAlt />} hint="Edit" color="blue" onClick={handleEdit} />
      <ActionButton icon={<FaTrashAlt />} hint="Delete" color="red" onClick={handleDelete} />
    </Flex>
  );
}

export default MeetingButtons;
