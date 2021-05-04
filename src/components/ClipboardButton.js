import React, { useState } from "react";

import { Button } from "@chakra-ui/react";
import { FaCopy, FaCheckCircle } from "react-icons/fa";

function ClipboardButton({ children, link, copiedText }) {
  const [success, setSuccess] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link).then(() => setSuccess(true));
  };

  return success ? (
    <Button
      variant="outline"
      colorScheme="green"
      bg="green.100"
      borderColor="green.200"
      _hover={{ bg: "green.100" }}
      leftIcon={<FaCheckCircle />}
      onClick={handleCopyLink}
    >
      {copiedText || "Copied!"}
    </Button>
  ) : (
    <Button variant="outline" color="gray.500" leftIcon={<FaCopy />} onClick={handleCopyLink}>
      {children || "Copy Link"}
    </Button>
  );
}

export default ClipboardButton;
