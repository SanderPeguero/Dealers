
import React, { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useContextCar } from '../../Context/Context';

const Modal = ({ showModal, handleClose, cars }) => {

    const { user, WhichRole, CarAvailable} = useContextCar()
    const navigate = useNavigate();

    
   
    const handlFormulario = () => {
        window.scrollTo(0,0);
        navigate('/admin/DetailsAutos')
    }



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
        <>
            {showModal && 
                <div className='fixed  inset-0 flex items-center justify-center z-50  sm:mx-0 min-h-screen w-full text-white backdrop-blur-sm ' >
                    <div className="relative bg-gray-900  rounded-lg overflow-hidden shadow-xl max-w-screen-md w-full m-4" >
                        <div className="flex flex-col px-7 w-full max-md:px-5 max-md:max-w-full m-4">

                            <div className="flex text-3xl mt-5 max-md:text-2xl font-extrabold text-white max-md:flex-wrap max-md:max-w-full">
                                <div className="flex-auto">
                                    {CarAvailable?.Sale?.DetalleCoche?.Titulo}
                                 

                                </div>

                                <IoMdClose className='cursor-pointer mx-10 hover:bg-red-600 hover:rounded-full' onClick={() => showModal(false)}  />
                            </div>
                            <div className="flex gap-1.5 self-start mt-6 text-xl font-bold ">
                                <div className="text-white">US$:  </div>
                                <div className="text-gray-500 flex flex-row ">
                                {/* {CarAvailable?.Sale?.Precio?.Precio} */}

                                    {/* {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                                        <div className="px-3 py-2   text-xs leading-4">
                                            <button className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                                <FaEdit size={14} className="text-yellow-400" />
                                            </button>
                                        </div>
                                    )} */}

                                </div>
                            </div>
                        </div>

                                    

                        <div className="prose max-w-screen-md p-6 overflow-y-auto" style={{ maxHeight: '70vh', borderRadius: '0.375rem', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)' }}>

                            <div className=" xl:max-w-[50rem]  m-1">

                                <div className=" w-full bg-white border-white border-solid border-[3px] min-h-[4px] max-md:max-w-full" />
                                
                                <div className="self-center mt-8 w-full max-w-[502px] max-md:mt-10 max-md:max-w-full">
                                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                        <div className="flex flex-col w-[56%] max-md:ml-0 max-md:w-full">
                                            <div className="flex flex-col grow whitespace-nowrap ">
                                                <div className="flex gap-3.5">
                                                    <div className="text-2xl font-bold text-white max-md:text-xl">Color:</div>
                                                    {/* <div className="text-2xl text-white text-opacity-50 max-md:text-xl">{CarAvailable?.Sale.Detalle}</div> */}
                                                </div>
                                                <div className="flex gap-3 mt-6">
                                                    <div className="text-2xl font-bold text-white max-md:text-xl">Año:</div>
                                                    <div className="text-2xl text-white text-opacity-50 max-md:text-xl"></div>
                                                </div>
                                                <div className="flex gap-3.5 mt-7">
                                                    <div className="text-2xl font-bold text-white max-md:text-xl">Combustible:</div>
                                                    <div className="text-2xl text-white text-opacity-50 max-md:text-xl">Electrico</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col ml-5 w-[44%] max-md:ml-0 max-md:w-full">
                                            <div className="flex flex-col max-md:mt-10">
                                                <div className="flex gap-3.5">
                                                    <div className="text-2xl font-bold text-white max-md:text-xl">Capacidad:</div>
                                                    <div className="text-2xl text-white text-opacity-50 max-md:text-xl">5 / P</div>
                                                </div>
                                                <div className="flex gap-3.5 mt-6 whitespace-nowrap ">
                                                    <div className="text-2xl font-bold text-white max-md:text-xl">Condición:</div>
                                                    <div className="text-2xl text-white text-opacity-50 max-md:text-xl">Nuevo</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10 w-full bg-white border-white border-solid border-[3px] min-h-[4px] max-md:mt-10 max-md:max-w-full" />

                                <div className="flex flex-col mt-5 w-full text-white max-md:px-5 max-md:max-w-full">
                                    <div className="text-3xl max-md:max-w-full">Descripción</div>
                                    <div className="px-3 pt-4 pb-28 mt-4 text-xl rounded-lg bg-white bg-opacity-30 text-white text-opacity-90 max-md:pr-5 max-md:max-w-full ">
                                        Disfruta de una cabina silenciosa gracias al vidrio acústico de 360 grados.
                                    </div>
                                    <div className="justify-center self-center px-7 py-4 mt-6 text-3xl  max-md:text-xl whitespace-nowrap rounded-lg bg-sky-600 hover:bg-sky-400 bg-opacity-60  max-md:px-5 cursor-pointer"

                                        onClick={handlFormulario} >

                                        Reservar
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            }
        </>


    );
};

export default Modal;
