import React, { useState, useRef, useEffect } from "react"
import { useLocation } from "react-router-dom";
import Navbar from "../NavBar/NavBar"
import Hero from '../../Components/Hero/Hero'
import Recommended from "../../Components/Recommended/Recommended"
import Contact from '../../Components/Contact/Contact'
import { useContextCar } from "../../Context/Context"
import CarDetails from "../../Components/CarDetails/CarDetails"
import EngineDetails from "../../Components/EngineDetails/EngineDetails"
import Dimension from "../../Components/Dimension/Dimension"
import Feature from "../../Components/Feature/Feature"
import UpImagine from "../../Components/UpImagine/UpImagine"
import Price from "../../Components/Price/Price"
import { validateCarSaleDatos } from './Validations'
import notification from "../../Components/CarDetails/CarDetails"
import bien from "../../Components/Price/Price"
import validatePrecio from "../../Components/Price/Price"
import close from "../../assets/img/close.png"
import carsucess from "../../assets/img/carsucess.png"
import Toast from "../../Components/Toast/Toast"
const CarSaleDatos = {
    Sale: {
        IdCarSale: "",
        CarDetails: {
            Title: "",
            Condition: "",
            BodyType: "",
            brand: "",
            Model: "",
            Amount: 0,
            Year: "",
            Capacity: "",
            Color: "",
            Description: ""
        },
        MotorDetails: {
            FuelType: "",
            Mileage: "",
            Transmition: "",
            DriverTrain: "",
            EngineCapacity: "",
            Power: "",
        },
        Dimension: {
            Longitude: "",
            Width: "",
            Height: "",
            CargoVolume: ""
        },

        Features: {
            Features: [],
            Others: "No"
        },
        Price: {
            Price: 0
        },

        Multimedia: {
            Image: []
        },
    }
}

const MainScreen = () => {

    const { user, WhichRole, AutosVisible, setAutosVisible, AutosInVisible, setAutosInVisible,
        ContactVisible, setContactVisible, SaveCarSale, CarEdit, EditCarSale } = useContextCar()

    const AutosRef = useRef(null);
    const ContactoRef = useRef(null);
    const [notification, setNotification] = useState(false)
    const [good, setGood] = useState(false)
    const [erros, setErros] = useState(false)
    useEffect(() => {
        if (AutosVisible === true && AutosRef.current) {
            AutosRef.current.scrollIntoView({ behavior: 'smooth' });
            setAutosVisible(false)
        }
    }, [AutosVisible]);

    useEffect(() => {
        if (ContactVisible === true && ContactoRef.current) {
            ContactoRef.current.scrollIntoView({ behavior: 'smooth' });
            setContactVisible(false)
        }
    }, [ContactVisible]);


    const [newFeature, setNewFeature] = useState('');

    const updateCarDetails = (updatedDetails) => {
        CarSaleDatos.Sale.CarDetails = updatedDetails;
    }

    const updateEngineDetails = (updatedDetails) => {
        CarSaleDatos.Sale.MotorDetails = updatedDetails;
    }

    const updateDimension = (updatedDetails) => {
        CarSaleDatos.Sale.Dimension = updatedDetails
    }

    const handleSale = (e) => {
        e.preventDefault();
        if (validateCarSaleDatos(CarSaleDatos.Sale)) {
            try {
                console.log(CarSaleDatos)
                SaveCarSale(CarSaleDatos, user.uid);
                setGood(!bien)
            } catch (error) {
                console.error("Error al actualizar los datos:", error);
                setErros(!erros)
            }
        } else {
            setNotification(!notification)
        }
    };

    // const handleEdit = (e) => {

    //     e.preventDefault()
    //     if (validateCarSaleDatos(CarSaleDatos.Sale)) {
    //         alert("Guardado");
    //     } else {
    //         EditCarSale(CarSaleDatos, CarEdit.IdCarSale);
    //         alert('Por favor completa todos los campos.');
    //     }
    // }

    const handleEdit = async (e) => {
        e.preventDefault();

        if (validateCarSaleDatos(CarSaleDatos.Sale)) {
            try {
                await EditCarSale(CarEdit.IdCarSale, CarSaleDatos);
                alert("Guardado");
            } catch (error) {
                console.error("Error al actualizar los datos:", error);
                alert("Hubo un error al actualizar los datos.");
            }
        } else {
            alert('Por favor completa todos los campos.');
        }
    };



    useEffect(() => {
        if (CarEdit !== null) {
            CarSaleDatos.Sale.CarDetails = CarEdit.Sale.CarDetails
        }
    }, [CarEdit])

    const location = useLocation();
    const [toastOpen, setToastOpen] = useState(false);
    const [toastType, setToastType] = useState('success');
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        if (location.state?.showToast) {
            setToastType(location.state.toastType || 'success');
            setToastMessage(location.state.toastMessage || 'Operation successful!');
            setToastOpen(true);
        }
    }, [location.state]);



    return (
        <>
            <CarDetails updateCarDetails={updateCarDetails} />
            <EngineDetails updateEngineDetails={updateEngineDetails} />
            <Dimension updateDimension={updateDimension} />
            <Feature FeatureDatos={CarSaleDatos.Sale.Features} newFeature={newFeature} setNewFeature={setNewFeature} />
            <UpImagine AudiovisualDatos={CarSaleDatos.Sale.Multimedia} />
            <Price PriceDatos={CarSaleDatos.Sale.Price} handleSale={handleSale} handleEdit={handleEdit} />
            <Toast
                type={toastType}
                message={toastMessage}
                isOpen={toastOpen}
                onClose={() => setToastOpen(false)}
            />
            {notification ? (
                <div className="fixed  inset-0 flex items-center justify-center z-50  sm:mx-0 min-h-screen w-full text-white backdrop-blur-sm  ">

                    <div className="flex flex-col relative items-center px-20 py-8 text-3xl text-white rounded-2xl bg-orange-400 max-w-[671px] max-md:w-[85%] max-md:h-65  ">
                        <button className="absolute w-20 h-20 right-5 -top-10 rounded-full justify-center px-7 py-4 mt-16 text-xl text-white whitespace-nowrap transition-all  hover:bg-red-700 bg-opacity-60 max-md:px-5 max-md:mt-10" onClick={() => setNotification(false)}>
                            <img src={close} alt="" />
                        </button>
                        <img
                            loading="lazy"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Info_icon_002.svg/1024px-Info_icon_002.svg.png"
                            className="max-w-full aspect-square w-[80px]"
                        />
                        <div className="justify-center mt-8 text-xl max-md:text-lg">UPs!</div>
                        <div className=" mt-3 text-xl max-md:text-sm m justify-center ">
                            ¡Debe de Llenar Todos los Campos Por Favor!
                        </div>

                    </div>
                </div>
            ) : ""}

            {good ? (
                <div className="fixed  inset-0 flex items-center justify-center z-50  sm:mx-0 min-h-screen w-full text-white backdrop-blur-sm  ">

                    <div className="flex flex-col relative items-center px-20 py-8 text-3xl text-white rounded-2xl bg-green-400 max-w-[671px] max-md:w-[85%] max-md:h-65  ">
                        <button className="absolute w-20 h-20 right-5 -top-10 rounded-full justify-center px-7 py-4 mt-16 text-xl text-white whitespace-nowrap transition-all  hover:bg-red-700 bg-opacity-60 max-md:px-5 max-md:mt-10" onClick={() => setBien(false)}>
                            <img src={close} alt="" />
                        </button>
                        <img
                            loading="lazy"
                            src={carsucess}
                            className="max-w-full aspect-square w-[80px]"
                        />
                        <div className="justify-center mt-8 text-xl max-md:text-lg">¡¡¡Exito!!!!</div>
                        <div className=" mt-3 text-xl max-md:text-sm m justify-center ">
                            ¡Su Auto se ha Añadido Éxitosamente!
                        </div>

                    </div>
                </div>
            ) : ""}


            {erros ? (
                <div className="fixed  inset-0 flex items-center justify-center z-50  sm:mx-0 min-h-screen w-full text-white backdrop-blur-sm  ">

                    <div className="flex flex-col relative items-center px-20 py-8 text-3xl text-white rounded-2xl bg-red-400 max-w-[671px] max-md:w-[85%] max-md:h-65  ">
                        <button className="absolute w-20 h-20 right-5 -top-10 rounded-full justify-center px-7 py-4 mt-16 text-xl text-white whitespace-nowrap transition-all  hover:bg-green-700 bg-opacity-60 max-md:px-5 max-md:mt-10" onClick={() => setBien(false)}>
                            <img src={close} alt="" />
                        </button>
                        <img
                            loading="lazy"
                            src="https://th.bing.com/th/id/R.0f19a8e91142bad74846a88bd6c65a57?rik=vc6qcTmPlSf3bQ&pid=ImgRaw&r=0"
                            className="max-w-full aspect-square w-[80px]"
                        />
                        <div className="justify-center mt-8 text-xl max-md:text-lg">UPs!</div>
                        <div className=" mt-3 text-xl max-md:text-sm m justify-center ">
                            ¡Algo ha Salido Mal!
                        </div>

                    </div>
                </div>
            ) : ""}


            <div className="bg-black">
                <Navbar background={'dark:bg-[#12232E]'} />
                <Hero />

                <div  >
                    <Recommended refAutos={AutosRef}/>
                </div>

                <div ref={ContactoRef}>
                    <Contact  />
                </div>


            </div>
        </>
    )
}

export default MainScreen