
import { Image, Flex, Button, HStack, chakra, Link, Text, InputLeftElement, InputGroup, Input, Spacer, Box, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import Logo from '../../../assets/descarga.svg'
import React from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaBars, FaShoppingCart, FaUser } from "react-icons/fa";


const MenuOptions = [
  {
    name: 'Sobre Nosotros',
    path: '/sobre-nosotros'
  },
  {
    name: 'Patrocinadores',
    path: '/patrocinadores'
  },
  {
    name: 'Cómo Llegar',
    path: '/como-llegar'
  }
]



export default function Header() {
  return (
    <Flex alignItems="center" px={'5%'}>
      <Text fontSize="xl" fontWeight="bold" color="white">
        <Image src={Logo} boxSize="50px" alt="Logo" />
      </Text>
      <Spacer />

      <Box display={{ base: "block", md: "none" }}>
        <IconButton
          aria-label="Open Menu"
          icon={<FaBars />}
          bg="transparent"
          color="white"
        />
      </Box>
      <Flex display={{ base: "none", md: "flex" }} alignItems="center">
        <Link href="/" mr={4} color="white">
          About us
        </Link>
        <Link href="/" mr={4} color="white">
          Sponsors
        </Link>
        <Link href="/" mr={4} color="white">
          How to find us
        </Link>
      </Flex>
      {/* Barra de búsqueda */}
      {/* <HStack>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input type="text" placeholder="Search" />
        </InputGroup>
      </HStack> */}

      <Flex alignItems="center">
        {/* Carrito de compras */}
        {/*  <IconButton
          aria-label="Carrito de Compras"
          icon={<FaShoppingCart />}
          bg="transparent"
          color="white"
          mr={4}
        /> */}
        <Menu>
          <MenuButton
            as={Box}
            color={'white'}
            p={2}
            _hover={{ bg: 'gray.400', borderRadius: 'md' }}
            _expanded={{ bg: 'blue.400' }}

          >
            <FaUser />
          </MenuButton>
          <MenuList bg='blackAlpha.400'  >
            <MenuItem fontWeight="bold" fontSize="lg" bg='blackAlpha.400' >
              Inicio de Sesión
            </MenuItem>
            <MenuItem fontWeight="bold" fontSize="lg" bg='blackAlpha.400' >
              Registrarse
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>

  );
}
