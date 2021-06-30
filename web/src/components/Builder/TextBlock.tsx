import { Text, Flex } from "@chakra-ui/react";
import * as React from "react";
import BlockControls from "./BlockControls";

const TextBlock = ({
  content,
  position,
}: {
  content: string;
  position: number;
}) => {
  return (
    <Flex maxW="1000px" justifyContent="space-between" mx="auto">
      <Text w="100%" maxW="600px">
        {content}
      </Text>
      ;
      <BlockControls position={position} />
    </Flex>
  );
};

export default TextBlock;
