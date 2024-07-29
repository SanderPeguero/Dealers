import React, { useState } from 'react';
import { useContextCar } from '../../Context/Context';
import profile from "../../assets/img/profile.png"
import car from "../../assets/img/car.png"
const Reservas = () => {

    const {ReservaCarList, Formatnumber } = useContextCar();
    const {Username, setUseName} = useState ("");
    const {Title, setTitle} = useState ("");

   
    
    return (
        <div className="overflow-x-auto">
           <div className='flex justify-between gap-5 w-full'>
               <div className='flex justify-between  w-[300px] px-2 '>
                    <input type="text" value={Username} className='w-full text-blue rounded-l-lg border-indigo-400 focus:outline-none px-2 ' placeholder='Escriba el nombre del Usuario' />
                    <img className='w-10 h-10' src={profile} alt="profile" />
                </div>
                <div className='flex justify-between  w-[300px] px-2 '>
                    <input type="text" value={Title} className='w-full text-blue rounded-l-lg border-indigo-400 focus:outline-none px-2 ' placeholder='Escriba el nombre del Auto' />
                    <img className='w-10 h-10' src={car} alt="car" />
                </div>
                <button  className='w-[300px] rounded-lg hover:bg-slate-300 transition-all bg-blue-500'> Buscar </button>
            </div>
            <div className="min-w-full inline-block align-middle">
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

                            {ReservaCarList.map((reserva) => (
                                <tr key={reserva.id} className="hover:bg-gray-900 text-gray-100 max-w-full">


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
                                        <div className='font-medium text-gray-100 mx-2'> {reserva.informationUser.ReservationDate} </div>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );





}
export default Reservas