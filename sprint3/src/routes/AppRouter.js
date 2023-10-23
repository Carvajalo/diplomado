import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoutePrivate from './RoutePrivate';
import { useSelector } from 'react-redux';
import { selectUser } from '../slicers/userSlice';
import RoutePublic from './RoutePublic';



const AppRouter = () => {
  const user = useSelector(selectUser)

  console.log(user?.token ? "route private" : "route public")

  return (
    <BrowserRouter basename="/">
      {user?.token ? <RoutePrivate /> : <RoutePublic />}
    </BrowserRouter>
  )
}

export default AppRouter