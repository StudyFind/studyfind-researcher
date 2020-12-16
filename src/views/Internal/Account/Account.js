import React, { useState } from "react";
import styled from "styled-components";
import { Heading, Button, Box, Flex, Grid } from "@chakra-ui/react";
import { Input } from "components";
import { signout } from "database";
import { auth } from "database/firebase";
import { FaDoorOpen } from "react-icons/fa";

import ViewProfilePicture from "./ViewProfilePicture";
import EditProfilePicture from "./EditProfilePicture";

function Account() {
  const user = auth.currentUser || {};
  const [edit, setEdit] = useState(false);
  const [inputs, setInputs] = useState({});

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };

  const different = false;

  return (
    <Page>
      <Head>
        <Heading size="lg">Account</Heading>
        {different && (
          <Buttons>
            <Button>Cancel</Button>
            <Button colorScheme="green">Save Changes</Button>
          </Buttons>
        )}
      </Head>
      <Box w="350px">
        <Flex direction="column" align="center" my="15px">
          {edit ? (
            <EditProfilePicture setEdit={setEdit} />
          ) : (
            <ViewProfilePicture setEdit={setEdit} user={user} name={inputs.name} />
          )}
        </Flex>
        <Grid gap="15px">
          <Input value={inputs.name} label="Name" onChange={handleChange} />
          <Input
            value={user.email}
            readOnly
            bg="transparent"
            _focus={{ border: "" }}
            label="Email"
            onChange={handleChange}
          />
          <Input value={inputs.organization} label="Organization" onChange={handleChange} />
          <Button colorScheme="red" leftIcon={<FaDoorOpen />} onClick={signout}>
            Sign out
          </Button>
        </Grid>
      </Box>
    </Page>
  );
}

const Buttons = styled(Flex)`
  display: flex;
  align-items: center;
  grid-gap: 10px;
`;

const Page = styled.div`
  padding: 30px;
  height: 100%;
  background: #f8f9fa;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

export default Account;
