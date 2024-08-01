import React from 'react';
import { useEffect } from 'react';
import { useContextCar } from '../../Context/Context';

import { IoMdClose } from "react-icons/io";
const ReservationModal = ({ showModal, handleClose, reserva }) => {

    const { Formatnumber } = useContextCar();

    if (!showModal) return null;


    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [showModal])

    return (

        <div className='fixed inset-0 flex items-center justify-center z-50  text-white backdrop-blur-sm '>

            <div className="bg-gray-900 rounded-lg p-8 z-10 max-md:p-6 max-sm:p-4 max-md:rounded-md max-sm:rounded-sm">
                <div className='flex text-3xl mt-6 max-md:text-3xl font-extrabold text-white max-md:flex-wrap max-md:max-w-full justify-between'>
                    <h2 className="flex-auto">Detalles de la Reserva</h2>
                    <IoMdClose className='cursor-pointer mx-12 hover:bg-red-600 hover:rounded-full' onClick={handleClose} />
                </div>

                <div className="flex gap-4 mt-4">
                    <div className="text-xl font-bold text-white max-md:text-2xl">Fecha:</div>
                    <div className="text-xl text-white text-opacity-50 max-md:text-2xl"> {reserva?.informationUser.ReservationDate}</div>
                </div>

                <div className="mt-6 border-white border-solid border-[3px] min-h-[4px] max-md:mt-12 max-md:max-w-full" />

                <div className='flex mt-6 gap-12 justify-between mx-10'>

                    <div className="flex flex-col w-[75%]">
                        <div className="flex flex-col grow whitespace-nowrap">
                            <div className="flex gap-4">
                                <div className="text-xl font-bold text-white max-md:text-2xl">Nombre:</div>
                                <div className="text-xl text-white text-opacity-50 max-md:text-2xl">{reserva?.informationUser.nameUser}</div>
                            </div>
                            <div className="flex gap-4 mt-2">
                                <div className="text-xl font-bold text-white max-md:text-2xl">Teléfono:</div>
                                <div className="text-xl text-white text-opacity-50 max-md:text-2xl">{reserva?.informationUser.phoneUser}</div>
                            </div>
                            <div className="flex gap-4 mt-2">
                                <div className="text-xl font-bold text-white max-md:text-2xl">Email:</div>
                                <div className="text-xl text-white text-opacity-50 max-md:text-2xl">{reserva?.informationUser.emailUser}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col w-[75%] max-md:ml-0 max-md:w-full gap-8 ml-4">
                        <div className="flex flex-col grow whitespace-nowrap ml-3">
                            <div className="flex gap-4">
                                <div className="text-xl font-bold text-white max-md:text-2xl">Auto:</div>
                                <div className="text-xl text-white text-opacity-50 max-md:text-2xl">{reserva?.informationVehicle.Titulo}</div>
                            </div>

                            <div className="flex gap-4 mt-2">
                                <div className="text-xl font-bold text-white max-md:text-2xl">Año:</div>
                                <div className="text-xl text-white text-opacity-50 max-md:text-2xl">{reserva?.informationVehicle.year}</div>
                            </div>

                            <div className="flex gap-4 mt-2">
                                <div className="text-xl font-bold text-white max-md:text-2xl">Color:</div>
                                <div className="text-xl text-white text-opacity-50 max-md:text-2xl">{reserva?.informationVehicle.color}</div>
                            </div>

                            <div className="flex gap-4 mt-2">
                                <div className="text-xl font-bold text-white max-md:text-2xl">Precio:</div>
                                <div className="text-xl text-white text-opacity-50 max-md:text-2xl">${Formatnumber(reserva?.informationVehicle.precio)}</div>
                            </div>

                            <div className="flex gap-4 mt-2">
                                <div className="text-xl font-bold text-white max-md:text-2xl">Condición:</div>
                                <div className="text-xl text-white text-opacity-50 max-md:text-2xl">{reserva?.informationVehicle.condicion}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default ReservationModal;
