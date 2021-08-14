import { Box, Button, Tooltip } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { Link } from "components";
import { useDetectDevice } from "hooks";

function DashboardButton({ verified }) {
  const { responsive } = useDetectDevice();

  return (
    <Tooltip
      label={
        !verified &&
        "You must verify your email before you can create any studies"
      }
      placement="bottom"
    >
      <Box width="fit-content">
        <Link to="/create" isWrapper>
          <Button
            size={responsive(["sm", "md", "md"])}
            isDisabled={!verified}
            leftIcon={<FaPlus />}
            colorScheme="blue"
          >
            Create Study
          </Button>
        </Link>
      </Box>
    </Tooltip>
  );
}

export default DashboardButton;
