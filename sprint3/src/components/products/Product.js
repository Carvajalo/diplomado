import React from 'react'
import { Box, Image, Badge, Card, CardBody, Stack, Heading, Text, Divider, Button, CardFooter, ButtonGroup, Center, useColorMode } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../slicers/cartSlice'
import { selectUser } from '../../slicers/userSlice'
import useUtilQuery from '../../hooks/useUtilQuery'
import API_URL from '../../constants/apiConst'
import { useAlert } from '../../hooks/useAlert'
import { useNavigate } from 'react-router-dom'

const Product = ({ id, image, title, description, price, alt = title }) => {
  const { colorMode } = useColorMode();
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const navigate = useNavigate()

  const { mutation: { mutate } } = useUtilQuery({}, {
    queryKey: ['infinity-products'],
    enabled: false,
    invalidateQueries: true,
  })

  const handleAddToCart = () => {
    dispatch(addToCart({ id, image, title, description, price, alt, quantity: 1 }))
  }

  const { openAlert } = useAlert();

  const handleBuyNow = () => {
    if (!user?.token) return navigate('/login');
    mutate({
      endpoint: API_URL?.PURCHASE,
      method: 'POST',
      body: {
        products: [{ id, quantity: 1 }]
      },
      token: user?.token,
    }, {
      onSuccess: () => {
        openAlert({
          type: 'success',
          message: `Your purchase was successful! You bought ${title} for $${price}`,
        })
      },
      onError: (error) => {
        openAlert({
          type: 'error',
          message: error?.response?.data?.message,
        })
      }
    })
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
          <Button variant='solid' colorScheme='blue' isDisabled={user?.role === 'admin'} onClick={handleBuyNow} >
            Buy now
          </Button>
          <Button variant='ghost' colorScheme='blue' isDisabled={user?.role === 'admin'} onClick={handleAddToCart}>
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}

export default Product
