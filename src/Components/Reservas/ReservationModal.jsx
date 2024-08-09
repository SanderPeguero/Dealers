import React, { useState, useEffect, useMemo } from 'react';
import { useContextCar } from '../../Context/Context';
import editar from "../../assets/img/editar.png"
import { editReserve } from "../../Functions/Sales/Sales";
import { IoMdClose } from "react-icons/io";

const ReservationModal = ({ showModal, handleClose, reserva, editReserve }) => {
    const {  setName, setPhone, setEmail, setCarName, setPrice, setCondition, setYear, setColor,  GetReserva } = useContextCar()
    const { Formatnumber } = useContextCar();
    if (!showModal) return null;

    const [inputname, setInputName]= useState ("")
    const [inputphone, setInputPhone]= useState ("")
    const [inputemail, setInputEmail]= useState ("")
    const [inputcondiction, setInputCondiction]= useState ("")
    const [inputAuto, setInputAuto]= useState ("")
    const [inputyear, setInputYear]= useState ("")
    const [inputcolor, setInputColor]= useState ("")
    const [inputprice, setInputPrice]= useState ("")
    const ReservationData= useMemo(()=>({
            inputname,
            inputphone,
            inputemail,
            inputcondiction,
            inputAuto,
            inputyear,
            inputcolor,
            inputprice

        }), [inputname,inputphone,inputemail,inputcondiction,inputAuto, inputyear,inputcolor, inputprice])

        useEffect(() => {
            if (editReserve !== null) {
                setInputName(reserva?.informationUser.nameUser)
                setInputPhone(reserva?.informationUser.phoneUser)
                setInputEmail(reserva?.informationUser.emailUser)
                setInputAuto(reserva?.informationVehicle.Titulo)
                setInputYear(reserva?.informationVehicle.year)
                setInputColor(reserva?.informationVehicle.color)
                setInputPrice(reserva?.informationVehicle.precio)
                setInputCondiction(reserva?.informationVehicle.condicion)
            }

        }, [editReserve])
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
                            <div className="sm:block items-center gap-4 sm:mb-2 sm:mt-2 md:mb-0 mt-0">
                                <div className=" font-bold text-white max-md:text-2xl"> <h1 className='text-[18px] sm:text-2xl md:text-[20px] '>Nombre:</h1></div>
                                <div className='flex gap-2'>
                                    <input value={inputname} onChange={(e) => setInputName(e.target.value)}  className=" bg-[#19415c] rounded-lg px-2  sm:text-2xl md:text-[20px]" type="text"  />

                                </div>
                                
                            </div>
                            <div className="sm:block items-center gap-4 sm:mb-2 sm:mt-2 mt-2">
                                <div className="text-xl font-bold text-white max-md:text-2xl"> <h1 className='text-[18px] sm:text-2xl md:text-[20px] '>Teléfono:</h1></div>
                                <div className='flex gap-2'>
                                    <input value={inputphone} onChange={(e) => setInputPhone(e.target.value)}  className=" bg-[#19415c] rounded-lg px-2  sm:text-2xl md:text-[20px]" type="text"/>
                                </div>
                                
                            </div>
                            <div className="sm:block items-center sm:mb-2 sm:mt-2 gap-4 mt-2">
                                <div className="text-xl font-bold text-white max-md:text-2xl"><h1 className='text-[18px] sm:text-2xl md:text-[20px] '>Email:</h1></div>
                                <input value={inputemail} onChange={(e) => setInputEmail(e.target.value)}  className=" bg-[#19415c] rounded-lg px-2  sm:text-2xl md:text-[20px]" type="text" />
  
                            </div>
                            <div className="sm:block items-center sm:mb-2 sm:mt-2 gap-4 mt-2">
                                <div className="text-xl font-bold text-white max-md:text-2xl"><h1 className='text-[18px] sm:text-2xl md:text-[20px] '>Condición:</h1></div>
                                <input value={inputcondiction} onChange={(e) => setInputCondiction(e.target.value)}  className=" bg-[#19415c] rounded-lg px-2  sm:text-2xl md:text-[20px]" type="text" /> 

                                
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col w-[75%] max-md:ml-0 max-md:w-full gap-8  ml-4">
                        <div className="flex flex-col grow whitespace-nowrap sm:ml-0 md:-ml-5 lg:ml-3">
                            <div className="sm:block items-center sm:mb-2 sm:mt-2 gap-4">
                                <div className="text-xl font-bold text-white max-md:text-2xl"> <h1 className='text-[18px] sm:text-2xl md:text-[20px] '>Auto:</h1></div>
                                <input value={inputAuto} onChange={(e) => setInputAuto(e.target.value)}  className=" bg-[#19415c] rounded-lg px-2  sm:text-2xl md:text-[20px]" type="text"  />
                
                            </div>

                            <div className="sm:block items-center sm:mb-2 sm:mt-2 gap-4 mt-2">
                                <div className="text-xl font-bold text-white max-md:text-2xl"><h1 className='text-[18px] sm:text-2xl md:text-[20px] '>Año:</h1></div>
                                <input value={inputyear} onChange={(e) => setInputYear(e.target.value)} className=" bg-[#19415c] rounded-lg px-2  sm:text-2xl md:text-[20px]" type="text"/>

                            </div>

                            <div className="sm:block items-center sm:mb-2 sm:mt-2 gap-4 mt-2">
                                <div className="text-xl font-bold text-white max-md:text-2xl"><h1 className='text-[18px] sm:text-2xl md:text-[20px] '>Color:</h1></div>
                                <input value={inputcolor} onChange={(e) => setInputColor(e.target.value)} className=" bg-[#19415c] rounded-lg px-2  sm:text-2xl md:text-[20px]" type="text"/>

                            </div>

                            <div className="sm:block items-center sm:mb-2 sm:mt-2 gap-4 mt-2">
                                <div className="text-xl font-bold text-white max-md:text-2xl"><h1 className='text-[18px] sm:text-2xl md:text-[20px] '>Precio:</h1></div>
                                <input value={inputprice} onChange={(e) => setInputPrice(e.target.value)} className=" bg-[#19415c] rounded-lg px-2  sm:text-2xl md:text-[20px]" type="text" enable  /> 
                            </div>

                        
                            
                        </div>
                    </div>
                </div>
                <button onClick={(e) => editReserve(e)} className='w-full m-auto items-center align-middle text-center md:p-3 bg-blue-500 mt-2 rounded-lg'>Editar</button>
            </div>


        </div>
    );
};

export default ReservationModal;
