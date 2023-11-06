import React from 'react'
import { ContainerHeader } from '../../styled-components/Container.styled'
import { Link, Box, Flex, Text, Button, Stack } from "@chakra-ui/react";
import BotHeader from './botheader/BotHeader';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);


  return (
    <ContainerHeader maxW='100vw'>
      <Box width='100vw' height='60%' background='#3e3e3e'>
        <Text
          textAlign={'center'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          fontSize={'2xl'}
          fontWeight={'bold'}
          color={'#4299E1'}
          height={'100%'}

        >
          {" Acá pondría la publicidad de los productos:)"}
        </Text>
      </Box>
      <Box width='100vw' height='40%' background='blue.400'>
        <BotHeader />
      </Box>
    </ContainerHeader>

  )
}

export default Header