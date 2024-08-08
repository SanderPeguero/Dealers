import React, { useState, useRef } from 'react';
import { useContextCar } from '../../Context/Context';
import editar from "../../assets/img/editar.png"
import { editUserName, editPhone, editEmail, editCar, editPrice } from "../../Functions/HomeAdmin/HomeAdmin";
import { IoMdClose } from "react-icons/io";

const ReservationModal = ({ showModal, handleClose, reserva }) => {
    const { user, WhichRole, Name, Phone, Email, CarName, Price, setName, setPhone, setEmail, setCarName, setPrice,  GetReserva } = useContextCar()
    const { Formatnumber } = useContextCar();
   
    if (!showModal) return null;

    /*useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden"
        } else  {
            document.body.style.overflow = "block"
        }
        return () => {
            document.body.style.overflow = "block"
        }
    }, [showModal])
*/

    const handleEditNameText = () => {
        const newName = prompt('Favor Ingrese el Nuevo Nombre de Usuario:', Name);
        if (newName !== null) {
            editUserName(newName)
            GetReserva(setName, setPhone, setEmail, setCarName, setPrice)
        }
    }

    const handleEditPhone = () => {
        const newPhone = prompt('Favor Ingrese el Nuevo Telefono de Usuario:', Phone);
        if (newPhone !== null) {
            editPhone(newPhone)
            GetReserva(setName, setPhone, setEmail, setCarName, setPrice)
        }
    }

    const handleEditEmail = () => {
        const newEmail = prompt('Favor Ingrese el Nuevo Correo Electronico de Usuario:', Email);
        if (newEmail !== null) {
            editEmail(newEmail)
            GetReserva(setName, setPhone, setEmail, setCarName, setPrice)
        }
    }

    const handleEditCar = () => {
        const newCarName = prompt('Favor Ingrese el Nuevo Nombre del Vehiculo:', CarName);
        if (newCarName !== null) {
            editCar(newCarName)
            GetReserva(setName, setPhone, setEmail, setCarName, setPrice)
        }
    }

    const handleEditPrice = () => {
        const newPrice = prompt('Favor Ingrese el Nuevo Precio del Vehiculo:', Price);
        if (newPrice !== null) {
            editPrice(newPrice)
            GetReserva(setName, setPhone, setEmail, setCarName, setPrice)
        }
    }


    return (

        <div  className='fixed   inset-0 flex items-center justify-center z-50  text-white backdrop-blur-sm ' >

            <div className="bg-gray-900 cursor-pointer  sm:max-w-[98%] relative  m-12   rounded-xl p-12 z-10 md:p-6 max-sm:p-4 md:rounded-md sm:rounded-sm">
                <div className='sm:flex   mt-1 max-md:text-3xl  inline-flex items-center  font-extrabold text-white max-md:flex-wrap max-md:max-w-full justify-between'>
                    <h2 className="flex-auto sm:text-[25px] text-[18px] md:text-3xl">Detalles de la Reserva</h2>
                    <IoMdClose className='cursor-pointer absolute right-2 top-1 sm:top-3 sm:right-4 md:top-3 md:right-5 md:w-20 md:h-10  hover:bg-red-600 hover:rounded-full' onClick={handleClose} />
                </div>

                <div className="flex items-center gap-3 sm:mt-4">
                    <div className=" font-bold text-white max-md:text-2xl"><h1 className='text-[20px] sm:text-2xl'>Fecha:</h1></div>
                    <div className=" text-white text-opacity-50  text-[15px] sm:text-2xl"> {reserva?.informationUser.ReservationDate}</div>
                </div>

                <div className="sm:mt-2 mt-1 bg-slate-50  border-white border-solid border-[3px] min-h-[4px]  max-md:max-w-full" />

                <div className='md:flex  max-w-full md:-mx-2  md:text-[10px]   gap-12  justify-between lg:mx-10'>

                    <div className="flex flex-col w-full md:max-w-[75%]">
                        <div className="flex flex-col grow whitespace-nowrap">
                            <div className="sm:flex items-center gap-4 sm:mb-2 sm:mt-2 md:mb-0 mt-0">
                                <div className=" font-bold text-white max-md:text-2xl"> <h1 className='text-[18px] sm:text-2xl md:text-[20px] '>Nombre:</h1></div>
                                <div className='flex gap-2'>
                                    <div className=" text-white text-opacity-50 text-[18px] sm:text-2xl md:text-[20px]">{Name}</div>
                                    <img onClick={handleEditNameText} className='w-6 h-6' src={editar} alt="edit" />
                                </div>
                                
                            </div>
                            <div className="sm:flex items-center gap-4 sm:mb-2 sm:mt-2 mt-2">
                                <div className="text-xl font-bold text-white max-md:text-2xl"> <h1 className='text-[18px] sm:text-2xl md:text-[20px] '>Teléfono:</h1></div>
                                <div className='flex gap-2'>
                                    <div className="text-xl text-white text-opacity-50 text-[18px] sm:text-2xl md:text-[20px]">{reserva?.informationUser.phoneUser}</div>
                                    <img onClick={handleEditPhone} className='w-6 h-6' src={editar} alt="edit" />
                                </div>
                                
                            </div>
                            <div className="sm:flex items-center sm:mb-2 sm:mt-2 gap-4 mt-2">
                                <div className="text-xl font-bold text-white max-md:text-2xl"><h1 className='text-[18px] sm:text-2xl md:text-[20px] '>Email:</h1></div>
                                <div  className='flex gap-2'>   
                                    <div className="text-xl text-white text-opacity-50 text-[18px] sm:text-2xl md:text-[20px]">{reserva?.informationUser.emailUser}</div>
                                    <img onClick={handleEditEmail} className='w-6 h-6' src={editar} alt="edit" />

                                </div>
                                
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col w-[75%] max-md:ml-0 max-md:w-full gap-8  ml-4">
                        <div className="flex flex-col grow whitespace-nowrap sm:ml-0 md:-ml-5 lg:ml-3">
                            <div className="sm:flex items-center sm:mb-2 sm:mt-2 gap-4">
                                <div className="text-xl font-bold text-white max-md:text-2xl"> <h1 className='text-[18px] sm:text-2xl md:text-[20px] '>Auto:</h1></div>
                                <div className='flex gap-2 '>
                                   <div className="text-xl text-white text-opacity-50 text-[18px]  sm:text-2xl md:text-[20px]">{reserva?.informationVehicle.Titulo}</div>
                                    <img onClick={handleEditCar} className='w-6 h-6' src={editar} alt="edit" /> 
                                </div>
                                
                            </div>

                            <div className="sm:flex items-center sm:mb-2 sm:mt-2 gap-4 mt-2">
                                <div className="text-xl font-bold text-white max-md:text-2xl"><h1 className='text-[18px] sm:text-2xl md:text-[20px] '>Año:</h1></div>
                                <div  className='flex gap-2'>
                                   <div className="text-xl text-white text-opacity-50 text-[18px] sm:text-2xl md:text-[20px]">{reserva?.informationVehicle.year}</div>
                                    <img className='w-6 h-6' src={editar} alt="edit" /> 
                                </div>
                                
                            </div>

                            <div className="sm:flex items-center sm:mb-2 sm:mt-2 gap-4 mt-2">
                                <div className="text-xl font-bold text-white max-md:text-2xl"><h1 className='text-[18px] sm:text-2xl md:text-[20px] '>Color:</h1></div>
                                <div  className='flex gap-2'>
                                    <div className="text-xl text-white text-opacity-50 text-[18px] sm:text-2xl md:text-[20px]">{reserva?.informationVehicle.color}</div>
                                    <img className='w-6 h-6' src={editar} alt="edit" />
                                </div>
                                
                            </div>

                            <div className="sm:flex items-center sm:mb-2 sm:mt-2 gap-4 mt-2">
                                <div className="text-xl font-bold text-white max-md:text-2xl"><h1 className='text-[18px] sm:text-2xl md:text-[20px] '>Precio:</h1></div>
                                <div  className='flex gap-2'>
                                   <div className="text-xl text-white text-opacity-50 text-[18px] sm:text-2xl md:text-[20px]">${Formatnumber(reserva?.informationVehicle.precio)}</div>
                                    <img className='w-6 h-6' src={editar} alt="edit" /> 
                                </div>
                                
                            </div>

                            <div className="sm:flex items-center sm:mb-2 sm:mt-2 gap-4 mt-2">
                                <div className="text-xl font-bold text-white max-md:text-2xl"><h1 className='text-[18px] sm:text-2xl md:text-[20px] '>Condición:</h1></div>
                                <div  className='flex gap-2'>
                                    <div className="text-xl text-white text-opacity-50 text-[18px] sm:text-2xl md:text-[20px]">{reserva?.informationVehicle.condicion}</div>
                                    <img className='w-6 h-6' src={editar} alt="edit" />  
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default ReservationModal;
