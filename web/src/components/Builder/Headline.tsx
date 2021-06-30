import { Heading } from "@chakra-ui/layout";
import {
  Flex,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import BlockControls from "./BlockControls";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { editBlock } from "../../features/blocks/blocksSlice";

const Headline = ({
  content,
  position,
}: {
  content: string;
  position: number;
}) => {
  const block = useAppSelector((state) => state.blocks.present[position]);
  const dispatch = useAppDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalContent, setModalContent] = useState(block.content);

  const saveEdit = () => {
    dispatch(editBlock({ content: modalContent, index: position }));
  };

  useEffect(() => {
    // save and reset modalContent to saved value when close
    if (!isOpen) {
    }
  }, [isOpen]);
  return (
    <Flex maxW="1000px" justifyContent="space-between" mx="auto">
      <Heading>{content}</Heading>
      <Button onClick={onOpen}>Edit</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{block.type}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={modalContent}
              type="text"
              onChange={(e) => setModalContent(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={saveEdit}>
              Save Changes
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <BlockControls position={position} />
    </Flex>
  );
};

export default Headline;
