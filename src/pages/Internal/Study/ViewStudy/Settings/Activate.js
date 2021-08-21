import { Heading, Text, Switch, Badge, Box, Flex } from "@chakra-ui/react";
import { study as researchStudy } from "database/mutations";

function Activate({ study }) {
  const handleToggle = () => {
    researchStudy.update(study.id, { ...study, activated: !study.activated });
  };

  return (
    <Box p="20px">
      <Flex align="center" mb="8px">
        <Heading size="md" mr="10px">
          Recruitment Status
        </Heading>
        <Badge colorScheme={study.activated ? "green" : "red"} fontSize="0.8rem">
          {study.activated ? "ACTIVE" : "INACTIVE"}
        </Badge>
      </Flex>
      <Text color="gray.500" my="8px">
        Your study recruitment status corresponds to whether you are currently accepting
        participants into your study. A status of <strong>active</strong> allows participants to
        enroll, while a status of <strong>inactive</strong> hides the study from potential
        participants.
      </Text>

      <Box display="inline">
        <Switch size="lg" isChecked={study.activated} onChange={handleToggle} />
      </Box>
    </Box>
  );
}

export default Activate;
