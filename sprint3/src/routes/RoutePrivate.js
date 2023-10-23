import React from 'react'
import { ContainerFull, ContainerHeader } from '../styled-components/Container.styled'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from '../screens/Home'
import Login from '../screens/Login'
import { Navigate } from 'react-router-dom'
import Header from '../components/header/Header'
import { Container, Box } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectUser } from '../slicers/userSlice'
import Profile from '../screens/Profile'
import { privateRoutes, publicRoutes } from './routes'
import { WrapperComponent } from './WrapperComponent'



const RoutePrivate = () => {
  return (
    <ContainerFull height={'auto'}>
      <Routes>
        <Route path='*' element={<Navigate to="/home" replace />} />
        {
          privateRoutes.user.map((route, index) => {
            const { element } = route
            return (
              <Route
                key={index}
                path={route.path}
                element={<WrapperComponent element={element} props={route.props}
                >{element}</WrapperComponent>}
              />
            )
          })
        }
      </Routes>
    </ContainerFull>
  )
}

export default RoutePrivate