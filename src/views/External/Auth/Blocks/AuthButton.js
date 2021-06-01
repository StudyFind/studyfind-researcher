import React from "react";
import { Button } from "@chakra-ui/react";

function AuthButton({ children, loading, ...rest }) {
  return (
    <Button colorScheme="blue" type="submit" isLoading={loading} loadingText={children} {...rest}>
      {children}
    </Button>
  );
}

export default AuthButton;
