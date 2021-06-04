import * as React from "react";
import * as ReactDOM from "react-dom";
import { Flex, Box } from "@chakra-ui/react";

const Layout = (props: any) => {
  return (
    <Flex
      padding="10px 15px"
      direction="column"
      alignItems="center"
      className="base-page"
      {...props}
    >
      <Box w="100%" m="0 auto">
        {props.children}
      </Box>
    </Flex>
  );
};

export default Layout;
