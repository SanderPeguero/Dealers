import React, {useState, useEffect} from 'react'

const Price = ({PriceDatos}) => {
    const [price, setPrice] = useState(0)

    useEffect(() => {
        if (price !== 0) {
            PriceDatos.Precio = price;
        }
    }, [price]);
    
    
    return (
        <div  className='bg-[#071620] rounded-lg  text-white mt-4 m-10'>
            <div className='ml-8 mr-8  mt-8'>
                <div className='text-left flex items-center cursor-pointer justify-between ' >
                    <h3 className=' text-2xl'>Precio</h3>
                  
                </div>
                <div className='mt-8 '>
                    
                    <form className='max-w-full'>

                        <div className=''>
                            <div className="grid gap-6 mb-6 lg:grid-cols-1">
                                <div className='mb-8'>
                                    {/* <label className="block mb-2 text-2xl font-medium text-gray-900 dark:text-gray-300 ">Precio </label> */}
                                    <div className="flex">
                                        <div  className="bg-[#004A77] justify-center text-2xl text-white  px-4 py-2 rounded-l  focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                            $
                                        </div>
                                        <input onChange={(e) => setPrice(e.target.value)}  className="bg-[#12232E] text-sm block w-full p-4 rounded-l  " required />

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

export default Price