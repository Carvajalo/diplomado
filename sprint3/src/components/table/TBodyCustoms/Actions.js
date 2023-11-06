import React from 'react'
import { Menu, MenuButton, Icon, MenuItem, MenuList, Divider, Button } from '@chakra-ui/react'
import { HiDotsHorizontal } from "react-icons/hi";


const Actions = ({ onEdit, onDelete, onRestore, onShow }) => {
  const isDisabled = onEdit || onDelete || onRestore || onShow ? false : true;

  return (
    <Menu>
      <MenuButton disabled={isDisabled} >
        <Icon
          fontSize={'xl'} fontWeight='bold' as={HiDotsHorizontal} color={isDisabled ? 'gray.500' : 'white'} />
      </MenuButton>
      <MenuList bg='blackAlpha.400'  >
        {onEdit &&
          <MenuItem fontWeight="bold" fontSize="lg" bg='blackAlpha.400'
            onClick={onEdit}>
            Editar
          </MenuItem>
        }
        {onRestore &&
          <MenuItem fontWeight="bold" fontSize="lg" bg='blackAlpha.400'>Recuperar</MenuItem>}
        {onDelete &&
          <MenuItem fontWeight="bold" fontSize="lg" bg='blackAlpha.400'
            onClick={onDelete}>
            Eliminar
          </MenuItem>
        }
        {onShow &&
          <React.Fragment>
            <Divider />
            <MenuItem fontWeight="bold" fontSize="lg" bg='blackAlpha.400'>Ver</MenuItem>
          </React.Fragment>}
      </MenuList>
    </Menu>
  )
}


export default Actions