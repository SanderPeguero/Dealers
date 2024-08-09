import React, { useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useContextCar } from '../../Context/Context';
import useOutsideClick from './useOutsideClick'; // Ajusta la ruta según sea necesario

const Modal = ({ showModal, handleClose }) => {
    const { user, WhichRole, CarAvailable, Formatnumber } = useContextCar();
    const navigate = useNavigate();

    const handlFormulario = () => {
        window.scrollTo(0, 0);
        navigate('/admin/DetailsAutos');
    };

    // Usa el hook para obtener la referencia del modal
    const modalRef = useOutsideClick(() => {
        handleClose(); // Cierra el modal si se hace clic fuera de él
    });

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [showModal]);

    return (
        <>
            {showModal &&
                <div className='fixed inset-0 flex items-center justify-center z-50 min-h-screen w-full text-white backdrop-blur-sm'>
                    <div ref={modalRef} className="relative bg-gray-900 rounded-lg overflow-hidden shadow-xl max-w-screen-sm w-sm:mx-0 sm:mt-3 -mt-10">
                        <div className="flex flex-col px-7 w-full max-md:px-5 max-md:max-w-full m-4 mt-2">

                            <div className="flex text-2xl mt-5 max-md:text-xl font-extrabold text-white max-md:flex-wrap max-md:max-w-full">
                                <div className="flex-auto ">{CarAvailable?.Sale?.DetalleCoche?.Titulo}</div>
                                <IoMdClose className='cursor-pointer mx-10 hover:bg-red-600 hover:rounded-full' onClick={handleClose} />
                            </div>
                            <div className="flex gap-1.5 self-start mt-6 text-lg font-bold">
                                <div className="text-white">US$: </div>
                                <div className="text-gray-500 flex flex-row">
                                    <div>${Formatnumber(CarAvailable?.Sale?.Precio?.Precio)}</div>
                                </div>
                            </div>
                        </div>

                        <div className="prose max-w-screen-md p-6 -mt-3 overflow-y-auto max-h-[70vh] sm:max-h-[50vh] lg:max-h-[80vh] rounded-lg shadow-md">
                            <div className="xl:max-w-[50rem]">
                                <div className="w-full bg-white px-7 border-white border-solid border-[3px] min-h-[4px] max-md:max-w-full" />

                                <div className="self-center mt-8 w-full max-w-[502px] max-md:mt-10 max-md:max-w-full">
                                    <div className="flex gap-5 -mt-4 px-7 max-md:flex-col max-md:gap-0">
                                        <div className="flex flex-col w-[56%] max-md:ml-0 max-md:w-full">
                                            <div className="flex flex-col grow whitespace-nowrap">
                                                <div className="flex gap-3.5">
                                                    <div className="text-lg font-bold text-white max-md:text-xl">Color:</div>
                                                    <div className="text-lg text-white text-opacity-50 max-md:text-xl">{CarAvailable?.Sale?.DetalleCoche?.Color}</div>
                                                </div>
                                                <div className="flex gap-3 mt-6 text-lg">
                                                    <div className="font-bold text-white max-md:text-xl">Año:</div>
                                                    <div className="text-white text-opacity-50 max-md:text-xl">{CarAvailable?.Sale?.DetalleCoche?.Year}</div>
                                                </div>
                                                <div className="flex gap-3.5 mt-7 text-lg">
                                                    <div className="font-bold text-white max-md:text-xl">Combustible:</div>
                                                    <div className="text-white text-opacity-50 max-md:text-xl">{CarAvailable?.Sale?.DetalleMotor?.TipoCombustimble}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col ml-5 w-[44%] max-md:ml-0 max-md:w-full">
                                            <div className="flex flex-col max-md:mt-10">
                                                <div className="flex gap-3.5 text-lg">
                                                    <div className="font-bold text-white max-md:text-xl">Capacidad:</div>
                                                    <div className="text-white text-opacity-50 max-md:text-xl">{CarAvailable?.Sale?.DetalleCoche?.Capacidad} / P</div>
                                                </div>

                                                <div className="flex gap-3.5 mt-6 text-lg">
                                                    <div className="font-bold text-white max-md:text-xl">Condición:</div>
                                                    <div className="text-white text-opacity-50 max-md:text-xl">{CarAvailable?.Sale?.DetalleCoche?.Condicion}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-7 w-full bg-white border-white border-solid border-[3px] min-h-[4px] max-md:mt-10 max-md:max-w-full" />

                                <div className="flex flex-col mt-5 w-full text-white max-md:px-5 max-md:max-w-full">
                                    <div className="text-lg max-md:max-w-full">Descripción</div>

                                    <div className="px-3 pt-4 pb-28 mt-4 text-lg rounded-md border border-white border-opacity-25 text-white text-opacity-90 max-md:pr-5 max-md:max-w-full">
                                        {CarAvailable?.Sale?.DetalleCoche?.Descripcion}
                                    </div>

                                    <div className="justify-center self-center px-7 py-4 mt-6 text-lg max-md:text-xl whitespace-nowrap rounded-lg bg-sky-600 hover:bg-sky-400 bg-opacity-60 max-md:px-5 cursor-pointer"
                                        onClick={handlFormulario}>
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
