import React from 'react'
import { useState, useEffect, useMemo } from 'react'

const Dimension = ({ updateDimension }) => {
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
        updateDimension(Dimensiondatos)
    }, [Dimensiondatos]);
    
    const [open, setOpen]=useState(false)
    const Abre=()=>{
        setOpen(!open)
    }
    return (
            <div className='bg-[#071620] rounded-lg  text-white mb-8 m-10'>
                <div className='ml-8 mr-8  mt-8'>
                    <div className='text-left flex justify-between cursor-pointer items-center' onClick={Abre}>
                        <h3 className='  text-2xl'>Dimensión</h3>
                       
                    </div>
                    <div className='mt-8 '>
                       
                        <form className='max-w-full'>

                            <div className=''>
                                <div className="grid gap-6 mb-6 lg:grid-cols-4">
                                    <div className='mb-8'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Longitud </label>
                                        <div className="flex">

                                            <input onChange={(e) => setLongitud(e.target.value)}  type="text"  className="bg-[#12232E] text-sm block w-full p-2.5 rounded-lg hover:bg-slate-500 transition-all" required />
                                            <div type="button" className="bg-[#004A77] text-white   px-4 py-2 rounded-r  focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                mm
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ancho</label>
                                        <div className="flex">

                                            <input  onChange={(e) => setAncho(e.target.value)} type="text"  className="bg-[#12232E] text-sm block w-full p-2.5 rounded-lg hover:bg-slate-500 transition-all" required />
                                            <div type="button" className="bg-[#004A77] text-white   px-4 py-2 rounded-r  focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                mm
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Altura</label>
                                        <div className="flex">

                                            <input onChange={(e) => setAltura(e.target.value)} type="text"  className="bg-[#12232E] text-sm block w-full p-2.5 rounded-lg hover:bg-slate-500 transition-all" required />
                                            <div type="button" className="bg-[#004A77] text-white   px-4 py-2 rounded-r  focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                mm
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Volumen de carga</label>
                                        <div className="flex">

                                            <input onChange={(e) => setVolumenCarga(e.target.value)} type="text"  className="bg-[#12232E] text-sm block w-full p-2.5 rounded-lg hover:bg-slate-500 transition-all" required />
                                            <div type="button" className="bg-[#004A77] text-white   px-4 py-2 rounded-r  focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                L
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>

                        </form>
                  
                    </div>
                </div>
            </div>
       
    )
}

export default Dimension