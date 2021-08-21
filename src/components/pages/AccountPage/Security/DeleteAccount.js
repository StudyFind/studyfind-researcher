import { useAuth } from "hooks";
import { toasts } from "templates";

import { Grid, Button } from "@chakra-ui/react";
import { Form, EmailInput, PasswordInput } from "components";

import AccountHeader from "../AccountHeader";

function DeleteAccount({ handleDeleteAccount }) {
  const { values, errors, loading, handleChange, handleSubmit } = useAuth({
    initial: { email: "", password: "" },
    toasts: { success: toasts.deletedAccount },
    onSubmit: handleDeleteAccount,
  });

  return (
    <>
      <AccountHeader
        title="Delete Account"
        description="Deleting your account is a permenant action which will delete all your
        user information and research studies"
      />
      <Form onSubmit={handleSubmit}>
        <Grid gap="15px">
          <EmailInput
            name="email"
            label="Email"
            value={values.email}
            error={errors.email}
            onChange={handleChange}
          />
          <PasswordInput
            name="password"
            label="Password"
            value={values.password}
            error={errors.password}
            onChange={handleChange}
          />
          <Button type="submit" colorScheme="red" isLoading={loading}>
            Delete Account
          </Button>
        </Grid>
      </Form>
    </>
  );
}

export default DeleteAccount;
