
import { Image, Flex, Button, HStack, chakra, Link, Text, InputLeftElement, InputGroup, Input, Spacer, Box, IconButton, Menu, MenuButton, MenuList, MenuItem, Tooltip, MenuDivider } from '@chakra-ui/react';
import Logo from '../../../assets/descarga.svg'
import React, { useEffect } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaBars, FaShoppingCart, FaUser } from "react-icons/fa";
import useToggle from '../../../hooks/useToggle';
import Cart from '../cart/Cart';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, logout } from '../../../slicers/userSlice';
import { useAlert } from '../../../hooks/useAlert';


const MenuOptions = [
  {
    name: 'About us',
    path: '/aboutUs'
  },
  {
    name: 'Sponsors',
    path: '/sponsors'
  },
  {
    name: 'How to find us',
    path: '/findUs'
  },
  {
    name: 'Products',
    path: '/products',
    role: 'admin',
  }
]



export default function Header() {
  const [isOpen, setIsOpen, toggle] = useToggle()
  const { openAlert } = useAlert();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user);
  }, [user])

  const handleNavigationHome = () => {
    console.log({location: window.location.pathname})
    if(window.location.pathname === '/home') return openAlert({
      type: 'info',
      message: 'You are already in the home page!',
    });
    navigate('/home');
  }

  return (
    <Flex alignItems="center" px={'5%'}>
      <Text fontSize="xl" fontWeight="bold" color="white">
        <Image src={Logo} boxSize="50px" alt="Logo" onClick={handleNavigationHome} />
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
        {
          MenuOptions.map((option, index) => (
            <Link href={option.path} mr={4} color="white" key={index}>
              {
                option?.role !== 'admin' ? option.name : user?.role === 'admin' && option.name
              }
            </Link>
          ))
        }
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
        {
          user?.role !== 'admin' &&
          <Tooltip label="Shopping cart" placement='top'>
            <IconButton
              icon={<FaShoppingCart />}
              bg="transparent"
              color="white"
              mr={4}
              _hover={{ bg: 'gray.400', borderRadius: 'md' }}
              _expanded={{ bg: 'blue.400' }}
              onClick={toggle}
            />
          </Tooltip>}
        {/* Drawer CART */}
        <Cart isOpen={isOpen} onClose={toggle} />
        <Menu>
          <Tooltip label="User session" placement='top'>
            <MenuButton
              as={Box}
              color={'white'}
              p={3}
              _hover={{ bg: 'gray.400', borderRadius: 'md' }}
              _expanded={{ bg: 'blue.400' }}

            >
              {<FaUser />}
            </MenuButton>
          </Tooltip>
          <MenuList bg='blackAlpha.400'  >
            {
              !user?.token && (
                <>
                  <MenuItem fontWeight="bold" fontSize="lg" bg='blackAlpha.400' onClick={() =>
                    navigate('/login')
                  } >
                    Log in
                  </MenuItem>
                  <MenuItem fontWeight="bold" fontSize="lg" bg='blackAlpha.400' onClick={() =>
                    navigate('/signup')
                  } >
                    Sign in
                  </MenuItem>
                </>
              )
            }
            {
              user?.token && (
                <MenuItem fontWeight="bold" fontSize="lg" bg='blackAlpha.400'
                  onClick={() => {
                    openAlert({
                      type: "info",
                      message: "Successfully logged out",
                    })
                    dispatch(logout());
                    navigate('/home');
                  }} >
                  Log out!
                </MenuItem>
              )
            }
          </MenuList>
        </Menu>
      </Flex>
    </Flex>

  );
}
