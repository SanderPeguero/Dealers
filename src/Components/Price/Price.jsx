import React, { useState, useEffect } from 'react'
import { useContextCar } from '../../Context/Context'

const Price = ({ PriceDatos }) => {
    const { CarEdit, isOpenPrice, setisOpenPrice } = useContextCar()

    const [price, setPrice] = useState(0)

    useEffect(() => {
        if (price !== 0) {
            PriceDatos.Precio = price;
        }
    }, [price]);

    useEffect(() => {
        if (CarEdit !== null) {
            // console.log("Datos para editar dimenciones")
            console.log(CarEdit)
            setPrice(CarEdit.Sale.Precio.Precio)


        }

    }, [CarEdit])

    useEffect(() => {
        if (isOpenPrice) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpenPrice])

    const handleClosePrice = () => {
        setisOpenPrice(false)
    }


    return (

        <>
            {
             isOpenPrice &&    
                <div className='bg-[#071620] rounded-lg  text-white mt-4 m-10'>
                    <div className='ml-8 mr-8  mt-8'>
                        <div className='text-left flex items-center cursor-pointer justify-between ' >
                            <h3 className=' text-2xl'>Precio</h3>

                            <div className='mt-4'>
                                    <button
                                        onClick={handleClosePrice}
                                        className='text-gray-500 hover:text-white hover:bg-red-600 hover:rounded-full p-2 focus:outline-none'
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                </div>

                        </div>
                        <div className='mt-8 '>

                            <form className='max-w-full'>

                                <div className=''>
                                    <div className="grid gap-6 mb-6 lg:grid-cols-1">
                                        <div className='mb-8'>
                                            {/* <label className="block mb-2 text-2xl font-medium text-gray-900 dark:text-gray-300 ">Precio </label> */}
                                            <div className="flex">
                                                <div className="bg-[#004A77] justify-center text-2xl text-white  px-4 py-2 rounded-l  focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                    $
                                                </div>
                                                <input value={price} onChange={(e) => setPrice(e.target.value)} className="bg-[#12232E] text-sm block w-full p-4 rounded-l  " required />

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Price