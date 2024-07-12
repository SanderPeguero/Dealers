import React, { useState, useRef, useEffect } from "react"
import Navbar from "../NavBar/NavBar"
import Hero from '../../Components/Hero/Hero'
import Recomendado from "../../Components/Recomendado/Recomendado"
// import Testimonio from '../../Components/Testimono/Testimonio'
import Contacto from '../../Components/Contacto/Contacto'
import { useContextCar } from "../../Context/Context"
// import Testimonio from "../../Components/Testimono/Testimonio"
import CarDetails from "../../Components/CarDetails/CarDetails"
import EngineDetails from "../../Components/EngineDetails/EngineDetails"
import Dimension from "../../Components/Dimension/Dimension"
import Feature from "../../Components/Feature/Feature"
import UpImagine from "../../Components/UpImagine/UpImagine"
import Price from "../../Components/Price/Price"

const MainScreen = () => {

    const { user, WhichRole, AutosVisible, setAutosVisible, AutosInVisible, setAutosInVisible,
        ContactoVisibles, setContactoVisibles, SaveCarSale, CarEdit,CarSaleDatos,updateCarDetails, updateEngineDetails, updateDimension, } = useContextCar()

    const AutosRef = useRef(null);
    const ContactoRef = useRef(null);



    useEffect(() => {
        if (AutosVisible === true && AutosRef.current) {
            AutosRef.current.scrollIntoView({ behavior: 'smooth' });
            setAutosVisible(false)
        }
    }, [AutosVisible]);

    useEffect(() => {
        if (ContactoVisibles === true && ContactoRef.current) {
            console.log("Scroll automatico")
            ContactoRef.current.scrollIntoView({ behavior: 'smooth' });
            setContactoVisibles(false)
        }
    }, [ContactoVisibles]);

 


    
    const [newFeature, setNewFeature] = useState('');



    useEffect(() => {
        if (CarEdit !== null) {
            CarSaleDatos.Sale.DetalleCoche = CarEdit.Sale.DetalleCoche
            console.log("Editar autos")
            console.log(CarSaleDatos)
        }
    }, [CarEdit])


    return (
        <>
            {/* Modales */}
            {/* <CarDetails />
            <EngineDetails />
            <Dimension />
            <Feature />
            <UpImagine />
            <Price /> */}

            < CarDetails updateCarDetails={updateCarDetails} />
            <EngineDetails updateEngineDetails={updateEngineDetails} />
            <Dimension updateDimension={updateDimension} />
            <Feature FeatureDatos={CarSaleDatos.Sale.Features} newFeature={newFeature} setNewFeature={setNewFeature} />
            <UpImagine AudiovisualDatos={CarSaleDatos.Sale.Multimedia} />
            <Price PriceDatos={CarSaleDatos.Sale.Precio} />




            <div className="bg-black">
                <Navbar background={'dark:bg-[#12232E]'} />
                <Hero />

                <div ref={AutosRef} >
                    <Recomendado />
                </div>

                <div ref={ContactoRef}>
                    <Contacto />
                </div>


            </div>
        </>
    )
}

export default MainScreen