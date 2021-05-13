import React, { useState } from "react";
import { Box, Text, Button, Input, Select } from "@chakra-ui/react";
import { Form } from "components";

function Question({ question }) {
  if (!question) {
    return (
      <Box>
        <Input label="prompt" placeholder="prompt"></Input>
        <Select label="type">
          <option value="multiple choice">Multiple Choice</option>
          <option value="checkbox">Checkbox</option>
          <option value="short response">Short Response</option>
          <option value="long response">Long Response</option>
        </Select>
        if
      </Box>
    );
  }
}

export default Question;
