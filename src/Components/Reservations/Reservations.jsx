import React, { useEffect, useState, } from 'react';
import { useContextCar } from '../../Context/Context';

import ReservationModal from './ReservationModal';

const Reservations = () => {
    
    
    const {ReservaCarList, Formatnumber, setchangeReserve } = useContextCar();
    const [Username, setUserName] = useState("");
    const [Title, setTitle] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [selectedReserva, setSelectedReserva] = useState(null);
     
    const handleOpenModal = (reserva) => {
        setSelectedReserva(reserva);
        setShowModal(true);
        setchangeReserve(false)
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedReserva(null);
    };
    
    const FilterReservas = ReservaCarList.filter(reservas => 
        reservas.informationUser.nameUser.toLowerCase().includes(Username.toLowerCase()) &&
        reservas.informationVehicle.Titulo.toLowerCase().includes(Title.toLocaleLowerCase())
    )

    return (
        <div className="overflow-x-auto" >

          
            
           <div  className='md:flex md:justify-start m-auto   w-full'>
               <div className='flex justify-between  md:w-[300px] px-2 mb-4 md:mb-0 '>
                    <input type="text" value={Username} onChange={(e) => setUserName(e.target.value)} className='bg-[#12232E] w-full text-white rounded-xl h-14 border-indigo-400 focus:outline-none px-2 ' placeholder='Escriba el nombre del Usuario' />
                </div>
                <div className='flex justify-between  md:w-[300px] px-2 '>
                    <input type="text" value={Title}  onChange={(e)=> setTitle(e.target.value)} className='w-full bg-[#12232E] text-white rounded-xl h-14 border-indigo-400 focus:outline-none px-2 ' placeholder='Escriba el nombre del Auto' />

                </div>
            </div>
            <div   className="min-w-full inline-block align-middle">
                <div className="overflow-hidden rounded-lg border border-gray-600 shadow-md m-5">
                   
                    <table className="min-w-full divide-y divide-gray-600 bg-[#12232E] text-left text-sm text-gray-500">

                        <thead className="bg-[#0e1b24]">
                            <tr>

                                <th scope="col" className="px-6 py-4 font-medium text-gray-100">Nombre</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-100">Teléfono</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-100">Email</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-100">Auto</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-100">Precio</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-100">Fecha</th>

                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-600 border-t border-gray-600">

                            {FilterReservas.map((reserva) => (
                                <tr key={reserva.id} className="hover:bg-gray-900 text-gray-100 max-w-full cursor-pointer" onClick={() => handleOpenModal(reserva)}>


                                    <td className="px-6 py-4">
                                        {reserva.informationUser.nameUser}
                                    </td>

                                    <td className="px-6 py-4">
                                        {reserva.informationUser.phoneUser}
                                    </td>

                                    <td className="px-6 py-4">
                                        {reserva.informationUser.emailUser}
                                    </td>

                                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-100">

                                        <div className="text-sm">
                                            <div className="font-medium text-gray-100">{reserva.informationVehicle.Titulo}</div>
                                            <div className="text-gray-400">Condicion: {reserva.informationVehicle.condicion} <br />
                                                Año:  {reserva.informationVehicle.year},  Color: {reserva.informationVehicle.color}</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        ${Formatnumber(reserva.informationVehicle.precio)}</td>

                                    <th >
                                        <div   className='font-medium text-gray-100 mx-2'> {reserva.informationUser.ReservationDate} </div>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ReservationModal  showModal={showModal} handleClose={handleCloseModal} reserva={selectedReserva} />
        </div>
    );





}
export default Reservations