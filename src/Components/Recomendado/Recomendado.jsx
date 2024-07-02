
import React, { useState, useEffect } from 'react';
import Modal from './modal';
import { useContextCar } from '../../Context/Context';
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";


const Recomendado = () => {
    const { user, WhichRole, ListCar, SerchingCar, setAvailable, isFiltro } = useContextCar()
    const [showModal, setShowModal] = useState(false);
    const [SeeCar, setSeeCar] = useState([])
    const navigate = useNavigate();

    const handleOpenModal = (car) => {
        setAvailable(car)
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    
    const handleAgregarAuto = () => {
        window.scrollTo(0, 0);
        navigate('/admin/CarSale')
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

    return (
        <div className="bg-transparent z-50 flex justify-center md:m-10 items-center xl:mt-36 max-md:px-5 bg-[#0B0C10]" >

            <div className="flex flex-col mt-3 justify-between  z-50 w-full max-w-[992px] max-md:mt-10 max-md:max-w-full">
                
                <div className="flex">
                    <div className="text-2xl mt-3 font-bold text-white ">
                        Autos disponibles
                    </div>
                </div>
                <div className="flex w-full mt-3 px-6 py-3 justify-end font-bold  lg:text-2xl ">

                    <div className="flex text-blue-500 items-center">
                        <a href="#" className="text-[1rem]">Ver más</a>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4707172754d78e0e475b23989d8e8c6a800962b1b776c74f53e1cf37665d2790?"
                            className="w-[18px]"
                        />
                    </div>
                </div>
                <div className="mt-6 max-md:max-w-full">
                    <div className="">

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3    ">
                            { (
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

                            {ListCar.map((car, index) => (
                                <div key={index} className="flex flex-col  max-md:ml-0 max-md:w-full">
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
                                            <div className="">{car.Sale.Precio.Precio}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>

            <Modal showModal={showModal} handleClose={handleCloseModal} />
        </div>
    );
};

export default Recomendado;
