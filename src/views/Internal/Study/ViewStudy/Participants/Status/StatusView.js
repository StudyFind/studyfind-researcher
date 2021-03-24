import React, { useState } from "react";

import { Grid, Flex, Badge, Radio, RadioGroup, Button } from "@chakra-ui/react";
function StatusView({
  allStatuses,
  status,
  study,
  setStatus,
  handleCancel,
  handleSubmit,
  loading,
  setEdit,
}) {
  console.log(status);
  return (
    <RadioGroup value={status} onChange={setStatus}>
      <Grid gap="20px" bg="white" rounded="md" borderWidth="1px" p="20px">
        {allStatuses.map((thisStatus, index) => (
          <Radio key={index} value={thisStatus.value.name}>
            <Flex align="center">
              <Badge colorScheme={thisStatus.value.color}>{thisStatus.value.name}</Badge>
            </Flex>
          </Radio>
        ))}
      </Grid>
      <Flex gridGap="10px" py="20px" justify="flex-end">
        <Button variant="outline" onClick={() => setEdit(true)}>
          Edit Statuses
        </Button>
        <Button variant="outline" onClick={() => handleCancel()}>
          Cancel
        </Button>
        <Button
          colorScheme="blue"
          onClick={() => handleSubmit()}
          isLoading={loading}
          loadingText="Saving"
        >
          Save
        </Button>
      </Flex>
    </RadioGroup>
  );
}
export default StatusView;
