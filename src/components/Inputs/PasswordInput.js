import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { TextInput } from "./TextInput";

function PasswordInput({ name, value, label, error, onChange }) {
  const [show, setShow] = useState(false);

  return (
    <TextInput
      name={name}
      type={show ? "text" : "password"}
      value={value}
      error={error}
      label={label}
      onChange={onChange}
      rightWidth="4.2rem"
      right={
        <Button
          variant="outline"
          borderWidth="0"
          color="gray.500"
          size="sm"
          _hover={{ bg: "transparent", color: "blue.500" }}
          _active={{ bg: "transparent", color: "blue.500" }}
          onClick={() => setShow((prev) => !prev)}
        >
          {show ? "Hide" : "Show"}
        </Button>
      }
    />
  );
}

export default PasswordInput;
