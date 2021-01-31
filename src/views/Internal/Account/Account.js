import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { signout } from "database";
import { auth } from "database/firebase";

import { Heading, Text, Button, Box, Grid } from "@chakra-ui/react";
import { Input } from "components";
import { FaDoorOpen } from "react-icons/fa";

import ProfilePicture from "./ProfilePicture";

function Account() {
  const [inputs, setInputs] = useState({});
  const { uid, displayName, email } = auth.currentUser;

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <>
      <Head>
        <Heading size="lg">Account</Heading>
        <Button colorScheme="red" onClick={signout} leftIcon={<FaDoorOpen />}>
          Sign out
        </Button>
      </Head>
      <hr />
      <Grid templateColumns="300px 1fr" gap="30px" p="30px 0">
        <Box>
          <Heading size="md">Profile</Heading>
          <Text>This section contains all your public profile information</Text>
        </Box>
        <Grid gap="15px">
          <ProfilePicture uid={uid} name={inputs.name} />
          <Input value={displayName} label="Name" onChange={handleChange} readOnly />
          <Input value={email} label="Email" onChange={handleChange} readOnly />
          {/* <Input value={inputs.organization} label="Organization" onChange={handleChange} /> */}
        </Grid>
      </Grid>
      <hr />
      <Grid templateColumns="300px 1fr" gap="30px" p="30px 0">
        <Box>
          <Heading size="md">Change Password</Heading>
          <Text>
            This section contains all your profile information as well as your bio and interests
          </Text>
        </Box>
        <Grid gap="15px">
          <Input value={inputs.oldPassword} label="Old Password" onChange={handleChange} />
          <Input value={inputs.newPassword} label="New Password" onChange={handleChange} />
          <Button colorScheme="blue">Change Password</Button>
        </Grid>
      </Grid>
      <hr />
      <Grid templateColumns="300px 1fr" gap="30px" p="30px 0">
        <Box>
          <Heading size="md" color="red.500">
            Delete Account
          </Heading>
          <Text>
            Deleting your account will delete all your data including any studies you have created.
          </Text>
        </Box>
        <Grid gap="15px">
          <Input value={inputs.email} label="Email" onChange={handleChange} />
          <Input value={inputs.password} label="Password" onChange={handleChange} />
          <Button colorScheme="red">Delete Account</Button>
        </Grid>
      </Grid>
    </>
  );
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

export default Account;
