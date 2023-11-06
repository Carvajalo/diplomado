import React from 'react'
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import Header from '../components/header/Header';
import ListProducts from '../components/lists/ListProducts';


const Home = () => {
  return (
    <Box height='fit-content'>
      {/* Header */}
      <Header />
      <Box marginTop={'15vh'}>
      {/* Lista de productos */}
      <ListProducts />
      </Box>
    </Box>
  );
}

export default Home





