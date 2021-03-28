import React, { useState } from "react";
import { Flex, Grid, Heading, Button, Icon, IconButton } from "@chakra-ui/react";
import { Input, Select } from "components";
import { FaTrash, FaPlus, FaBars } from "react-icons/fa";
import { CirclePicker } from "react-color";
function StatusEdit({
  study,
  updateAllStatuses,
  updateAllColorStatuses,
  allStatuses,
  deleteStatus,
  handleAllStatusesCancel,
  handleAllStatusesSubmit,
}) {
  const defaultColors = ["#808080", "#800080", "#00FFFF", "#008000", "#FF0000"];
  return (
    <>
      {allStatuses.map((thisStatus, index) => (
        <>
          <Flex gridGap="10px" w="100%">
            <Input
              placeholder="Status"
              name="name"
              value={thisStatus.value.name}
              // error={error.prompt}
              onChange={(name, value) => updateAllStatuses(index, name, value)}
            />
            <CirclePicker
              color={thisStatus.value.color}
              name="color"
              colors={defaultColors}
              circleSize={20}
              circleSpacing={8}
              onChangeComplete={(color) => updateAllColorStatuses(index, color)}
            />
            <IconButton
              colorScheme=""
              color="gray.500"
              _hover={{ color: "red.500", bg: "red.100" }}
              icon={<FaTrash />}
              onClick={() => deleteStatus(index)}
            />
          </Flex>
        </>
      ))}
      <Flex gridGap="10px" py="20px" justify="flex-end">
        <Button variant="outline" onClick={handleAllStatusesCancel}>
          Cancel
        </Button>
        <Button
          colorScheme="blue"
          onClick={handleAllStatusesSubmit}
          //   isLoading={loading}
          //   loadingText="Saving"
        >
          Save
        </Button>
      </Flex>
    </>
  );
}
export default StatusEdit;
