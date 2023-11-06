import React from 'react'
import { ContainerFull } from '../styled-components/Container.styled'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { privateRoutes } from './routes'
import { WrapperComponent } from './WrapperComponent'
import { useSelector } from 'react-redux'
import { selectUser } from '../slicers/userSlice'



const RoutePrivate = () => {
  const user = useSelector(selectUser);

  return (
    <ContainerFull height={'auto'}>
      <Routes>
        <Route path='*' element={<Navigate to="/home" replace />} />
        {
          privateRoutes.shareRoutes.map((route, index) => {
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
        {
          privateRoutes?.[user?.role]?.map((route, index) => {
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