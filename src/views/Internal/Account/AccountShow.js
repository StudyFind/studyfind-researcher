import React, { useState } from "react";
import styled from "styled-components";
import ProfilePicture from "./ProfilePicture";
import { Heading, Button, Text } from "@chakra-ui/react";
import {Form, Input} from "components";
function AccountShow({setEdit}){
  return (
    <>
      <Box>
        <SmallBox>
          <Head>
            <Heading fontSize="28px">Account</Heading>
            <Button colorScheme="blue" onClick={() => setEdit(true)}>
              Edit Account
            </Button>
          </Head>
          <Inputs>
              <Text fontSize="3xl" color="black">Name:</Text>
              <Text fontSize="2xl" color="gray">Zeil Ren</Text>
              <Text fontSize="3xl" color="black">Institution:</Text>
              <Text fontSize="2xl" color="gray" noOfLines={1}> Georgia Institute of Technology</Text>
          </Inputs>
        </SmallBox>
        <SmallBox>
        <ProfilePicture/>
        </SmallBox>
      </Box>
    </>
);
}

const SmallBox = styled.div`
  padding: 50px;
  background: #f8f9fa;
  width: 50%;
  height: 100%;
`;
const Box = styled.div`
display: flex;
justify-content: space-between;
margin: 0px 0;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;
const Inputs = styled.div`
  display: grid;
  padding-top: 10px;
  width: 100%;
`;
export default AccountShow;