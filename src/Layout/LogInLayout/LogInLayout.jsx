import React from "react"
import Navbar from "../NavBar/NavBar"
import LogIn from "../../Components/LogIn/LogIn"
const LogInLayout = () => {

    return (
        <div className="bg-black">
            <Navbar />
            <LogIn />
        </div>
    )
}

export default LogInLayout