import { Heading } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import * as React from "react";
import BlockControls from "./BlockControls";

const Headline = ({
  content,
  position,
}: {
  content: string;
  position: number;
}) => {
  return (
    <Flex maxW="1000px" justifyContent="space-between" mx="auto">
      <Heading>{content}</Heading>
      <BlockControls position={position} />
    </Flex>
  );
};

export default Headline;
