
import React, { useState, useEffect } from 'react';
import { useContextCar } from '../../Context/Context';
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";

import { GoChevronRight } from "react-icons/go";
import { MdDelete } from 'react-icons/md';
import FilterComponent from '../Filter/Filter';

const Recommended = ({ refAutos }) => {
    const { user, WhichRole, ListCar, setListCar, SerchingCar,
        setAvailable, isFilter, setCarEdit, Formatnumber, DeleteCarSale,
        isOpenCardDetails, setisOpenCardDetails, ListCarSale, setLisCarNew, setLisCarUsed, EditCarSale
    } = useContextCar()
    const navigate = useNavigate();
    const [showAll, setShowAll] = useState(false);
    const [SeeCar, setSeeCar] = useState([])


    const [currentpages, setCurrentPages] = useState(1);
    const itemsPerPage = 8;
    const Lastitem = currentpages * itemsPerPage;
    const firstitem = Lastitem - itemsPerPage;

    const currentItems = ListCar.slice(firstitem, Lastitem);

    const totalPages = Math.ceil(ListCar.length / itemsPerPage);
    const handleNextPage = () => {
        if (currentpages < totalPages) {
            setCurrentPages(currentpages + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentpages > 1) {
            setCurrentPages(currentpages - 1);

        }
    };


    const handlePageChange = (pageNumber) => {
        setCurrentPages(pageNumber);
    };


    const handleOpenModal = (car) => {
        console.log("Hola abre el modal")
        setAvailable(car)
        window.scrollTo(0, 0);
        navigate('/admin/DetailsAutos');
    };
    const handlFormulario = () => {
        console.log("El supuesto formulario")
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
        } else {
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



    return (
        <div className="bg-transparent flex justify-center md:m-10 items-center xl:mt-36 max-md:px-5 bg-[#0B0C10]" >

            <div ref={refAutos} className="flex flex-col z-10 mt-96  justify-between w-full max-w-[992px] max-md:mt-10 max-md:max-w-full">


                <div className="flex">
                    <div className="text-2xl mt-20 font-bold text-white ">
                        Autos disponibles

                    </div>

                </div>
                <div>
                    <FilterComponent />
                </div>

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

                            {currentItems.map((car, index) => {

                                const ShowCar = (!user && car.Sale.CarDetails.Amount > 0) || (user && (WhichRole === 'admin' || WhichRole === 'Owner'))

                                if (ShowCar) {
                                    return (
                                        <div key={index} className="flex flex-col max-md:ml-0 max-md:w-full">

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
                                    )
                                }


                            })}



                        </div>

                        <div className="flex w-full mt-3 px-6 py-3 justify-center font-bold lg:text-2xl">
                            <div class="flex items-center gap-2 ">
                                <button onClick={handlePrevPage}
                                    class="flex items-center gap-2  px-6 py-3 font-sans text-xs font-bold text-center md:text-2xl  text-blue-500 hover:bg-sky-500 hover:transition-all hover:text-white uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" className='md:h-9 md:w-9' fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                        aria-hidden="true" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                                    </svg>
                                    Anterior
                                </button>
                                {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
                                    <button
                                        key={number}
                                        onClick={() => handlePageChange(number)}
                                        className={`px-4 py-2 mx-1 rounded-full ${currentpages === number ? 'bg-blue-500 text-white' : 'bg-yellow-50 text-gray-700'
                                            }`}
                                    >
                                        {number}
                                    </button>
                                ))}

                                <button onClick={handleNextPage}
                                    class="flex items-center md:text-2xl  gap-2 px-6 py-3 font-sans text-xs font-bold text-center hover:bg-sky-500 hover:transition-all hover:text-white text-blue-500 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button">
                                    Siguiente
                                    <svg xmlns="http://www.w3.org/2000/svg" className='md:h-9 md:w-9 ' fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                        aria-hidden="true" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                                    </svg>
                                </button>
                            </div>



                        </div>


                    </div>


                </div>
            </div>

        </div>
    );

};

export default Recommended;
