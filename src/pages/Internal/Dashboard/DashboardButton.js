import { useDetectDevice } from "hooks";
import { Box, Button, Tooltip } from "@chakra-ui/react";
import { Link } from "components";
import { FaPlus } from "react-icons/fa";

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
