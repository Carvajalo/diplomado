import React, { useEffect, useState } from 'react'
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Box } from '@chakra-ui/react'
import { clearCart, selectCart } from '../../../slicers/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import ProductStack from './ProductStack';
import { useForm3 } from '../../../hooks/useForm';
import useUtilQuery from '../../../hooks/useUtilQuery';
import API_URL from '../../../constants/apiConst';
import { selectUser } from '../../../slicers/userSlice';
import { useAlert } from '../../../hooks/useAlert';

const Cart = ({ isOpen, onClose }) => {
  const { products, value } = useSelector(selectCart);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const { mutation: { mutate } } = useUtilQuery({}, {
    queryKey: ['infinity-products'],
    enabled: false,
    invalidateQueries: true,
  })

  const { openAlert } = useAlert();

  const handleShop = () => {
    const productNames = products?.reduce((acc, product) => {
      return acc + ", " + product.title + " x" + product.quantity
    }, '')
    mutate({
      endpoint: API_URL?.PURCHASE,
      method: 'POST',
      body: {
        products: products
      },
      token: user?.token,
    }, {
      onSuccess: () => {
        openAlert({
          type: 'success',
          message: 'Your purchase was successful!',
          description: `You bought ${productNames}`,
        })
        return dispatch(clearCart());
      },
      onError: (error) => {
        const message = error?.response?.data?.message.reduce((acc, message) => {
          if (acc === '') return message.message
          return acc + ", " + message.message
        }, '')

        openAlert({
          type: 'error',
          message,
        })

      }

    })
  }


  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Cart list</DrawerHeader>

          {/* {products?.products?.map((product) =>
          (<Box key={product.id}>
            <Box>{product.title}</Box>
            <Input value={product.quantity} />
            <Button>+</Button>
            <Button>-</Button>
            <Button>X</Button>
          </Box>)
          )} */}

          <DrawerBody >
            {products?.map((product) => (
              <ProductStack key={product.id}
                id={product?.id}
                image={product?.image}
                title={product?.title}
                description={product?.description}
                price={product?.price}
                alt={product?.alt}
                quantity={product?.quantity}
              />
            ))}
          </DrawerBody>

          <Flex justify="space-between" align="center" p={4}>
            <Text>Total:</Text>
            <Text><strong>$<span className="cart-total">{parseFloat(value.toFixed(2))}</span></strong></Text>
          </Flex>
          <DrawerFooter>
            {/* Cancel button */}
            {/* <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button> */}
            <Button colorScheme='blue' onClick={handleShop}>Pay now!</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Cart