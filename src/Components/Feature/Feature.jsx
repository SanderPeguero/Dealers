import React from 'react'
import CheckBox from '../Checkbox/CheckBox'
import { useState, useEffect } from 'react'
import { useContextCar } from '../../Context/Context'
import close from "../../assets/img/close.png"

const Feature = ({ FeatureDatos, newFeature, setNewFeature }) => {
    const { CarEdit, isOpenFeature, setisOpenFeature, handleSiguiente, handleAnterior,handleRefresh } = useContextCar()
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [OtroFeature, setOtroFeature] = useState('')
    const [notification, setNotification] = useState(false)
    const [showWarning, setShowWarning] = useState(false)

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

    useEffect(() => {
        FeatureDatos.Features = selectedFeatures
        if (newFeature !== "") {
            FeatureDatos.Otros = newFeature
        }
    }, [selectedFeatures, FeatureDatos, newFeature])

    useEffect(() => {
        if (CarEdit !== null) {
            setSelectedFeatures(CarEdit.Sale.Features.Features)
            setOtroFeature(CarEdit.Sale.Features.newFeature)
        }
    }, [CarEdit])

    const [open, setOpen] = useState(false)
    const Abre = () => {
        setOpen(!open)
    }

    const handleCloseFeature = () => {
        setShowWarning(true)
    }

    const confirmClose = () => {
        setisOpenFeature(false)
        setShowWarning(false)
        // Limpiar los estados
        setSelectedFeatures([])
        setOtroFeature('')
        setNewFeature('')
        handleRefresh()
    }

    const cancelClose = () => {
        setShowWarning(false)
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
        if (!selectedFeatures.length) {
            setNotification(!notification)
        } else {
            return true;
        }
    };

    return (
        <>
            {isOpenFeature &&
                <div className='fixed inset-0 backdrop-blur-md z-50'>
                <div className='bg-[#071620] m-10 rounded-lg w-auto h-[80%] mt-[6rem] text-white mb-8 overflow-y-auto max-h-screen md:max-h-none'>
                    <div className='ml-8 mr-8 mb-12 mt-8'>
                        <div className='text-left flex justify-between items-center cursor-pointer' onClick={Abre}>
                            <h3 className='text-2xl mt-4'>Features</h3>
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
                        </div>
                        <div className='mt-8'>
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
            
                                <div className='text-left flex justify-between items-center'>
                                    <button onClick={handleAnterior} className='items-center ml-4 hover:bg-blue-600 p-2 hover:rounded-md mb-4'>Anterior</button>
                                    <button onClick={() => handleSiguiente(validateFeature)} className='items-center mr-4 hover:bg-blue-600 p-2 hover:rounded-md'>Siguiente</button>
                                    {notification ? (
                                        <div className="fixed inset-0 flex items-center justify-center z-50 sm:mx-0 min-h-screen w-full text-white backdrop-blur-sm">
                                            <div className="flex flex-col relative items-center px-20 py-8 text-3xl text-white rounded-2xl bg-orange-400 max-w-[671px] max-md:w-[85%] max-md:h-65">
                                                <button className="absolute w-20 h-20 right-5 -top-10 rounded-full justify-center px-7 py-4 mt-16 text-xl text-white whitespace-nowrap transition-all hover:bg-red-700 bg-opacity-60 max-md:px-5 max-md:mt-10" onClick={() => setNotification(false)}>
                                                    <img src={close} alt="" />
                                                </button>
                                                <img loading="lazy" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Info_icon_002.svg/1024px-Info_icon_002.svg.png" className="max-w-full aspect-square w-[80px]" />
                                                <div className="justify-center mt-8 text-xl max-md:text-lg">UPs!</div>
                                                <div className="mt-3 text-xl max-md:text-sm m justify-center">¡Debe de Llenar Todos los Campos Por Favor!</div>
                                            </div>
                                        </div>
                                    ) : ""}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            }

            {showWarning && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-lg font-semibold mb-4">¿Estás seguro de querer salir?</h2>
                        <p className="mb-6">Se perderán todos los datos no guardados.</p>
                        <div className="flex justify-end">
                            <button onClick={cancelClose} className="mr-4 px-4 py-2 bg-gray-200 rounded">Cancelar</button>
                            <button onClick={confirmClose} className="px-4 py-2 bg-red-600 text-white rounded">Salir</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Feature
