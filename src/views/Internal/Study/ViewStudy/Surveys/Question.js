import React, { useState } from "react";
import { Box, Text, Button, Input, Select, Grid, Heading } from "@chakra-ui/react";

function Question({ question, key }) {
  switch (question.type) {
    case "multiple choice":
      return <Grid></Grid>;
  }
}

export default Question;
