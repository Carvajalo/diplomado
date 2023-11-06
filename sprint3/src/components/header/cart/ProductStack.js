import React, { useEffect } from 'react'
import { Button, Input, Box, Flex, Heading, Image, Stack, Text, Grid } from '@chakra-ui/react';
import { addToCart, decreaseQuantity, editQuantity, removeToCart } from '../../../slicers/cartSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

const ProductStack = ({ id, image, title, description, quantity: initialQuantity = 0, price, alt = title }) => {
  const dispatch = useDispatch()
  const { register, formState: { errors } } = useForm({
    defaultValues: {
      quantity: initialQuantity
    }
  });


  return (
    <Stack spacing={4} p={4} id={id}>
      <Box
        borderWidth="1px"
        borderRadius="md"
        p={4}
        boxShadow="md"
        _hover={{ boxShadow: "lg" }}
        position="relative"
      >
        <Button colorScheme="red" size="xs" position="absolute" left="2" top="2"
          onClick={() => {
            dispatch(removeToCart({ id, image, title, description, price, alt, quantity: 1 }))
          }}
        >
          x
        </Button>
        <Flex justify="space-between" align="center">
          <Image
            src={image}
            alt={alt}
            borderRadius='lg'
            maxH='10vh'
            maxW='100vh'
            objectFit='cover'
          />
          <Box flex="1" ml={4}>
            <Heading as="h2" size="md">
              {title}
            </Heading>
            <Text
            >{description?.length > 7 ? description.substring(0, 7) + '...' : description}</Text>
          </Box>
        </Flex>
        <Text marginTop={2}>
          Price <strong>$<span className="product-price">{price}</span></strong>
        </Text>
        <Flex align="center" marginTop={2}>
          <Button
            size="sm"
            colorScheme="teal"
            borderTopRightRadius="0"
            borderBottomRightRadius="0"
            onClick={() => {
              dispatch(decreaseQuantity({ id, image, title, description, price, alt, quantity: 1 }))
            }}
          >
            -
          </Button>
          <Input type='number'
            value={initialQuantity}
            size="sm" width={'100%'}
            onKeyDown={(e) => {
              if (e.key === 'e' || e.key === '+' || e.key === '-') e.preventDefault()
            }}
            {...register("quantity", {
              required: true, min: 1, max: 10,
              onChange: (e) => {
                if (Number(e.target.value) < 1) return dispatch(editQuantity({ id, image, title, description, price, alt, quantity: 1 }))
                dispatch(editQuantity({ id, image, title, description, price, alt, quantity: Number(e.target.value) }))
              },
            })}
          />

          <Button
            size="sm"
            colorScheme="teal"
            borderTopLeftRadius="0"
            borderBottomLeftRadius="0"
            onClick={() => {
              dispatch(addToCart({ id, image, title, description, price, alt, quantity: 1 }))
            }}
          >
            +
          </Button>
        </Flex>
      </Box>
    </Stack>
  )
}

export default ProductStack