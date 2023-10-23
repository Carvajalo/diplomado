import React, { useEffect } from 'react'
import { Routes } from 'react-router-dom'
import Login from '../screens/Login'
import Home from '../screens/Home'
import { Route } from 'react-router-dom'
import { ContainerFull } from '../styled-components/Container.styled'
import { useSelector } from 'react-redux'
import { selectUser } from '../slicers/userSlice'
import Header from '../components/header/Header'
import { Navigate } from 'react-router-dom'
import { publicRoutes } from './routes'
import { WrapperComponent } from './WrapperComponent'

const RoutePublic = () => {
  const user = useSelector(selectUser);

  return (
    <ContainerFull height={'auto'} minH={'100vh'}>
      <Routes>
        {
          publicRoutes.map((route, index) => {
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
        <Route path='*' element={<Navigate to="/home" replace />} />
      </Routes>
    </ContainerFull>
  )
}

export default RoutePublic