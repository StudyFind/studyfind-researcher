import styled from 'styled-components';
import { Form, Button } from 'components';

export const AuthTab = styled(Form)`
  width: 330px;
  padding: 10px;
  display: grid;
  grid-gap: 15px;
`;

export const Heading = styled.h2`
  color: #377dff;
  text-align: center;
`;

export const AuthLink = styled.a`
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

export const SocialButtons = styled.div`
  display: flex;
  grid-gap: 10px;
`;

export const FacebookButton = styled(Button)`
  background: rgb(60, 89, 153);
  width: 100%;
  display: flex;
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
`;

export const GoogleButton = styled(Button)`
  background: rgb(203, 64, 35);
  width: 100%;
  display: flex;
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
`;