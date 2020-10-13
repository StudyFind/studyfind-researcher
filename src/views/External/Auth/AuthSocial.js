import React from "react";
import styled from "styled-components";

import { Button } from "components";

function AuthSocial() {
  const handleGoogleAuth = () => {};
  const handleFacebookAuth = () => {};

  return (
    <>
      <Divider>
        <Line /> OR <Line />
      </Divider>
      <SocialButtons>
        <FacebookButton onClick={() => {}}>
          <i className="fa fa-facebook" /> Facebook
        </FacebookButton>
        <GoogleButton onClick={() => {}} color="danger">
          <i className="fa fa-google" /> Google
        </GoogleButton>
      </SocialButtons>
    </>
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

export default AuthSocial;
