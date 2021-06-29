import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import * as React from "react";

const ImageText = () => {
  return (
    <>
      <Box maxW="600px" padding="6" boxShadow="lg" bg="gray">
        <SkeletonCircle size="100" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" />
      </Box>
    </>
  );
};

export default ImageText;
