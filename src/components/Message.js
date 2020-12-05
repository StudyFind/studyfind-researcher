import React from "react";
import styled from "styled-components";

import { Heading, Text, Box } from "components";
import { FaTimesCircle, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

function Message({ type, title, description, children }) {
  const status = {
    success: {
      icon: FaCheckCircle,
      color: "green",
    },
    neutral: {
      icon: FaExclamationCircle,
      color: "blue",
    },
    failure: {
      icon: FaTimesCircle,
      color: "red",
    },
  };

  const { icon, color } = status[type] || status["neutral"];

  return (
    <Page>
      <Center>
        <Box as={icon} size="48px" color={`${color}.400`} />
        <Head>
          <Heading size="lg" mt="20px" mb="10px">
            {title}
          </Heading>
        </Head>
        <Text mb="15px" color="gray.500">
          {description}
        </Text>
        {children}
      </Center>
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Head = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 10px;
`;

const Center = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
`;

export default Message;
