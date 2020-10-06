import React from 'react';

import { Input, Button } from 'components';
import { AuthTab, Heading, AuthLink } from './styles';

function ForgotPassword({ inputs, errors, loading, setTab, handleInputs, handleForgotPassword }) {
  return (
    <AuthTab handleSubmit={() => handleForgotPassword()}>
      <Heading> Forgot Password </Heading>
      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={inputs.email}
        error={errors.email}
        onChange={handleInputs}
      />
      <Button onClick={() => handleForgotPassword()} loading={loading}> Send Password Reset Email </Button>
      <AuthLink onClick={() => setTab('login')}> Return to login </AuthLink>
    </AuthTab>
  );
}

export default ForgotPassword;
