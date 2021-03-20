import React from "react";
import { Heading, Text, Switch, Badge, Box, Flex, Tooltip } from "@chakra-ui/react";
import { updateStudy } from "database/studies";

function Activate({ study }) {
  const handleToggle = () => {
    updateStudy(study.id, { activated: !study.activated });
  };

  return (
    <Box p="20px" borderBottom="1px solid #f1f2f3">
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
        participants into your study. A status of&nbsp;
        <Text display="inline" fontWeight="700">
          active
        </Text>
        &nbsp;allows participants to enroll, while a status of&nbsp;
        <Text display="inline" fontWeight="700">
          inactive
        </Text>
        &nbsp;hides the study from potential participants.
      </Text>

      <Tooltip
        label={
          !study.published &&
          "Your study must be published before you can set recruitment status to active"
        }
      >
        <Box display="inline">
          <Switch
            size="lg"
            isDisabled={!study.published}
            isChecked={study.activated}
            onChange={handleToggle}
          />
        </Box>
      </Tooltip>
    </Box>
  );
}

export default Activate;
