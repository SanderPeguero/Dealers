import React from 'react'
import AboutUS from '../../Components/AboutUS/AboutUS'
import Navbar from '../NavBar/NavBar'

function AboutUSLayout() {
  return (
    <div className="bg-black">
        <Navbar/>
        <AboutUS/>
    </div>
  )
}

export default AboutUSLayout