import React from 'react';
import styled from 'styled-components';

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
      <Divider>
        <Line/> OR <Line/>
      </Divider>
      <SocialButtons>
        <FacebookButton onClick={() => {}} loading={loading}> <i className="fa fa-facebook" /> Facebook </FacebookButton>
        <GoogleButton onClick={() => {}} loading={loading} color="danger"> <i className="fa fa-google" /> Google </GoogleButton>
      </SocialButtons>
      <AuthLink onClick={() => setTab('login')}> Have an account? </AuthLink>
    </AuthTab>
  );
}

const Divider = styled.span`
  display: flex;
  align-items: center;
  color: darkgrey;
  grid-gap: 10px;
  font-size: 0.8rem;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: lightgrey;
`;

const SocialButtons = styled.div`
  display: flex;
  grid-gap: 10px;
`;

const FacebookButton = styled(Button)`
  background: rgb(60, 89, 153);
  width: 100%;
  display: flex;
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
`;

const GoogleButton = styled(Button)`
  background: rgb(203, 64, 35);
  width: 100%;
  display: flex;
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
`;


export default Signup;
