import React from "react"
import ProductDetails from '../../Components/ProductDetails/ProductoDetalle'
import Navbar from "../NavBar/NavBar"
const DetailsAutos = () => {

    return (

        <div className="bg-black">
            <Navbar background={'dark:bg-[#12232E]'} />
            <ProductDetails />
        </div>
    )
}

export default DetailsAutos