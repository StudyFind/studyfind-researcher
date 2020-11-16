import React from "react";

import { Modal as OGModal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton } from "@chakra-ui/core";

// since we're redefining Modal here, need to alter import name
function Modal({ isOpen, onClose, title, children }) {
    return (
        <OGModal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />

                {children}

            </ModalContent>
        </OGModal>
    )
}

export default Modal