import React from 'react'
import testImage from '../../assets/descarga.svg'
import { Box, Image, Text, Flex, Grid, useColorMode } from '@chakra-ui/react';
import Product from '../products/Product';

const ListProducts = () => {
  const products = [
    {
      image: testImage,
      title: 'Product 1',
      description: 'This is a description for product 1',
      price: 25,
    },
    {
      image: testImage,
      title: 'Product 2',
      description: 'This is a description for product 2',
      price: 18,
    },
    {
      image: testImage,
      title: 'Product 3',
      description: 'This is a description for product 3',
      price: 30,
    },
    {
      image: testImage,
      title: 'Product 4',
      description: 'This is a description for product 4',
      price: 15,
    },
    {
      image: testImage,
      title: 'Product 5',
      description: 'This is a description for product 5',
      price: 20,
    },
    {
      image: testImage,
      title: 'Product 6',
      description: 'This is a description for product 6',
      price: 35,
    },
    {
      image: testImage,
      title: 'Product 7',
      description: 'This is a description for product 7',
      price: 28,
    },
    {
      image: testImage,
      title: 'Product 8',
      description: 'This is a description for product 8',
      price: 22,
    },
    {
      image: testImage,
      title: 'Product 9',
      description: 'This is a description for product 9',
      price: 40,
    },
    {
      image: testImage,
      title: 'Product 10',
      description: 'This is a description for product 10',
      price: 12,
    },
    {
      image: testImage,
      title: 'Product 11',
      description: 'This is a description for product 11',
      price: 27,
    },
    {
      image: testImage,
      title: 'Product 12',
      description: 'This is a description for product 12',
      price: 19,
    },
    {
      image: testImage,
      title: 'Product 13',
      description: 'This is a description for product 13',
      price: 32,
    },
    {
      image: testImage,
      title: 'Product 14',
      description: 'This is a description for product 14',
      price: 24,
    },
    {
      image: testImage,
      title: 'Product 15',
      description: 'This is a description for product 15',
      price: 17,
    },
    {
      image: testImage,
      title: 'Product 16',
      description: 'This is a description for product 16',
      price: 38,
    },
    {
      image: testImage,
      title: 'Product 17',
      description: 'This is a description for product 17',
      price: 21,
    },
    {
      image: testImage,
      title: 'Product 18',
      description: 'This is a description for product 18',
      price: 29,
    },
    {
      image: testImage,
      title: 'Product 19',
      description: 'This is a description for product 19',
      price: 14,
    },
    {
      image: testImage,
      title: 'Product 20',
      description: 'This is a description for product 20',
      price: 31,
    },
  ];


  const { colorMode } = useColorMode();
  console.log("colorMode: ", colorMode)

  return (
    <React.Fragment>
      <Box w='full' h='fit-content' py={10}>
        <Text textAlign='center' fontSize='4xl' fontWeight='bold' color={colorMode === 'light' ? 'gray.700' : 'gray.100'}>Featured Products
        </Text>
      </Box>
      <Flex
        direction="column"
        justifyContent="center"
        maxW={{ xl: '1200px' }}
        m="0 auto"
      >
        <Grid
          w='full'
          gridGap={6}
          gridTemplateColumns={"repeat(auto-fit, minmax(30vh, 1fr))"}
          justifyItems='center'
        >
          {products.map((product, index) => (
            <Product key={index}
              id={index}
              image={product.image}
              title={product.title}
              description={product.description}
              price={product.price}
            />
          ))}
        </Grid>
      </Flex>
    </React.Fragment>
  );
};

export default ListProducts