import React, { useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
} from "@chakra-ui/react";

export const CustomModal = ({ isOpen, onClose, children, footer, size, data, ...props }) => {

  const custonOnClose = () => {
    props?.clearData && props?.clearData();
    onClose();
  }

  return (
    <Modal
      closeOnOverlayClick={false}
      isCentered
      autoFocus={false}

      motionPreset="slideInRight"
      scrollBehavior={props?.scrollBehavior || "outside"}
      size={size || "2xl"}
      isOpen={isOpen}
      onClose={custonOnClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          dangerouslySetInnerHTML={{ __html: data?.title }}
        />
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          {props?.onCloseButton || (
            <Button colorScheme="cyan.400" mr={3} onClick={onClose}>
              Close
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CustomModal;