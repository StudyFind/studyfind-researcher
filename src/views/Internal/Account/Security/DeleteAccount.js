import { useEffect } from "react";

import { toasts } from "templates";
import { useAuthForm } from "hooks";
import { deleteAccount } from "database/auth";

import { Grid, Button, useToast } from "@chakra-ui/react";
import { Form, TextInput, PasswordInput } from "components";

import AccountHeader from "../AccountHeader";

function DeleteAccount() {
  const toast = useToast();

  const { input, loading, success, handleSubmit } = useAuthForm({
    initial: { email: "", password: "" },
    onSubmit: deleteAccount,
  });

  useEffect(() => {
    if (success) {
      toast(toasts.deletedAccount);
    }
  }, [success]);

  return (
    <>
      <AccountHeader
        title="Delete Account"
        description="Deleting your account is a permenant action which will delete all your
        user information and research studies"
      />
      <Form onSubmit={handleSubmit}>
        <Grid gap="15px">
          <TextInput label="Email" {...input("email")} />
          <PasswordInput label="Password" {...input("password")} />
          <Button type="submit" colorScheme="red" isLoading={loading}>
            Delete Account
          </Button>
        </Grid>
      </Form>
    </>
  );
}

export default DeleteAccount;
