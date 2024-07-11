import React from 'react'
import CheckBox from '../Checkbox/CheckBox'
import { useState, useEffect } from 'react'
import { useContextCar } from '../../Context/Context'

const Feature = ({ FeatureDatos, newFeature, setNewFeature }) => {
    const { CarEdit, isOpenFeature, setisOpenFeature, handleSiguiente, handleAnterior } = useContextCar()
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [OtroFeature, setOtroFeature] = useState('')



    const handleCheckboxChange = (feature) => {

        setSelectedFeatures((prevSelectedFeatures) => {
            if (prevSelectedFeatures.includes(feature)) {
                if (feature === "Otro") {
                    setOtroFeature(null);
                }
                return prevSelectedFeatures.filter((item) => item !== feature);
            } else {
                if (feature === "Otro") {
                    setOtroFeature(feature);


                }
                return [...prevSelectedFeatures, feature];
            }
        });
    };

    // useEffect(() => {
    //     FeatureDatos.Features = selectedFeatures
    //     if (newFeature !== "") {
    //         FeatureDatos.Otros = newFeature
    //     }

    // }, [selectedFeatures, FeatureDatos, newFeature])

    useEffect(() => {
        if (CarEdit !== null) {
            // console.log("Datos para editar dimenciones")
            // console.log(CarEdit)
            setSelectedFeatures(CarEdit.Sale.Features.Features)
            setOtroFeature(CarEdit.Sale.Features.newFeature)
        }

    }, [CarEdit])

    const [open, setOpen] = useState(false)
    const Abre = () => {
        setOpen(!open)
    }

    const handleCloseFeature = () => {
        setisOpenFeature(!isOpenFeature)
    }

    useEffect(() => {
        if (isOpenFeature) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpenFeature])

    const validateFeature = () => {
        if (!setSelectedFeatures) {
            return false;
        }
        return true;

    };

    return (
        <>
            {
                isOpenFeature &&

                <div className='fixed  inset-0  backdrop-blur-md z-50'>
                    <div className='bg-[#071620] rounded-lg  text-white  m-10'>
                        <div className='ml-8 mr-8 mb-12 mt-8'>
                            <div className='text-left flex justify-between items-center cursor-pointer' onClick={Abre}>
                                <h3 className='  text-2xl mt-4'>Features</h3>
                                <div className='mt-4'>
                                    <button
                                        onClick={handleCloseFeature}
                                        className='text-gray-500 hover:text-white hover:bg-red-600 hover:rounded-full p-2 focus:outline-none'
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                </div>
                                {/* <img className= {`w-6 h-6 ${open ? "rotate-180" : ""}`} src={flechatop} alt="Ver" /> */}
                            </div>
                            <div className='mt-8 '>

                                <form className='max-w-full'>
                                    <div className='mb-8 grid gap-6 lg:grid-cols-4 w-full'>
                                        {['Dirección asistida', 'Asientos con calefacción', 'Sensor de estacionamiento trasero', 'USB Port', 'AC', 'Wifi', 'Barra de techo', 'Sistema de sonido', 'Alarma', 'Control de crucero', 'Ventanas eléctricas', 'Asiento con memoria', 'Bluetooth', 'Sensor de estacionamiento delantero', 'Techo corredizo', 'Otro'].map((feature) => (
                                            <CheckBox
                                                value={feature}
                                                key={feature}
                                                text={feature}
                                                isChecked={selectedFeatures.includes(feature)}
                                                onCheckboxChange={() => handleCheckboxChange(feature)}
                                            />
                                        ))}
                                    </div>

                                    <div className='mb-4'>
                                        <p className='mb-2 text-gray-400 ml-2'>Indique aquí si seleccionó la opción "Otro".</p>
                                        <textarea
                                            value={newFeature}
                                            onChange={(e) => setNewFeature(e.target.value)}
                                            className="bg-[#12232E] text-sm block w-full p-8"
                                            placeholder='Escribe otra característica aquí.'
                                            required
                                            disabled={OtroFeature !== "Otro"}
                                        />
                                    </div>

                                    <div className='text-left flex justify-between  items-center ' >
                                        <button onClick={handleAnterior} className='items-center ml-4 hover:bg-blue-600 p-2 hover:rounded-md mb-4'>Anterior</button>

                                        <button onClick={() => handleSiguiente(validateFeature)}
                                            className='items-center mr-4 hover:bg-blue-600 p-2 hover:rounded-md'>Siguiente</button>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            }
        </>


    );
};

export default Feature;
