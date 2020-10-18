import React from "react";
import styled from "styled-components";

import { Card, Message, Button } from "components";

function AuthMessage({ type, title, message, setMessage, setTab }) {
  const handleRedirect = () => {
    setTab("login");
    setMessage("");
  };

  return (
    <Box>
      <Message type={type} title={title}>
        {message}
      </Message>
      <Button onClick={handleRedirect}> Back to login </Button>
    </Box>
  );
}

const Box = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 20px;

  @media (max-width: 600px) {
    // width: 100%;
  }
`;

export default AuthMessage;
