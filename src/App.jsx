import { useState } from 'react'
import { HashRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { useContextCar } from './Context/Context'
import MainScreen from './Layout/MainScreen/MainScreen'
import CarSale from './Layout/CarSale/CarSaleLayout'



function App() {
  const { user, WhichRole, locationR } = useContextCar()


  const commonRoutes = [
    { path: '/', element: <MainScreen /> },
    { path: '/CarSale', element: <CarSale /> }
  ]

  const AdminRoutes = [
    // { path: '/', element: <MainScreen /> },
    // { path: '/CarSale', element: <CarSale /> }
  
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

    </>
  )
}

export default App
