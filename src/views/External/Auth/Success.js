import React from 'react';
import styled from 'styled-components';

import { Card, Message } from 'components';
import { AuthLink } from './styles';

function Success({ successMessage, setTab, setSuccessMessage }) {
  return (
    <Box>
      <Message icon="check" type="success" title="Success!">
        { successMessage }
      </Message>
      <AuthLink onClick={() => {setTab('login'); setSuccessMessage('');}}> Back to login </AuthLink>
    </Box>
  );
}

const Box = styled(Card)`
  padding: 2rem;
  width: 330px;
`;

export default Success;
