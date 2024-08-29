import React from "react"
import ProductDetails from '../../Components/ProductDetails/ProductDetails'
import Navbar from "../NavBar/NavBar"
import AvailableCarDetails from "../../Components/AvailableCarDetails/AvailableCarDetails"
const DetailsAutos = () => {

    return (

        <div className="bg-black">
            <Navbar background={'dark:bg-[#12232E]'} />
            <AvailableCarDetails />
        </div>
    )
}

export default DetailsAutos