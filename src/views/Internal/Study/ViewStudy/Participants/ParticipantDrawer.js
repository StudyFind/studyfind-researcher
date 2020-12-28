import React from "react";

import {
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
} from "@chakra-ui/react";

function ParticipantDrawer({ fakename, onClose, isOpen, children }) {
  return (
    <Drawer size="md" placement="right" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          <Flex align="center" justify="space-between">
            <Flex align="center" gridGap="4px">
              {fakename}
            </Flex>
            <DrawerCloseButton position="static" />
          </Flex>
        </DrawerHeader>
        <DrawerBody p="25px" bg="#f8f9fa">
          {children}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default ParticipantDrawer;
