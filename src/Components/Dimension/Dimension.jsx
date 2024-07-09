import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { useContextCar } from '../../Context/Context'

const Dimension = ({ updateDimension }) => {
    const { CarEdit, isOpenDimension, setisOpenDimension, handleSiguiente} = useContextCar()

    const [Longitud, setLongitud] = useState('')
    const [Ancho, setAncho] = useState('')
    const [Altura, setAltura] = useState('')
    const [VolumenCarga, setVolumenCarga] = useState('')

    const Dimensiondatos = useMemo(() => ({
        Longitud,
        Ancho,
        Altura,
        VolumenCarga,
    }), [Longitud, Ancho, Altura, VolumenCarga]);

    useEffect(() => {
        // updateDimension(Dimensiondatos)
    }, [Dimensiondatos]);


    useEffect(() => {
        if (CarEdit !== null) {
            // console.log("Datos para editar dimenciones")
            console.log(CarEdit)
            setLongitud(CarEdit.Sale.Dimension.Longitud)
            setAncho(CarEdit.Sale.Dimension.Ancho)
            setAltura(CarEdit.Sale.Dimension.Altura)
            setVolumenCarga(CarEdit.Sale.Dimension.VolumenCarga)

        }

    }, [CarEdit])

    const [open, setOpen] = useState(false)
    const Abre = () => {
        setOpen(!open)
    }

    const handleOpenDimension = () => {
        setisOpenDimension(!isOpenDimension)
    }

   
    return (
        <>
            {
                isOpenDimension &&
                <div className='fixed  inset-0  backdrop-blur-md z-50'>
                    <div className='bg-[#071620] rounded-lg  text-white mb-8 m-10'>
                        <div className='ml-8 mr-8  mt-8'>
                            <div className='text-left flex justify-between cursor-pointer items-center' >
                                <h3 className='  text-2xl mt-4'>Dimensión</h3>
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
                            <div className='mt-8 '>

                                <form className='max-w-full'>

                                    <div className=''>
                                        <div className="grid gap-6 mb-6 lg:grid-cols-4">
                                            <div className='mb-8'>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Longitud </label>
                                                <div className="flex">

                                                    <input value={Longitud} onChange={(e) => setLongitud(e.target.value)} type="text" className="bg-[#12232E] text-sm block w-full p-2.5 rounded-lg hover:bg-slate-500 transition-all" required />
                                                    <div type="button" className="bg-[#004A77] text-white   px-4 py-2 rounded-r  focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                        mm
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ancho</label>
                                                <div className="flex">

                                                    <input value={Ancho} onChange={(e) => setAncho(e.target.value)} type="text" className="bg-[#12232E] text-sm block w-full p-2.5 rounded-lg hover:bg-slate-500 transition-all" required />
                                                    <div type="button" className="bg-[#004A77] text-white   px-4 py-2 rounded-r  focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                        mm
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Altura</label>
                                                <div className="flex">

                                                    <input value={Altura} onChange={(e) => setAltura(e.target.value)} type="text" className="bg-[#12232E] text-sm block w-full p-2.5 rounded-lg hover:bg-slate-500 transition-all" required />
                                                    <div type="button" className="bg-[#004A77] text-white   px-4 py-2 rounded-r  focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                        mm
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Volumen de carga</label>
                                                <div className="flex">

                                                    <input value={VolumenCarga} onChange={(e) => setVolumenCarga(e.target.value)} type="text" className="bg-[#12232E] text-sm block w-full p-2.5 rounded-lg hover:bg-slate-500 transition-all" required />
                                                    <div type="button" className="bg-[#004A77] text-white   px-4 py-2 rounded-r  focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                        L
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>

                                    <div className='text-left flex justify-between  items-center ' >
                                        <button className='items-center ml-4 hover:bg-blue-600 p-2 hover:rounded-md mb-4'>Anterior</button>
                                        <button onClick={handleSiguiente} className='items-center mr-4 hover:bg-blue-600 p-2 hover:rounded-md mb-4'>Siguiente</button>
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

export default Dimension