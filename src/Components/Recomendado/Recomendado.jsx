
import React, { useState, useEffect } from 'react';
import Modal from './modal';
import { useContextCar } from '../../Context/Context';
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import { GoChevronRight } from "react-icons/go";

import { MdDelete } from 'react-icons/md';

const Recomendado = () => {
    const { user, WhichRole, ListCar, setListCar, SerchingCar,
        setAvailable, isFiltro, setCarEdit, Formatnumber, DeleteCarSale,
        isOpenCardDetails, setisOpenCardDetails
    } = useContextCar()
    const [showModal, setShowModal] = useState(false);
    const [SeeCar, setSeeCar] = useState([])
    const navigate = useNavigate();



    const handleAgregarAuto = () => {
        setisOpenCardDetails(!isOpenCardDetails)
        // window.scrollTo(0, 0);
        // navigate('/CarSale')
    }

    useEffect(() => {
        if (isFiltro === true) {
            setSeeCar([...SerchingCar]);

        }

        if (isFiltro === false) {
            console.log("holaaaaaaaaaaaaaaaa")
            setSeeCar([...ListCar])
        }

    }, [isFiltro])

    useEffect(() => {
        if (isFiltro === false && ListCar.length > 0) {
            console.log("Datos no filtrado");
            console.log(ListCar);
            setSeeCar([...ListCar]);
        }
    }, [isFiltro, ListCar]);

    useEffect(() => {
        console.log("Datos filtrados o No");
        console.log(ListCar);
    }, [ListCar]);

    const handleEditAuto = (car) => {
        setCarEdit(car)
        window.scrollTo(0, 0);
        navigate('CarSale')
    }


    const handleDelete = async (carSaleId) => {
        await DeleteCarSale(carSaleId);
        // Actualizar la lista después de eliminar un elemento
        const updatedList = listCar.filter(car => car.IdCarSale !== carSaleId);
        setListCar(updatedList);
    }


    return (
        <div className="bg-transparent  flex justify-center md:m-10 items-center xl:mt-36 max-md:px-5" >

            <div className="flex  flex-col mt-96 justify-between  w-full max-w-[992px] max-md:mt-10 max-md:max-w-full">

                <div className="flex">
                    <div className="text-2xl mt-3 font-bold text-white ">
                        Autos disponibles
                    </div>
                </div>
                <div className="flex w-full mt-3 px-6 py-3 justify-end font-bold  lg:text-2xl ">

                    <div className="flex text-blue-500 items-center">
                        <a href="#" className="text-[1rem]">Ver más</a>
                        <GoChevronRight className='w-[18px]' />
                    </div>
                </div>
                <div className="mt-6 max-md:max-w-full">
                    <div className="">

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3    ">
                            {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (

                                <div className="flex items-center justify-center text-2xl border text-white rounded transition duration-300 hover:bg-blue-500 hover:text-white focus:outline-none">

                                    <div className="">

                                        <button onClick={() => handleAgregarAuto()}
                                        >
                                            <FaPlus className='mx-40 mt-4 text-4xl' />
                                            <div className='text-4xl m-5 '>Agregar auto nuevo </div>
                                        </button>
                                    </div>

                                </div>
                            )}

                            {/* {ListCar.map((car, index) => (
                                <div key={index} className="flex flex-col  max-md:ml-0 max-md:w-full">
                                    <div className='flex flex-row'>
                                            <div className="px-3 py-2   text-xs leading-4">
                                                <button onClick={() => handleEditAuto(car)} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                                    <FaEdit size={14} className="text-yellow-500" />
                                                </button>
                                            </div>
                                            <div className="px-3 py-2   text-xs leading-4">
                                                <button className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-red-400 hover:text-white focus:outline-none">
                                                    <MdDelete size={14} onClick={() => handleDelete(car.IdCarSale)} className="text-red-500" />
                                                        
                                                </button>
                                            </div>
                                        </div>
                                    <div className="flex overflow-hidden relative flex-col rounded-lg grow pt-20 text-lg text-white aspect-[1.15] max-md:mt-6">
                                       
                                            <img
                                                loading="lazy"
                                                srcSet={car.Sale.Multimedia.Imagen[0]}
                                                className="object-cover absolute inset-0 size-full"
                                                alt={car.Sale.DetalleCoche.Titulo}
                                            />
                                   

                                        <div className="flex absolute inset-x-0 bottom-0 text-sm px-2.5 gap-20 py-5   bg-black bg-opacity-30 max-md:mt-52">
                                            <div className="flex-auto">{car.Sale.DetalleCoche.Titulo}</div>
                                            <div className="">{car.Sale.Precio.Precio}</div>
                                        </div>
                                    </div>
                                </div>
                            ))} */}

                            {ListCar.map((car, index) => (
                                <div key={index} className="flex flex-col  max-md:ml-0 max-md:w-full">
                                    {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                                        <div className='flex flex-row'>
                                            <div className="px-3 py-2   text-xs leading-4">
                                                <button onClick={() => handleEditAuto(car)} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                                    <FaEdit size={14} className="text-yellow-500" />
                                                </button>
                                            </div>
                                            <div className="px-3 py-2   text-xs leading-4">
                                                <button className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-red-400 hover:text-white focus:outline-none">
                                                    <MdDelete size={14} onClick={() => handleDelete(car.IdCarSale)} className="text-red-500" />

                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex overflow-hidden relative flex-col rounded-lg grow pt-20 text-lg text-white aspect-[1.15] max-md:mt-6">
                                        <button onClick={() => handleOpenModal(car)}>
                                            <img
                                                loading="lazy"
                                                srcSet={car.Sale.Multimedia.Imagen[0]}
                                                className="object-cover absolute inset-0 size-full"
                                                alt={car.Sale.DetalleCoche.Titulo}
                                            />
                                        </button>

                                        <div className="flex absolute inset-x-0 bottom-0 text-sm px-2.5 gap-20 py-5   bg-black bg-opacity-30 max-md:mt-52">
                                            <div className="flex-auto">{car.Sale.DetalleCoche.Titulo}</div>
                                            <div className="">${Formatnumber(car.Sale.Precio.Precio)}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recomendado;
