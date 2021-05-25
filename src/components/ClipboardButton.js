import React from "react";

import { Button, useClipboard } from "@chakra-ui/react";
import { FaCopy, FaCheckCircle } from "react-icons/fa";

function ClipboardButton({ children, link, copiedText }) {
  const { hasCopied, onCopy } = useClipboard(link);

  if (hasCopied) {
    return (
      <Button
        variant="outline"
        colorScheme="green"
        bg="green.100"
        borderColor="green.200"
        _hover={{ bg: "green.100" }}
        leftIcon={<FaCheckCircle />}
        onClick={onCopy}
      >
        {copiedText || "Copied!"}
      </Button>
    );
  }

  return (
    <Button variant="outline" color="gray.500" leftIcon={<FaCopy />} onClick={onCopy}>
      {children || "Copy"}
    </Button>
  );
}

export default ClipboardButton;
