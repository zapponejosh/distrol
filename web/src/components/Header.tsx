import * as React from "react";
import * as ReactDOM from "react-dom";
import { Flex, Link, Heading } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { Link as RouterLink } from "react-router-dom";

const Header = () => (
  <Flex
    direction="row"
    alignItems="flex-end"
    justify="space-around"
    padding="10px 15px"
  >
    <Link as={RouterLink} to="/create" w="100px">
      Make something
    </Link>
    <Link as={RouterLink} to="/">
      <Heading>DistroL</Heading>
    </Link>
    <ColorModeSwitcher justifySelf="flex-end" w="100px" />
  </Flex>
);

export default Header;
