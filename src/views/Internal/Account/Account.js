import React, { useState } from "react";
import styled from "styled-components";

import { signout } from "database";
import { auth } from "database/firebase";

import { Heading, Button, Grid } from "@chakra-ui/react";
import { Input, Textarea } from "components";
import { FaDoorOpen } from "react-icons/fa";

import { firestore } from "database/firebase";

function Account({ user }) {
  const { uid, email } = auth.currentUser;
  const researcherRef = firestore.collection("researchers").doc(uid);

  const original = {
    name: user.name || "",
    bio: user.bio || "",
    organization: user.organization || "",
  };

  const [inputs, setInputs] = useState(original);
  const [errors, setErrors] = useState({ name: "" });

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };

  const handleUpdate = () => {
    setErrors({ name: !inputs.name });
    if (!inputs.name) return;
    researcherRef.set({ name: inputs.name, organization: inputs.organization, bio: inputs.bio });
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

      <Grid gap="20px" p="20px 0" w="400px">
        <Input value={email} label="Email" readOnly />
        <Input
          label="Name"
          name="name"
          value={inputs.name}
          error={errors.name}
          onChange={handleChange}
        />
        <Input
          label="Organization"
          name="organization"
          value={inputs.organization}
          onChange={handleChange}
        />
        <Textarea
          label="Bio"
          name="bio"
          value={inputs.bio}
          error={errors.bio}
          onChange={handleChange}
          height="108px"
        />
        {!(JSON.stringify(original) === JSON.stringify(inputs)) && (
          <Button colorScheme="green" onClick={handleUpdate}>
            Save Changes
          </Button>
        )}
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
