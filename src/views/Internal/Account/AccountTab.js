import { Button, Text } from "@chakra-ui/react";

function AccountTab({ icon, name, selected, onClick }) {
  return (
    <Button
      className="tab"
      bg={selected ? "blue.500" : "none"}
      color={selected ? "white" : "gray.500"}
      _hover={{ bg: selected ? "blue.500" : "gray.200" }}
      _active={{ bg: selected ? "blue.500" : "gray.300" }}
      textTransform="capitalize"
      justifyContent="flex-start"
      leftIcon={icon}
      onClick={onClick}
    >
      <Text ml="8px">{name}</Text>
    </Button>
  );
}

export default AccountTab;
