import React from "react";

import { Link } from "components";
import { Box, Button, Tooltip } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

function DashboardButton({ verified }) {
  return (
    <Tooltip
      label={!verified && "You must verify your email before you can create any studies"}
      placement="bottom"
    >
      <Box width="fit-content">
        <Link to="/fetch" isWrapper>
          <Button isDisabled={!verified} leftIcon={<FaPlus />} colorScheme="blue">
            Create Study
          </Button>
        </Link>
      </Box>
    </Tooltip>
  );
}

export default DashboardButton;
