import { Button } from "@chakra-ui/react";

function ActionButton(props) {
  return (
    <Button
      colorScheme="blue"
      size="lg"
      w="full"
      fontWeight="extrabold"
      py={{ md: "4px" }}
      {...props}
    />
  );
}

export default ActionButton;