import React from "react"
import Navbar from "../NavBar/NavBar"
import SingIn from '../../Component/SingIn'
const SignInLayout = () => {

    return (
        <div className="bg-black">
            <Navbar />
            <SingIn />
        </div>
    )
}

export default SignInLayout