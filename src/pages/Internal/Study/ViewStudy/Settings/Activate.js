import { Heading, Text, Switch, Badge, Box, Flex } from "@chakra-ui/react";

function Activate({ study }) {
  const handleToggle = () => {
    console.log("toggled");
  };

  return (
    <Box p="20px">
      <Flex align="center" mb="8px">
        <Heading size="md" mr="10px">
          Recruitment Status
        </Heading>
        <Badge
          colorScheme={study.activated ? "green" : "red"}
          fontSize="0.8rem"
        >
          {study.activated ? "ACTIVE" : "INACTIVE"}
        </Badge>
      </Flex>
      <Text color="gray.500" my="8px">
        Your study recruitment status corresponds to whether you are currently
        accepting participants into your study. A status of{" "}
        <Text display="inline" fontWeight="700">
          active
        </Text>{" "}
        allows participants to enroll, while a status of{" "}
        <Text display="inline" fontWeight="700">
          inactive
        </Text>{" "}
        hides the study from potential participants.
      </Text>

      <Box display="inline">
        <Switch size="lg" isChecked={study.activated} onChange={handleToggle} />
      </Box>
    </Box>
  );
}

export default Activate;
