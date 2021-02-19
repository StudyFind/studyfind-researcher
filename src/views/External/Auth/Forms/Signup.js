import React from "react";

import { useAuthForm } from "hooks";
import { signup } from "database/auth";

import { useHistory } from "react-router-dom";
import { Form, Heading, Name, Email, Password, Button, TabLink } from "views/External/Auth/Blocks";
import { Message } from "components";
import { Text, useToast } from "@chakra-ui/react";

function Login({ setTab }) {
  const toast = useToast();
  const history = useHistory();

  const { inputs, errors, success, loading, handleChange, handleSubmit } = useAuthForm({
    initial: { name: "", email: "", password: "" },
    onSubmit: signup,
  });

  const handleRedirect = () => {
    history.push("/welcome");
  };

  const handleSubmitFull = () => {
    handleSubmit(inputs.name, inputs.email, inputs.password).then(() => {
      toast({
        title: "Welcome to StudyFind!",
        description: (
          <>
            Click{" "}
            <a onClick={handleRedirect}>
              <Text display="inline" fontWeight="700" textDecoration="underline">
                here
              </Text>
            </a>{" "}
            to automatically fetch all your studies from clinicaltrials.gov and add them to your
            StudyFind account.
          </>
        ),
        status: "info",
        duration: 10000,
        position: "bottom-right",
      });
    });
  };

  if (success) {
    return (
      <Message
        type="success"
        title="Account Created!"
        description="Check your email for a verification link"
        padding="40px 30px"
      >
        <TabLink onClick={() => setTab("login")}> Back to login </TabLink>
      </Message>
    );
  }

  return (
    <Form onSubmit={() => handleSubmitFull()}>
      <Heading>Create Account!</Heading>
      <Name value={inputs.name} error={errors.name} onChange={handleChange} />
      <Email value={inputs.email} error={errors.email} onChange={handleChange} />
      <Password value={inputs.password} error={errors.password} onChange={handleChange} />
      <Button loading={loading}>Sign up</Button>
      <TabLink onClick={() => setTab("login")}>Have an account?</TabLink>
    </Form>
  );
}

export default Login;
