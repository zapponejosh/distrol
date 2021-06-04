import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  theme,
  StackDivider,
  Icon,
} from "@chakra-ui/react";
import { FaListAlt } from "react-icons/fa";

import Layout from "./components/Layouts/Layout";
import Header from "./components/Header";
import BuilderPage from "./pages/BuilderPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Main = () => (
  <Box textAlign="center" fontSize="xl">
    <Grid minH="100vh" p={3}>
      <VStack spacing={8} divider={<StackDivider borderColor="gray.200" />}>
        <Icon h="20vmin" w="auto" as={FaListAlt} />
        <Text>A simple, fast, and private social newsletter.</Text>
      </VStack>
    </Grid>
  </Box>
);

export const App = () => (
  <>
    <ChakraProvider theme={theme}>
      <Router>
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/create" element={<BuilderPage />} />
          </Routes>
        </Layout>
      </Router>
    </ChakraProvider>
  </>
);
