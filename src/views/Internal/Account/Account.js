import React, { useState }from "react";
import AccountEdit from "./AccountEdit";
import AccountShow from "./AccountShow";
import styled from "styled-components";
import { Heading, Text, Button } from "@chakra-ui/react";
import { Form, Input } from "components";
function Account() {
    const [edit, setEdit] = useState(false);
    return edit ? (
        <AccountEdit setEdit = {setEdit}/>
      ) : (
        <AccountShow setEdit = {setEdit}/>
      );
}

const Box = styled.div`
  padding: 50px;
  background: #f8f9fa;
  width: 100%;
  height: 100%;
`;
const Inputs = styled.div`
  display: grid;
  padding-top: 10px;
  width: 210px;
`;
export default Account;