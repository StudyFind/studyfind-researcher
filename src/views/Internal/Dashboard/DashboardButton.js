import React from "react";

import { Link } from "components";
import { Button, Tooltip } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

function DashboardButton({ verified }) {
  return (
    <Tooltip
      label={!verified && "You must verify your email before you can create any studies"}
      placement="bottom"
    >
      <Link to="/fetch" isWrapper>
        <Button isDisabled={!verified} leftIcon={<FaPlus />} colorScheme="blue">
          Create Study
        </Button>
      </Link>
    </Tooltip>
  );
}

export default DashboardButton;
