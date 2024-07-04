import React from "react"
import Navbar from "../NavBar/NavBar"
import LogIn from "../../Components/Login/LogIn"
const LogInLayout = () => {

    return (
        <div className="bg-black">
            <Navbar />
            <LogIn />
        </div>
    )
}

export default LogInLayout