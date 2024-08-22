import React, { useState, useEffect, useMemo } from 'react'
import { useContextCar } from '../../Context/Context'
import close from "../../assets/img/close.png"
import SelectL from '../Select/Select'
import { FaPlusCircle } from "react-icons/fa";
import ModalAdd from '../ModalAdd/ModalAdd';
import { GetItemsCarEngine } from '../../Functions/Sales/Sales';
const EngineDetails = ({ updateEngineDetails }) => {

    const { CarEdit, isOpenEngineDetails, setisOpenEngineDetails, handleNext, handleLast, handleRefresh } = useContextCar()

    const [FuelType, setFuelType] = useState('')
    const [Mileage, setMileage] = useState('')
    const [Transmition, setTransmition] = useState('')
    const [DriverTrain, setDriverTrain] = useState('')
    const [notification, setNotification] = useState(false)
    const [EngineCapacity, setEngineCapacity] = useState('')
    const [Power, setPower] = useState('')
    const [showWarning, setShowWarning] = useState(false)
    const [isOpenAdd, setisOpenAdd] = useState(false)
    const [Text, setText] = useState("")

    const EngineDetailsdatos = useMemo(() => ({
        FuelType: FuelType.label,
        Mileage,
        Transmition: FuelType.label,
        DriverTrain: DriverTrain.label,
        EngineCapacity,
        Power,
    }), [FuelType, Mileage, Transmition, DriverTrain, EngineCapacity, Power]);

    useEffect(() => {
        updateEngineDetails(EngineDetailsdatos)
    }, [EngineDetailsdatos]);

    useEffect(() => {
        if (CarEdit !== null) {
            setFuelType(CarEdit.Sale.MotorDetails.FuelType)
            setMileage(CarEdit.Sale.MotorDetails.Mileage)
            setTransmition(CarEdit.Sale.MotorDetails.Transmition)
            setDriverTrain(CarEdit.Sale.MotorDetails.DriverTrain)
            setEngineCapacity(CarEdit.Sale.MotorDetails.EngineCapacity)
            setPower(CarEdit.Sale.MotorDetails.Power)
        }
    }, [CarEdit])

    useEffect(() => {
        if (isOpenEngineDetails) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpenEngineDetails])

    const handleCloseEngineDetails = () => {
        setShowWarning(true)
    }

    const confirmClose = () => {
        setisOpenEngineDetails(false)
        setShowWarning(false)
        setFuelType('')
        setMileage('')
        setTransmition('')
        setDriverTrain('')
        setEngineCapacity('')
        setPower('')
        handleRefresh()
    }

    const cancelClose = () => {
        setShowWarning(false)
    }

    const validateEngineDetails = () => {
        if (!FuelType || !Mileage || !Transmition || !DriverTrain || !EngineCapacity || !Power) {
            setNotification(!notification)
        } else {
            return true;
        }
    };

    const [optionTypeFuel, setoptionTypeFuel] = useState([])
    const [optionTransmission, setoptionTransmission] = useState([])
    const [optionTraction, setoptionTraction] = useState([])
    const [Category, setCategory] = useState('')
    const [UpdateList, setUpdateList] = useState(false)


    const Onclose = () => {
        setisOpenAdd(!isOpenAdd);
    };

    const OpenModal = (text, category) => {
        setisOpenAdd(true)
        setText(text)
        setCategory(category)
    }

    useEffect(() => {
        GetItemsCarEngine(setoptionTypeFuel, setoptionTransmission, setoptionTraction)
    }, [])

    useEffect(() => {
        if (UpdateList === true) {
            GetItemsCarEngine(setoptionTypeFuel, setoptionTransmission, setoptionTraction)
            setUpdateList(false)
        }

    }, [UpdateList])

    console.log("Datos de Opciones")
    console.log(EngineDetailsdatos)

    return (
        <>
            {isOpenEngineDetails &&
                <div className='fixed inset-0 backdrop-blur-md z-50'>
                      <ModalAdd isOpen={isOpenAdd} onClose={Onclose} Text={Text} Category={Category} updateList={setUpdateList}/>
                    <div className='bg-[#071620] m-10 rounded-lg w-auto h-[65%] mt-[6rem] text-white mb-8 overflow-y-auto max-h-screen md:max-h-none'>
                        <div className='ml-8 mr-8 mb-12 mt-8'>
                            <div className='text-left flex justify-between items-center cursor-pointer'>
                                <h3 className='text-2xl mt-4'>Detalles del motor</h3>
                                <div className='mt-4'>
                                    <button
                                        onClick={handleCloseEngineDetails}
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
                                    <div className='mb-4'>
                                        <div className="grid gap-6 mb-6 lg:grid-cols-3">
                                            <div>
                                                <div className='flex flex-row items-center'>
                                                    <label htmlFor="Typeofload" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                        Tipos de combustible
                                                    </label>
                                                    <button onClick={() => OpenModal("Tipos de combustible", "optionTypeFuel")}>
                                                        <FaPlusCircle size={20} className='ml-2' />
                                                    </button>
                                                </div>

                                                <SelectL
                                                    value={FuelType}
                                                    onChange={setFuelType}
                                                    options={optionTypeFuel}
                                                    isClearable
                                                    placeholder="Selecciona"
                                                />

                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kilometraje</label>
                                                <div className="flex">
                                                    <input value={Mileage} onChange={(e) => setMileage(e.target.value)} type="number" id="title" className="bg-[#12232E] rounded-lg text-sm block w-full p-2.5" required />
                                                    <div type="button" className="bg-[#004A77] text-white px-4 py-2 rounded-r focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                        km
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='flex flex-row items-center'>
                                                    <label htmlFor="Transmisión" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                        Transmisión
                                                    </label>
                                                    <button onClick={() => OpenModal("Transmisión", "optionTransmission")}>
                                                        <FaPlusCircle size={20} className='ml-2' />
                                                    </button>
                                                </div>

                                                <SelectL
                                                    value={Transmition}
                                                    onChange={setTransmition}
                                                    options={optionTransmission}
                                                    isClearable
                                                    placeholder="Selecciona"
                                                />

                                            </div>

                                            <div className='mb-8 '>
                                                <div className='flex flex-row items-center'>
                                                    <label htmlFor="Tracción" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                        Tipo de Tracción
                                                    </label>
                                                    <button onClick={() => OpenModal("Tipo de Tracción", "optionTraction")}>
                                                        <FaPlusCircle size={20} className='ml-2' />
                                                    </button>
                                                </div>

                                                <SelectL
                                                    value={DriverTrain}
                                                    onChange={setDriverTrain}
                                                    options={optionTraction}
                                                    isClearable
                                                    placeholder="Selecciona"
                                                />

                                            </div>

                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Capacidad del motor</label>
                                                <div className="flex">
                                                    <input value={EngineCapacity} onChange={(e) => setEngineCapacity(e.target.value)} type="number" id="title" className="bg-[#12232E] text-sm block w-full p-2.5 rounded-lg hover:bg-slate-500 transition-all" required />
                                                    <div type="button" className="bg-[#004A77] text-white px-4 py-2 rounded-r focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                        cc
                                                    </div>
                                                </div>
                                            </div>

                                            <div >
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Power</label>
                                                <div className="flex">
                                                    <input value={Power} onChange={(e) => setPower(e.target.value)} type="number" id="title" className="bg-[#12232E] text-sm block w-full p-2.5 rounded-lg hover:bg-slate-500 transition-all" required />
                                                    <div type="button" className="bg-[#004A77] text-white px-4 py-2 rounded-r focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                        hp
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                    <div className='text-left flex justify-between items-center'>
                                        <button onClick={handleLast} className='items-center ml-4 hover:bg-blue-600 p-2 hover:rounded-md mb-4'>Anterior</button>
                                        <button onClick={() => handleNext(validateEngineDetails)} className='items-center mr-4 hover:bg-blue-600 p-2 hover:rounded-md'>Siguiente</button>
                                    </div>

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

export default EngineDetails
