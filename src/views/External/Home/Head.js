import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import logo from "images/logo.jpg";
function Head() {
  return (
    <Top>
      <Link to="/auth">
        <Start>Start Now</Start>
      </Link>
      <Link to="/">
        <Image src={logo} alt="StudyFind logo" />
      </Link>
    </Top>
  );
}
const Top = styled.div`
  padding-top: 2px;
  height: 50px;
  border-bottom: 2px rgb(57 76 96 / 15%) solid;
  position: fixed;
  top: 0;
  width: 100vw;
  background: white;
  box-shadow: 0 2px 8px rgba(57 76 96 / 15%);
  z-index: 100;
`;
const Start = styled(Button)`
  padding: 8px;
  border: none;
  color: white;
  position: absolute;
  right: 20px;
  top: 5px;
  font-weight: 700;
  @media only screen and (max-width: 300px) {
    right: 5px;
    top: 7px;
    height: 35px;
    font-weight: 500;
  }
  @media only screen and (min-width: 1000px) {
    padding: 10px;
  }

  background: #377dff;

  &:hover {
    background: #377dff;
    cursor: pointer;
  }
`;
const Image = styled.img`
  height: 45px;
  margin-left: 30px;
  @media only screen and (max-width: 300px) {
    margin-left: 10px;
  } ;
`;
export default Head;
