import { useAuth } from "hooks";

import { Grid, Button } from "@chakra-ui/react";
import { Form, PasswordInput } from "components";

import AccountHeader from "../AccountHeader";

function ChangePassword({ handleChangePassword }) {
  const { values, errors, loading, handleChange, handleSubmit } = useAuth(
    { password: "", newPassword: "" },
    handleChangePassword
  );

  return (
    <>
      <AccountHeader
        title="Change Password"
        description="We recommend using a long password that is unique to your
        StudyFind account"
      />
      <Form onSubmit={handleSubmit}>
        <Grid gap="15px">
          <PasswordInput
            name="password"
            label="Old Password"
            value={values.password}
            error={errors.password}
            onChange={handleChange}
          />
          <PasswordInput
            name="newPassword"
            label="New Password"
            value={values.newPassword}
            error={errors.newPassword}
            onChange={handleChange}
          />
          <Button type="submit" colorScheme="blue" isLoading={loading}>
            Change Password
          </Button>
        </Grid>
      </Form>
    </>
  );
}

export default ChangePassword;
