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
import {validateCarSaleDatos} from './Validations'

const CarSaleDatos = {
    Sale: {
        IdCarSale: "",
        DetalleCoche: {
            Titulo: "",
            Condicion: "",
            TipoCuerpo: "",
            Marca: "",
            Modelo: "",
            Year: "",
            Capacidad: "",
            Color: "",
            Descripcion: ""
        },
        DetalleMotor: {
            TipoCombustimble: "",
            Kilometraje: "",
            Transmision: "",
            DriverTrain: "",
            CapacidadMotor: "",
            Power: "",
        },
        Dimension: {
            Longitud: "",
            Ancho: "",
            Altura: "",
            VolumenCarga: ""
        },

        Features: {
            Features: [],
            Otros: "No"
        },
        Precio: {
            Precio: 0
        },

        Multimedia: {
            Imagen: []
        },
    }
}

const MainScreen = () => {

    const { user, WhichRole, AutosVisible, setAutosVisible, AutosInVisible, setAutosInVisible,
        ContactoVisibles, setContactoVisibles, SaveCarSale, CarEdit } = useContextCar()

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
            ContactoRef.current.scrollIntoView({ behavior: 'smooth' });
            setContactoVisibles(false)
        }
    }, [ContactoVisibles]);


    const [newFeature, setNewFeature] = useState('');

    const updateCarDetails = (updatedDetails) => {
        CarSaleDatos.Sale.DetalleCoche = updatedDetails;
    }

    const updateEngineDetails = (updatedDetails) => {
        CarSaleDatos.Sale.DetalleMotor = updatedDetails;
    }

    const updateDimension = (updatedDetails) => {
        CarSaleDatos.Sale.Dimension = updatedDetails
    }

    const handleSale = (e) => {
        e.preventDefault();
     
        if (validateCarSaleDatos(CarSaleDatos.Sale)) {
            SaveCarSale(CarSaleDatos, user.uid);
            alert("Guardado");
        } else {
            alert('Por favor completa todos los campos.');
        }
    };
   
    const handleEdit = (e) => {

        e.preventDefault()
        if (validateCarSaleDatos(CarSaleDatos.Sale)) {
            alert("Guardado");
        } else {
            alert('Por favor completa todos los campos.');
        }
    }

    useEffect(() => {
        if (CarEdit !== null) {
            CarSaleDatos.Sale.DetalleCoche = CarEdit.Sale.DetalleCoche
        }
    }, [CarEdit])


    return (
        <>
            < CarDetails updateCarDetails={updateCarDetails} />
            <EngineDetails updateEngineDetails={updateEngineDetails} />
            <Dimension updateDimension={updateDimension} />
            <Feature FeatureDatos={CarSaleDatos.Sale.Features} newFeature={newFeature} setNewFeature={setNewFeature} />
            <UpImagine AudiovisualDatos={CarSaleDatos.Sale.Multimedia} />
            <Price PriceDatos={CarSaleDatos.Sale.Precio} handleSale={handleSale} handleEdit={handleEdit} />

            <div className="bg-black">
                <Navbar background={'dark:bg-[#12232E]'} />
                <Hero />

                <div ref={AutosRef} >
                    <Recomendado handleEdit={handleEdit} />
                </div>

                <div ref={ContactoRef}>
                    <Contacto />
                </div>


            </div>
        </>
    )
}

export default MainScreen