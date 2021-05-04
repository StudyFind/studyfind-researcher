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
      color="green.500"
      bg="green.50"
      _hover={{ bg: "green.50" }}
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
