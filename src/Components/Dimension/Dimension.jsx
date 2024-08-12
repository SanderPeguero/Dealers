import React, { useState, useEffect, useMemo } from 'react'
import { useContextCar } from '../../Context/Context'
import close from "../../assets/img/close.png"

const Dimension = ({ updateDimension }) => {
    const { CarEdit, isOpenDimension, setisOpenDimension, handleNext, handleLast} = useContextCar()

    const [Longitude, setLongitude] = useState('')
    const [Width, setWidth] = useState('')
    const [Height, setHeight] = useState('')
    const [CargoVolume, setCargoVolume] = useState('')
    const [notification, setNotification] = useState(false)
    const [showWarning, setShowWarning] = useState(false)

    const Dimensiondatos = useMemo(() => ({
        Longitude,
        Width,
        Height,
        CargoVolume,
    }), [Longitude, Width, Height, CargoVolume]);

    useEffect(() => {
        updateDimension(Dimensiondatos)
    }, [Dimensiondatos]);

    useEffect(() => {
        if (CarEdit !== null) {
            setLongitude(CarEdit.Sale.Dimension.Longitude)
            setWidth(CarEdit.Sale.Dimension.Width)
            setHeight(CarEdit.Sale.Dimension.Height)
            setCargoVolume(CarEdit.Sale.Dimension.CargoVolume)
        }
    }, [CarEdit])

    useEffect(() => {
        if (isOpenDimension) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpenDimension])

    const handleOpenDimension = () => {
        setShowWarning(true)
    }

    const confirmClose = () => {
        setisOpenDimension(false)
        setShowWarning(false)
        // Limpiar los estados
        setLongitude('')
        setWidth('')
        setHeight('')
        setCargoVolume('')
    }

    const cancelClose = () => {
        setShowWarning(false)
    }

    const validateDimension = () => {
        if (!Longitude || !Width || !Height || !CargoVolume) {
            setNotification(!notification)
        } else {
            return true;
        }
    };

    return (
        <>
            {isOpenDimension &&
                <div className='fixed inset-0 backdrop-blur-md z-50'>
                    <div className='bg-[#071620] rounded-lg text-white mb-8 m-10'>
                        <div className='ml-8 mr-8 mt-8'>
                            <div className='text-left flex justify-between cursor-pointer items-center'>
                                <h3 className='text-2xl mt-4'>Dimensión</h3>
                                <button
                                    onClick={handleOpenDimension}
                                    className='mt-4 text-gray-500 hover:text-white hover:bg-red-600 hover:rounded-full p-2 focus:outline-none'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                            <div className='mt-8'>
                                <form className='max-w-full'>
                                    <div className=''>
                                        <div className="grid gap-6 mb-6 lg:grid-cols-4">
                                            <div className='mb-8'>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Longitud </label>
                                                <div className="flex">
                                                    <input value={Longitude} onChange={(e) => setLongitude(e.target.value)} type="number" className="bg-[#12232E] text-sm block w-full p-2.5 rounded-lg hover:bg-slate-500 transition-all" required />
                                                    <div type="button" className="bg-[#004A77] text-white px-4 py-2 rounded-r focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                        mm
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ancho</label>
                                                <div className="flex">
                                                    <input value={Width} onChange={(e) => setWidth(e.target.value)} type="number" className="bg-[#12232E] text-sm block w-full p-2.5 rounded-lg hover:bg-slate-500 transition-all" required />
                                                    <div type="button" className="bg-[#004A77] text-white px-4 py-2 rounded-r focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                        mm
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Altura</label>
                                                <div className="flex">
                                                    <input value={Height} onChange={(e) => setHeight(e.target.value)} type="number" className="bg-[#12232E] text-sm block w-full p-2.5 rounded-lg hover:bg-slate-500 transition-all" required />
                                                    <div type="button" className="bg-[#004A77] text-white px-4 py-2 rounded-r focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                        mm
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Volumen de carga</label>
                                                <div className="flex">
                                                    <input value={CargoVolume} onChange={(e) => setCargoVolume(e.target.value)} type="number" className="bg-[#12232E] text-sm block w-full p-2.5 rounded-lg hover:bg-slate-500 transition-all" required />
                                                    <div type="button" className="bg-[#004A77] text-white px-4 py-2 rounded-r focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                        L
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-left flex justify-between items-center'>
                                        <button onClick={handleLast} className='items-center ml-4 hover:bg-blue-600 p-2 hover:rounded-md mb-4'>Anterior</button>
                                        <button onClick={() => handleNext(validateDimension)} className='items-center mr-4 hover:bg-blue-600 p-2 hover:rounded-md'>Siguiente</button>
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

export default Dimension
