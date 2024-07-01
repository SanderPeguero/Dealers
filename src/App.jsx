import { useState } from 'react'
import { HashRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { useContextCar } from './Context/Context'

function App() {
  const { user, WhichRole, locationR } = useContextCar()


  const commonRoutes = [

  ]

  const AdminRoutes = [

  ]



  const routes = [...commonRoutes, ...AdminRoutes.map(route => ({ ...route, path: `/admin${route.path}`}))];

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
