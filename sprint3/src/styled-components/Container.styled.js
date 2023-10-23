import { Container, Box } from '@chakra-ui/react'
import styled from 'styled-components'

export const ContainerFull = styled(Box)`
  background-color: ${(props) => props.bg || '#262626'};
  color: ${(props) => props.color || 'white'}; 
  height: ${(props) => props.height || '100vh'}; 
`

export const ContainerHeader = styled(Container)`
  box-sizing: border-box;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props) => props.height || '15vh'};
  color: ${(props) => props.color || 'white'};
  background-color: ${(props) => props.bg || 'red'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`