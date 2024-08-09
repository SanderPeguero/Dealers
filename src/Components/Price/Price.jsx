import React, { useState, useEffect } from 'react';
import { useContextCar } from '../../Context/Context';

const Price = ({ PriceDatos, handleSale, handleEdit }) => {
    const { CarEdit, isOpenPrice, setisOpenPrice, handleAnterior, SaveCarSale, user,handleRefresh } = useContextCar();
    const [price, setPrice] = useState(0);
    const [notification, setNotification] = useState(false);

    useEffect(() => {
        if (price > 0) {
            PriceDatos.Precio = price;
        }
    }, [price]);

    useEffect(() => {
        document.body.style.overflow = isOpenPrice ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpenPrice]);

    const handleClosePrice = () => {
        setisOpenPrice(false);
        handleRefresh()
    };

    const validatePrecio = () => {
        if (price === 0) {
            setNotification(true);
            return false;
        }
        return true;
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (validatePrecio()) {
            if (CarEdit) {
                handleEdit(e); // Editar auto
            } else {
                handleSale(e); // Vender mi auto
            }
            setPrice(0); // Limpiar el campo de precio
            handleClosePrice(); // Cerrar el modal
            handleRefresh()
        }
    };

    return (
        <>
            {isOpenPrice && (
                <div className='fixed inset-0 backdrop-blur-md z-50'>
                    <div className='bg-[#071620] rounded-lg text-white mt-4 m-10'>
                        <div className='ml-8 mr-8 mt-8'>
                            <div className='text-left flex items-center cursor-pointer justify-between'>
                                <h3 className='text-2xl'>Precio</h3>
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

                            <div className='mt-8'>
                                <form className='max-w-full' onSubmit={handleSave}>
                                    <div className=''>
                                        <div className="grid gap-6 mb-6 lg:grid-cols-1">
                                            <div className='mb-8'>
                                                <div className="flex">
                                                    <div className="bg-[#004A77] justify-center text-2xl text-white px-4 py-2 rounded-l focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                        $
                                                    </div>
                                                    <input
                                                        value={price}
                                                        onChange={(e) => setPrice(e.target.value)}
                                                        type='number'
                                                        className="bg-[#12232E] text-sm block w-full p-4 rounded-l"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex justify-center'>
                                        <button
                                            type='submit'
                                            className="flex justify-center w-1/2 px-14 py-4 mt-8 mb-8 text-center whitespace-nowrap bg-sky-600 rounded max-md:px-5 max-md:mt-10 max-md:max-w-full"
                                        >
                                            {CarEdit ? 'Editar auto' : 'Vender mi auto'}
                                        </button>
                                    </div>

                                    <button
                                        onClick={handleAnterior}
                                        className='items-center ml-4 hover:bg-blue-600 p-2 hover:rounded-md mb-4'
                                    >
                                        Anterior
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Price;
