import React from 'react'
import { ChakraProvider, Box, Button, Container, Heading, Image, Link, Text } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useState } from "react";
import Header from '../components/header/Header';
import { ContainerFull } from '../styled-components/Container.styled';
import ListProducts from '../components/lists/ListProducts';


const Home = () => {
  const [cartItems, setCartItems] = useState(0);

  const addToCart = () => {
    setCartItems(cartItems + 1);
  };

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





