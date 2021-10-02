import { Flex, Text, Button } from "@chakra-ui/react";
import AlertBar from "./AlertBar";

function VerificationPending({ email, loading, handleSendVerificationEmail }) {
  return (
    <AlertBar status="warning">
      <Flex justify="space-between" align="center" wrap="wrap" width="100%">
        <Text>
          Please check your inbox at <b>{email}</b> for a verification link to
          begin creating studies
        </Text>
        <Button
          size="sm"
          color="white"
          background="#DD6B20"
          _hover={{ bg: "#CD5B10" }}
          onClick={handleSendVerificationEmail}
          isLoading={loading}
          loadingText="Sending..."
        >
          Resend Verification Email
        </Button>
      </Flex>
    </AlertBar>
  );
}

export default VerificationPending;
