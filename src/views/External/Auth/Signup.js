import React from 'react';

import { Input, Button } from 'components';
import { AuthTab, Heading, AuthLink, SocialButtons, FacebookButton, GoogleButton, Divider, Line } from './styles';

function Signup({ inputs, errors, loading, setTab, handleInputs, handleEmailSignup, handleGoogleSignup, handleFacebookSignup }) {
  return (
    <AuthTab handleSubmit={handleEmailSignup}>
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
      <Button onClick={handleEmailSignup} loading={loading}> Sign up </Button>
      <Divider>
        <Line /> OR <Line />
      </Divider>
      <SocialButtons>
        <GoogleButton onClick={handleGoogleSignup} loading={loading} color="danger"> <i className="fa fa-google" /> Google </GoogleButton>
        <FacebookButton onClick={handleFacebookSignup} loading={loading}> <i className="fa fa-facebook" /> Facebook </FacebookButton>
      </SocialButtons>
      <AuthLink onClick={() => setTab('login')}> Have an account? </AuthLink>
    </AuthTab>
  );
}


export default Signup;
