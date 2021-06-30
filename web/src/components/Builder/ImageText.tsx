import { Box, Flex, SkeletonText, Image } from "@chakra-ui/react";
import * as React from "react";
import BlockControls from "./BlockControls";

const ImageText = ({
  content,
  position,
}: {
  content: string;
  position: number;
}) => {
  //  begin using useMemo to prevent rerender on reorder

  return (
    <Flex maxW="1000px" justifyContent="space-between" mx="auto">
      <Box maxW="600px" padding="6" boxShadow="lg" bg="gray">
        <Image
          borderRadius="full"
          boxSize="150px"
          src={content}
          alt="Block image"
        />{" "}
        <SkeletonText mt="4" noOfLines={1} spacing="4" />
      </Box>
      <BlockControls position={position} />
    </Flex>
  );
};

export default ImageText;
