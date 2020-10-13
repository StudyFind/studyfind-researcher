import React from "react";
import styled from "styled-components";

import { Card, Message, Button } from "components";

function Success({ successMessage, setSuccessMessage, setTab }) {
  const handleRedirect = () => {
    setTab("login");
    setSuccessMessage("");
  };

  return (
    <Box>
      <Message icon="check" type="success" title="Success!">
        {successMessage}
      </Message>
      <Button onClick={handleRedirect}> Back to login </Button>
    </Box>
  );
}

const Box = styled(Card)`
  padding: 3rem;
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 20px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export default Success;
