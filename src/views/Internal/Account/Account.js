import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Heading, Text, Button, Box, Flex, Grid } from "@chakra-ui/react";
import { Page, Input, Textarea } from "components";
import { signout } from "database";
import { fetchUser } from "database/user";
import { FaDoorOpen } from "react-icons/fa";

import ViewProfilePicture from "./ViewProfilePicture";
import EditProfilePicture from "./EditProfilePicture";

function Account() {
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({});
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser().then((data) => {
      setUser(data);
      const { name, email, organization } = data;
      setInputs({ name, email, organization });
      setLoading(false);
    });
  }, []);

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };

  const different = true;

  return (
    <Page isLoading={loading}>
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
          <ViewProfilePicture setEdit={setEdit} user={user} name={inputs.name} />
          <Input value={inputs.name} label="Name" onChange={handleChange} readOnly disabled />
          <Input value={inputs.email} label="Email" onChange={handleChange} readOnly disabled />
          <Input value={inputs.organization} label="Organization" onChange={handleChange} />
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
        </Grid>
      </Grid>
    </Page>
  );
}

const Buttons = styled(Flex)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  grid-gap: 10px;
  margin-top: 20px;
`;

const FileInput = styled(Input)`
  padding: 4px;
  padding-left: 4px !important;
  padding-right: 4px !important;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

export default Account;
