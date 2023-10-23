import React from 'react'
import { Box, Image, Badge, Card, CardBody, Stack, Heading, Text, Divider, Button, CardFooter, ButtonGroup, Center, useColorMode } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../slicers/cartSlice'

const Product = ({ id, image, title, description, price, alt = title }) => {
  const { colorMode } = useColorMode();
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart({ id, image, title, description, price, alt }))
  }


  return (
    <Card maxW='xs' bg={colorMode}>
      <CardBody>
        <Center>
          <Image
            src={image}
            alt={alt}
            borderRadius='lg'
            maxH='15vh'
            maxW='100vh'
            objectFit='cover'
          />
        </Center>
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{title}</Heading>
          <Text>
            {description?.length > 100 ? description.substring(0, 100) + '...' : description}
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            ${price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button variant='solid' colorScheme='blue'>
            Buy now
          </Button>
          <Button variant='ghost' colorScheme='blue' onClick={handleAddToCart}>
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}

export default Product
