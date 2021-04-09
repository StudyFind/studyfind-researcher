import React from "react";

import { Link } from "react-router-dom";
import { Button, Tooltip } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

function DashboardButton({ verified }) {
  return (
    <Tooltip
      label={!verified && "You must verify your email before you can create any studies"}
      placement="bottom"
    >
      <Link to="/fetch">
        <Button isDisabled={!verified} leftIcon={<FaPlus />} colorScheme="blue">
          Create Study
        </Button>
      </Link>
    </Tooltip>
  );
}

export default DashboardButton;
