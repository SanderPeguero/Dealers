import { useState } from 'react'
import { HashRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { useContextCar } from './Context/Context'
import MainScreen from './Layout/MainScreen/MainScreen'
import LogInLayout from './Layout/LogInLayout/LogInLayout'
import SignInLayout from './Layout/SignInLayout/SignInLayout'
import Footer from './Layout/Footer/Footer'
import ReservarLayout from './Layout/ReservarLayout/ReservarLayout'
import DetailsAutos from './Layout/DetailsAutos/DetailsAuto'
import UserLayout from './Layout/UserLayout/UserLayout'
import AboutUSLayout from './Layout/AboutUSLayout/AboutUSLayout'


function App() {
  const { user, WhichRole, locationR } = useContextCar()


  const commonRoutes = [
    { path: '/', element: <MainScreen /> },
    { path: '/DetailsAutos', element: <DetailsAutos /> },
    { path: '/AboutUS', element: <AboutUSLayout /> },

  ]

  const AdminRoutes = [
    { path: '/', element: <MainScreen /> },
    { path: '/LognIn', element: <LogInLayout /> },
    { path: '/SignIn', element: <SignInLayout /> },
    { path: '/Reservas', element: <ReservarLayout />},
    { path: '/DetailsAutos', element: <DetailsAutos /> },
    { path: '/TableUser', element: <UserLayout /> },
    
  
  ]


  const routes = [...commonRoutes, ...AdminRoutes.map(route => ({ ...route, path: `/admin${route.path}` }))];

  return (

    <>
      <Router>
        <Routes>1
          {routes.map((route, index) => (
            <Route key={index} {...route} />
          ))}
        </Routes>
      </Router>
      <Footer />

    </>
  )
}

export default App
