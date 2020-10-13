import styled from "styled-components";
import { Form, Button } from "components";

const AuthTab = styled(Form)`
  width: 100%;
  padding: 10px;
  display: grid;
  grid-gap: 15px;
`;

const Heading = styled.h2`
  color: #377dff;
  text-align: center;
`;

const AuthLink = styled.a`
  all: unset;
  cursor: pointer;
  margin: auto;
  color: grey;
  font-size: 0.9rem;
  border-bottom: 1px dashed grey;

  &:hover {
    color: #377dff;
    border-color: #377dff;
    text-decoration: none;
  }
`;

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

export {
  AuthTab,
  Heading,
  AuthLink,
  Divider,
  Line,
  SocialButtons,
  FacebookButton,
  GoogleButton,
};
