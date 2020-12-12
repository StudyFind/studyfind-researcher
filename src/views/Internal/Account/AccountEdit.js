import React, { useState }from "react";
import styled from "styled-components";
import ProfilePicture from "./ProfilePicture";
import { Heading, Button, Text } from "@chakra-ui/react";
import {Form, Input} from "components";
function AccountEdit({setEdit}){
    return (
        <>
          <Box>
            <SmallBox>
              <Head>
                <Heading fontSize="28px">Edit Account</Heading>
                <Button colorScheme="blue" onClick={() => setEdit(false)}>
                  Submit
                </Button>
              </Head>
              <Form>
                <Inputs>
                  <Input
                    label="Name"
                  />
                  <Input
                    label="Institution"
                  />
                </Inputs>
              </Form>
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
  width: 210px;
`;
export default AccountEdit;