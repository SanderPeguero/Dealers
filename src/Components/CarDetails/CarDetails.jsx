import React, { useState, useEffect, useMemo } from 'react'
import { useContextCar } from '../../Context/Context'
import close from "../../assets/img/close.png"

const CarDetails = ({ updateCarDetails }) => {
    const { CarEdit, isOpenCardDetails, setisOpenCardDetails, handleSiguiente,handleRefresh  } = useContextCar()
    const [Titulo, setTitulo] = useState('')
    const [Condicion, setCondicion] = useState('')
    const [TipoCuerpo, setTipoCuerpo] = useState('')
    const [Marca, setMarca] = useState('')
    const [Modelo, setModelo] = useState('')
    const [Año, setAño] = useState('')

    const [Color, setColor] = useState('')
    const [Descripcion, setDescripcion] = useState('')

    const [capacity, setCapacity] = useState(1);
    const [open, setOpen] = useState(false)
    const [notification, setNotification] = useState(false)

    const decreaseCapacity = () => {
        if (capacity > 1) {
            setCapacity(capacity - 1);
        }
    }

    const increaseCapacity = () => {
        setCapacity(capacity + 1);
    }


    const CarDetailsdatos = useMemo(() => ({
        Titulo,
        Condicion,
        TipoCuerpo,
        Marca,
        Modelo,
        Year: Año,
        Capacidad: capacity,
        Color,
        Descripcion
    }), [Titulo, Condicion, TipoCuerpo, Marca, Modelo, Año, capacity, Color, Descripcion]);

    useEffect(() => {
        updateCarDetails(CarDetailsdatos)
    }, [CarDetailsdatos]);

    useEffect(() => {
        if (CarEdit !== null) {
            setTitulo(CarEdit.Sale.DetalleCoche.Titulo)
            setCondicion(CarEdit.Sale.DetalleCoche.Condicion)
            setTipoCuerpo(CarEdit.Sale.DetalleCoche.TipoCuerpo)
            setMarca(CarEdit.Sale.DetalleCoche.Marca)
            setModelo(CarEdit.Sale.DetalleCoche.Modelo)
            setAño(CarEdit.Sale.DetalleCoche.Year)
            setColor(CarEdit.Sale.DetalleCoche.Color)
            setDescripcion(CarEdit.Sale.DetalleCoche.Descripcion)

        }

    }, [CarEdit])


    useEffect(() => {
        if (isOpenCardDetails) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpenCardDetails])



    const handleCloseCardDetails = () => {
        // Reinicia los estados
        setTitulo('')
        setCondicion('')
        setTipoCuerpo('')
        setMarca('')
        setModelo('')
        setAño('')
        setColor('')
        setDescripcion('')
        setCapacity(1)
        setisOpenCardDetails(false)
        handleRefresh ()
    }

    const validateCardDetails = () => {
        if (!Titulo || !Condicion || !TipoCuerpo || !Marca || !Modelo || !Año || !Color || !Descripcion) {
            setNotification(!notification)

        }
        else { return true; }

    };

    return (
        <>
            {
                isOpenCardDetails &&

                <div className='fixed inset-0 backdrop-blur-md z-50'>
                    <div className='bg-[#071620] m-10 rounded-lg w-auto h-[80%] mt-[6rem] text-white mb-8 overflow-y-auto max-h-screen md:max-h-none'>
                        <div className='ml-8 mr-8 mb-12 mt-8'>
                            <div className='text-left flex justify-between cursor-pointer items-center'>
                                <h3 className='items-center text-2xl mt-4'>Detalles del coche</h3>
                                <div className='mt-4'>
                                    <button
                                        onClick={handleCloseCardDetails}
                                        className='text-gray-500 hover:text-white hover:bg-red-600 hover:rounded-full p-2 focus:outline-none'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className='mt-8'>
                                <form className='max-w-full'>
                                    <div className='mb-4 grid gap-6 lg:grid-cols-2 w-full'>
                                        <div>
                                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Título</label>
                                            <input value={Titulo} onChange={(e) => setTitulo(e.target.value)}
                                                type="text" id="titulo" className="bg-[#12232E] text-sm rounded-lg hover:bg-slate-500 transition-all block w-full p-2.5" required />
                                        </div>
                                        <div>
                                            <label htmlFor="condicion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Condición </label>
                                            <div className='flex flex-row p-2.5 '>
                                                <div className='flex flex-row items-center'>
                                                    <input checked={Condicion === 'Nuevo'} onChange={(e) => setCondicion(e.target.value)} value="Nuevo" type='radio' name='condicion' id='nuevo' className='h-5 w-5 bg-[#071620] rounded-full border border-blue-gray-200 relative border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required />
                                                    <label htmlFor='nuevo' className='mr-2 ml-2'>Nuevo</label>
                                                </div>
                                                <div className='ml-8 flex flex-row items-center'>
                                                    <input checked={Condicion === 'Usado'} onChange={(e) => setCondicion(e.target.value)} value="Usado" type='radio' name='condicion' id='usado' className='h-5 w-5 bg-[#071620] rounded-full border border-blue-gray-200 relative border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required />
                                                    <label htmlFor='usado' className='mr-2 ml-2'>Usado</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mb-4'>
                                        <div className="grid gap-6 mb-6 lg:grid-cols-3">
                                            <div>
                                                <label htmlFor="Typeofload" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tipo de cuerpo</label>
                                                <select value={TipoCuerpo} onChange={(e) => setTipoCuerpo(e.target.value)} id="Typeofload" className="bg-[#12232E] text-sm block w-full p-2.5 rounded-lg cursor-pointer hover:bg-slate-500 transition-all" required>
                                                    <option value="">Selecciona</option>
                                                    <option value="sedan">Sedán</option>
                                                    <option value="coupe">Coupé</option>
                                                    <option value="suv">SUV</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="Brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Marca</label>
                                                <select value={Marca} onChange={(e) => setMarca(e.target.value)} id="Brand" className="bg-[#12232E] text-sm block w-full p-2.5 rounded-lg cursor-pointer hover:bg-slate-500 transition-all" required>
                                                    <option value="">Selecciona</option>
                                                    <option value="toyota">Toyota</option>
                                                    <option value="honda">Honda</option>
                                                    <option value="ford">Ford</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="Model" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Modelo</label>
                                                <select value={Modelo} onChange={(e) => setModelo(e.target.value)} id="Model" className="bg-[#12232E] text-sm block w-full p-2.5 rounded-lg cursor-pointer hover:bg-slate-500 transition-all" required>
                                                    <option value="">Selecciona</option>
                                                    <option value="corolla">Corolla</option>
                                                    <option value="civic">Civic</option>
                                                    <option value="mustang">Mustang</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mb-4'>
                                        <div className="grid gap-6 mb-6 lg:grid-cols-3">
                                            <div>
                                                <label htmlFor="Year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Año</label>
                                                <select value={Año} onChange={(e) => setAño(e.target.value)} id="Year" className="bg-[#12232E] text-sm block w-full p-2.5 rounded-lg cursor-pointer hover:bg-slate-500 transition-all" required>
                                                    <option value="">Seleccionar</option>
                                                    <option value="2022">2022</option>
                                                    <option value="2021">2021</option>
                                                    <option value="2020">2020</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Capacidad de pasajeros</label>
                                                <div className="flex">
                                                    <button type="button" onClick={decreaseCapacity} className="bg-[#004A77] text-white hover:text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-l border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                        -
                                                    </button>
                                                    <input
                                                        type="text"
                                                        value={capacity}
                                                        onChange={(e) => setCapacity(parseInt(e.target.value))}
                                                        min={1}
                                                        max={100}
                                                        className="bg-[#12232E] text-sm text-center block w-full p-2.5"
                                                        required
                                                    />
                                                    <button type="button" onClick={increaseCapacity} className="bg-[#004A77] text-white hover:text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-r border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="ExteriorColor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Color exterior</label>
                                                <select value={Color} onChange={(e) => setColor(e.target.value)} id="ExteriorColor" className="bg-[#12232E] text-sm block w-full p-2.5 rounded-lg cursor-pointer hover:bg-slate-500 transition-all" required>
                                                    <option value="">Seleccionar</option>
                                                    <option value="Blanco">Blanco</option>
                                                    <option value="Negro">Negro</option>
                                                    <option value="Gris">Gris</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor="Description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Descripción </label>
                                        <textarea value={Descripcion} onChange={(e) => setDescripcion(e.target.value)} type="text" id="Description" className="bg-[#12232E] rounded-lg cursor-pointer text-sm block w-full p-8" placeholder='Descripción del vehiculo...' required />
                                    </div>
                                    <div className='text-left flex justify-end items-center'>
                                        <button
                                            onClick={() => handleSiguiente(validateCardDetails)}
                                            className='items-center mr-4 hover:bg-blue-600 p-2 hover:rounded-md'>Siguiente</button>
                                        {notification ? (
                                            <div className="fixed inset-0 flex items-center justify-center z-50 sm:mx-0 min-h-screen w-full text-white backdrop-blur-sm">
                                                <div className="flex flex-col relative items-center px-20 py-8 text-3xl text-white rounded-2xl bg-orange-400 max-w-[671px] max-md:w-[85%] max-md:h-65">
                                                    <button className="absolute w-20 h-20 right-5 -top-10 rounded-full justify-center px-7 py-4 mt-16 text-xl text-white whitespace-nowrap transition-all hover:bg-red-700 bg-opacity-60 max-md:px-5 max-md:mt-10" onClick={() => setNotification(false)}>
                                                        <img src={close} alt="" />
                                                    </button>
                                                    <img
                                                        loading="lazy"
                                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Info_icon_002.svg/1024px-Info_icon_002.svg.png"
                                                        className="max-w-full aspect-square w-[80px]"
                                                    />
                                                    <div className="justify-center mt-8 text-xl max-md:text-lg">UPs!</div>
                                                    <div className="mt-3 text-xl max-md:text-sm m justify-center">
                                                        ¡Debe de Llenar Todos los Campos Por Favor!
                                                    </div>
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

        </>
    )

}

export default CarDetails