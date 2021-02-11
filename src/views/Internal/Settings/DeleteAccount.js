import React, { useEffect } from "react";

import { useAuthForm } from "hooks";
import { deleteAccount } from "database/auth";

import { Form, Heading, Email, Password, Button } from "views/External/Auth/Blocks";
import { Box, useToast } from "@chakra-ui/react";

function ChangePassword() {
  const toast = useToast();

  const { inputs, errors, success, loading, handleChange, handleSubmit } = useAuthForm({
    initial: { email: "", password: "" },
    onSubmit: deleteAccount,
  });

  useEffect(() => {
    if (success) {
      toast({
        title: "Account Deleted",
        description: "Your account has been deleted along with all associated information ",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
    }
  }, [success]);

  return (
    <Box w="350px" bg="white" borderWidth="1px" borderColor="gray" rounded="md">
      <Form onSubmit={() => handleSubmit(inputs.email, inputs.password)}>
        <Heading color="red.500">Delete Account</Heading>
        <Email value={inputs.email} error={errors.email} onChange={handleChange} />
        <Password value={inputs.password} error={errors.password} onChange={handleChange} />
        <Button loading={loading} colorScheme="red">
          Confirm Delete Account
        </Button>
      </Form>
    </Box>
  );
}

export default ChangePassword;
