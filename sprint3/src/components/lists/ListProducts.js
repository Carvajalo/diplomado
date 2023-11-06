import React, { useEffect } from 'react'
import testImage from '../../assets/descarga.svg'
import { Box, Image, Text, Flex, Grid, useColorMode, Button } from '@chakra-ui/react';
import Product from '../products/Product';
import { useSelector } from 'react-redux';
import { selectCart } from '../../slicers/cartSlice';
import useUtilQuery from '../../hooks/useUtilQuery';
import API_URL from '../../constants/apiConst';
import { useInfiniteQuery } from '@tanstack/react-query'

const ListProducts = () => {
  const { colorMode } = useColorMode();
  const fetchProducts = async ({ pageParam = 1 }) => {
    const res = await fetch(`${API_URL.GET_PRODUCTS}?page=${pageParam}`)
    const data = res.json()
    return data
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['infinity-products'],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (data) => {
      return data?.next
    },
    getPreviousPageParam: (data, a) => {
      return data?.prev
    },
    refetchOnWindowFocus: false,
  })


  /* const { query: { data, isError, isLoading } } = useUtilQuery({
    endpoint: API_URL.GET_PRODUCTS,
    method: 'GET',
  }, { queryKey: ['products'] }); */

  useEffect(() => {
    console.log(data);
  }, [data])

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
        <Box
          minH={'70.5vh'}
        >
          <Grid
            w='full'
            gridGap={6}
            gridTemplateColumns={"repeat(auto-fit, minmax(30vh, 1fr))"}
            justifyItems='center'
          >
            {isLoading || !data ? (
              <Text>Loading...</Text>
            ) : (
              data?.pages?.map((group, _) => (
                group?.products?.map((product, index) => (
                  product.stock !== 0 && <Product
                    key={index}
                    id={product._id}
                    title={product.name}
                    description={product.description}
                    price={product.price}
                    image={product.image[0]}

                  />
                ))
              ))
            )}
          </Grid>
          <Button
            onClick={() => fetchNextPage()}
            mt={8}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? 'Loading more...'
              : hasNextPage
                ? 'Load More'
                : 'Nothing more to load'}
          </Button>
        </Box>
      </Flex>
    </React.Fragment>
  );
};

export default ListProducts