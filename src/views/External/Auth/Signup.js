import React from 'react';

import { Input, Button } from 'components';
import { AuthTab, Heading, AuthLink } from './styles';

function Signup({ inputs, errors, loading, setTab, handleInputs, handleSignup }) {
  return (
    <AuthTab handleSubmit={() => handleSignup()}>
      <Heading> Create Account </Heading>
      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={inputs.email}
        error={errors.email}
        onChange={handleInputs}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={inputs.password}
        error={errors.password}
        onChange={handleInputs}
      />
      <Button onClick={() => handleSignup()} loading={loading}> Sign up </Button>
      <AuthLink onClick={() => setTab('login')}> Have an account? </AuthLink>
    </AuthTab>
  );
}

export default Signup;
