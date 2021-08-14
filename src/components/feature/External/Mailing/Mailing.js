import { useState } from "react";
import { useDetectDevice } from "hooks";
import { validate } from "utils";

import { Heading, Button, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { Card, TextInput } from "components";
import { FaShieldAlt } from "react-icons/fa";

import SectionWrapper from "../SectionWrapper";

function Mailing({ handleSubscribe }) {
  const { isPhone } = useDetectDevice();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (_, value) => {
    setEmail(value);
    setError(validate.email(value));
  };

  const cardBackgroundColor = useColorModeValue("gray.100", "gray.800");
  const inputBackgroundColor = useColorModeValue("white", "gray.900");

  return (
    <SectionWrapper>
      <Card
        width={isPhone ? "90%" : "50%"}
        minWidth={isPhone ? "0" : "400px"}
        padding={isPhone ? "30px" : "50px"}
        background={cardBackgroundColor}
      >
        <Flex direction="column" alignItems="center" gridGap="10px">
          <Heading
            size="lg"
            minWidth="250px"
            marginBottom="20px"
            textAlign="center"
            width={isPhone ? "90%" : "75%"}
          >
            Get feature updates in your inbox
          </Heading>
          <TextInput
            value={email}
            error={error}
            onChange={handleChange}
            placeholder="example@domain.com"
            background={inputBackgroundColor}
          />
          <Button width="100%" colorScheme="blue" onClick={() => handleSubscribe(email)}>
            Join Now
          </Button>
          <Flex color="gray.500" fontSize="12px" align="center" gridGap="4px">
            <Icon as={FaShieldAlt} color="green.500" />
            No Spam. We&apos;ll send relevant content only.
          </Flex>
        </Flex>
      </Card>
    </SectionWrapper>
  );
}

export default Mailing;
