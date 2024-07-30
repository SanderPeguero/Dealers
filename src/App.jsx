import { useState } from 'react'
import { HashRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { useContextCar } from './Context/Context'
import MainScreen from './Layout/MainScreen/MainScreen'
import LogInLayout from './Layout/LogInLayout/LogInLayout'
import SignInLayout from './Layout/SignInLayout/SignInLayout'
import Footer from './Layout/Footer/Footer'
import DetailsAutos from './Layout/DetailsAutos/DetailsAuto'

function App() {
  const { user, WhichRole, locationR } = useContextCar()


  const commonRoutes = [
    { path: '/', element: <MainScreen /> },
    { path: '/DetailsAutos', element: <DetailsAutos /> },
  ]

  const AdminRoutes = [
    { path: '/', element: <MainScreen /> },
    { path: '/LognIn', element: <LogInLayout /> },
    { path: '/SignIn', element: <SignInLayout /> },
    { path: '/DetailsAutos', element: <DetailsAutos /> },
  
  ]


  const routes = [...commonRoutes, ...AdminRoutes.map(route => ({ ...route, path: `/admin${route.path}` }))];

  return (

    <>
      <Router>
        <Routes>
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
