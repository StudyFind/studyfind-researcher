import { Heading, Button, Flex, Icon } from "@chakra-ui/react";
import { TextInput } from "components";
import { useState } from "react";
import { FaShieldAlt } from "react-icons/fa";
import { validate } from "utils";

function Mailing({ handleSubscribe }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (_, value) => {
    setEmail(value);
    setError(validate.email(value));
  };

  return (
    <Flex
      direction="column"
      maxWidth="450px"
      alignItems="center"
      gridGap="10px"
      padding="50px"
    >
      <Heading size="lg" width="90%" marginBottom="5px" textAlign="center">
        Get updates on new features in your inbox
      </Heading>
      <TextInput
        value={email}
        error={error}
        onChange={handleChange}
        placeholder="example@domain.com"
      />
      <Button
        width="100%"
        colorScheme="blue"
        onClick={() => handleSubscribe(email)}
      >
        Join Now
      </Button>
      <Flex color="gray.500" fontSize="12px" align="center" gridGap="4px">
        <Icon as={FaShieldAlt} color="green.500" />
        No Spam. We'll send relevant content only.
      </Flex>
    </Flex>
  );
}

export default Mailing;
