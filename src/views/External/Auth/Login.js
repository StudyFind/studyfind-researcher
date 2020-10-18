import React from 'react';

import { Input, Button} from 'components';
import { AuthTab, Heading, AuthLink, SocialButtons, FacebookButton, GoogleButton, Divider, Line  } from './styles';

function Login({ inputs, errors, loading, setTab, handleInputs, handleEmailSignin, handleGoogleSignin, handleFacebookSignin }) {
  return (
    <AuthTab handleSubmit={handleEmailSignin}>
      <Heading> Welcome Back </Heading>
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
      <Button onClick={handleEmailSignin} loading={loading}> Login </Button>
      <Divider>
        <Line/> OR <Line/>
      </Divider>
      <SocialButtons>
        <GoogleButton onClick={handleGoogleSignin} loading={loading} color="danger"> <i className="fa fa-google" /> Google </GoogleButton>
        <FacebookButton onClick={handleFacebookSignin} loading={loading}> <i className="fa fa-facebook" /> Facebook </FacebookButton>
      </SocialButtons>
      <AuthLink onClick={() => setTab('forgot password')}> Forgot password? </AuthLink>
    </AuthTab>
  );
}

export default Login;
