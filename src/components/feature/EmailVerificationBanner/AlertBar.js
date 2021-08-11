import { Alert, AlertIcon } from "@chakra-ui/react";

function AlertBar({ children, status }) {
  return (
    <Alert status={status} zIndex="100">
      <AlertIcon />
      {children}
    </Alert>
  );
}

export default AlertBar;
