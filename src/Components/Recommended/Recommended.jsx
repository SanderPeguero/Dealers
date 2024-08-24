
import React, { useState, useEffect } from 'react';
import { useContextCar } from '../../Context/Context';
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";

import { GoChevronRight } from "react-icons/go";
import { MdDelete } from 'react-icons/md';
import FilterComponent from '../Filter/Filter';

const Recommended = () => {
    const { user, WhichRole, ListCar, setListCar, SerchingCar,
        setAvailable, isFilter, setCarEdit, Formatnumber, DeleteCarSale,
        isOpenCardDetails, setisOpenCardDetails, ListCarSale, setLisCarNew, setLisCarUsed, EditCarSale
    } = useContextCar()
    const [showAll, setShowAll] = useState(false);

    const [SeeCar, setSeeCar] = useState([])

    const handleOpenModal = (car) => {
        setAvailable(car)
    };
    const handlFormulario = () => {
        window.scrollTo(0, 0);
        navigate('/admin/DetailsAutos');
    };

    const handleAddAuto = () => {
        setisOpenCardDetails(!isOpenCardDetails);
    }

    const handleEditAuto = (car) => {
        setCarEdit(car);
        setisOpenCardDetails(!isOpenCardDetails);
    }


    useEffect(() => {
        if (isFilter === true) {
            if (SerchingCar.length > 0) {
                setSeeCar([...SerchingCar]);
            } else {
                setSeeCar([...ListCar]);
            }
        } else  {
            setSeeCar([...ListCar]);
        }

    }, [isFilter, ListCar, SerchingCar]);

    const handleDelete = async (carSaleId) => {
        try {
            await DeleteCarSale(carSaleId);

            const [updatedListCarSale, updatedListCarNew, updatedListCarUsed] = await Promise.all([
                ListCarSale(),
                setLisCarNew(),
                setLisCarUsed()
            ]);

            if (Array.isArray(updatedListCarSale)) {
                setListCar(updatedListCarSale);
            }

            if (Array.isArray(updatedListCarNew)) {
                setListCarNew(updatedListCarNew);
            }

            if (Array.isArray(updatedListCarUsed)) {
                setListCarUsed(updatedListCarUsed);
            }

        } catch (error) {

        }
    }

    const displayedCars = showAll ? SeeCar : SeeCar.slice(0, 9);

    return (
        <div className="bg-transparent flex justify-center md:m-10 items-center xl:mt-36 max-md:px-5 bg-[#0B0C10]" >

            <div className="flex flex-col z-10 mt-96  justify-between w-full max-w-[992px] max-md:mt-10 max-md:max-w-full">


                <div className="flex">
                    <div className="text-2xl mt-20 font-bold text-white ">
                        Autos disponibles

                    </div>

                </div>
                <div>
                    <FilterComponent />
                </div>
                {SeeCar.length > 9 && (
                    <div className="flex w-full mt-3 px-6 py-3 justify-end font-bold lg:text-2xl">
                        <div className="flex text-blue-500 items-center">
                            <button onClick={() => setShowAll(!showAll)} className="text-[1rem]">
                                {showAll ? 'Ver menos' : 'Ver más'}
                            </button>
                            <GoChevronRight className='w-[18px]' />
                        </div>
                    </div>
                )}
                <div className="mt-6 max-md:max-w-full">
                    <div className="">

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3    ">
                            {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                                <div className="flex items-center justify-center text-2xl border text-white rounded transition duration-300 hover:bg-blue-500 hover:text-white focus:outline-none">

                                    <div className="">
                                        <button onClick={() => handleAddAuto()}
                                        >
                                            <FaPlus className='mx-40 mt-4 text-4xl' />
                                            <div className='text-4xl m-5 '>Agregar auto nuevo </div>

                                        </button>
                                    </div>
                                </div>
                            )}

                            {displayedCars.map((car, index) => (
                                <div onClick={handlFormulario} key={index} className="flex flex-col max-md:ml-0 max-md:w-full">
                                    {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                                        <div className='flex flex-row'>
                                            <div className="px-3 py-2 text-xs leading-4">
                                                <button onClick={() => handleEditAuto(car)}
                                                    className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                                    <FaEdit size={14} className="text-yellow-500" />
                                                </button>
                                            </div>
                                            <div className="px-3 py-2 text-xs leading-4">
                                                <button onClick={() => handleDelete(car.IdCarSale)} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-red-400 hover:text-white focus:outline-none">
                                                    <MdDelete size={14} className="text-red-500" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex overflow-hidden relative flex-col rounded-lg grow pt-20 text-lg text-white aspect-[1.15] max-md:mt-6">
                                        <button onClick={() => handleOpenModal(car)}>
                                            <img
                                                loading="lazy"
                                                srcSet={car.Sale.Multimedia?.Image[0]}
                                                className="object-cover absolute inset-0 size-full"
                                                alt={car.Sale.CarDetails?.Title}
                                            />
                                        </button>
                                        <div className="flex absolute inset-x-0 bottom-0 text-sm px-2.5 gap-20 py-5 bg-black bg-opacity-30 max-md:mt-52">
                                            <div className="flex-auto">{car.Sale.CarDetails?.Title}</div>
                                            <div className="">${Formatnumber(car.Sale.Price?.Price)}</div>
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

export default Recommended;
