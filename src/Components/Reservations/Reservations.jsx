import React, { useEffect, useState } from 'react';
import { useContextCar } from '../../Context/Context';
import edit from "../../assets/img/edit.png";
import delet from "../../assets/img/delet.png";
import ReservationModal from './ReservationModal';
import DetailsCarModal from './DetailsCarModal';
import close from "../../assets/img/close.png"
import carsucess from "../../assets/img/carsucess.png"
const Reservations = () => {
    const { ReservaCarList, Formatnumber, ListCar, setchangeReserve, DeleteReservation, setListReservation, ListReservation } = useContextCar();

    const handleDeleteReservation = async (ReservationId) => {
        try {
            await DeleteReservation(ReservationId);
            
            const [updatedReservaCarList] = await Promise.all([
                ReservaCarList(),
                
            ]);

            if (Array.isArray(updatedListCarSale)) {setDeleteModal(true)
                setListReservation(updatedReservaCarList);
               
                
            }
        } catch (error) {
            console.log("Algo ha salido mal");
        }
    };

    const [Username, setUserName] = useState("");
    const [Title, setTitle] = useState("");
    const [Year, setYear] = useState("");
    const [DateFilter, setDateFilter] = useState("");
    const [TimeFilter, setTimeFilter] = useState("")

    const [showModal, setShowModal] = useState(false);
    const [showDetailsCar, setshowDetailsCar] = useState(false)
    const [selectedReserva, setSelectedReserva] = useState(null)

    const [good, setgood] = useState(false)
    const [error, seterror] = useState(false)


    const currentYear = new Date().getFullYear();
    const years = Array.from(new Array(35), (val, index) => currentYear - index);

    const handleOpenModal = (reserva) => {
        setSelectedReserva(reserva);
        setShowModal(true);
        setchangeReserve(false);
    };


    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedReserva(null);
    };

    const FilterReservas = ReservaCarList.filter(reservas =>
        reservas.informationUser.nameUser.toLowerCase().includes(Username.toLowerCase()) &&
        reservas.informationVehicle.Title.toLowerCase().includes(Title.toLowerCase()) &&
        reservas.informationVehicle.year.toLowerCase().includes(Year.toLocaleLowerCase()) &&
        reservas.informationUser.ReservationDate.toLowerCase().includes(DateFilter.toLowerCase()) &&
        reservas.informationUser.ReservationTime.toLowerCase().includes(TimeFilter.toLowerCase())
    )


    const [dataCarDetails, setDataCarDetails] = useState(null)

    const handleOpenDetails = (idCar) => {

        const carDetails = ListCar.find(data => {
            return data.IdCarSale === idCar
        });

        if (carDetails) {
            setDataCarDetails(carDetails);
        } else {
            console.warn("Car not found for ID:", idCar);
        }

        setshowDetailsCar(true);
    };

    return (
        <div className="overflow-x-auto">
            <DetailsCarModal showDatails={showDetailsCar} setshowDatails={setshowDetailsCar} dataCarDetails={dataCarDetails} />
            {good ? (
                <div className="fixed  inset-0 flex items-center justify-center z-50  sm:mx-0 min-h-screen w-full text-white backdrop-blur-sm  ">

                    <div className="flex flex-col relative items-center px-20 py-8 text-3xl text-white rounded-2xl bg-green-400 max-w-[671px] max-md:w-[85%] max-md:h-65  ">
                        <button className="absolute w-20 h-20 right-5 -top-10 rounded-full justify-center px-7 py-4 mt-16 text-xl text-white whitespace-nowrap transition-all  hover:bg-red-700 bg-opacity-60 max-md:px-5 max-md:mt-10" onClick={() => setgood(false)}>
                            <img src={close} alt="" />
                        </button>
                        <img
                            loading="lazy"
                            src={carsucess}
                            className="max-w-full aspect-square w-[80px]"
                        />
                        <div className="justify-center mt-8 text-xl max-md:text-lg">¡¡¡Exito!!!!</div>
                        <div className=" mt-3 text-xl max-md:text-sm m justify-center ">
                            ¡Se ha actualizado Éxitosamente!
                        </div>

                    </div>
                </div>
            ) : ""}


            {error ? (
                <div className="fixed  inset-0 flex items-center justify-center z-50  sm:mx-0 min-h-screen w-full text-white backdrop-blur-sm  ">

                    <div className="flex flex-col relative items-center px-20 py-8 text-3xl text-white rounded-2xl bg-red-400 max-w-[671px] max-md:w-[85%] max-md:h-65  ">
                        <button className="absolute w-20 h-20 right-5 -top-10 rounded-full justify-center px-7 py-4 mt-16 text-xl text-white whitespace-nowrap transition-all  hover:bg-green-700 bg-opacity-60 max-md:px-5 max-md:mt-10" onClick={() => seterror(false)}>
                            <img src={close} alt="" />
                        </button>
                        <img
                            loading="lazy"
                            src="https://th.bing.com/th/id/R.0f19a8e91142bad74846a88bd6c65a57?rik=vc6qcTmPlSf3bQ&pid=ImgRaw&r=0"
                            className="max-w-full aspect-square w-[80px]"
                        />
                        <div className="justify-center mt-8 text-xl max-md:text-lg">UPs!</div>
                        <div className=" mt-3 text-xl max-md:text-sm m justify-center ">
                            ¡Algo ha Salido Mal!
                        </div>

                    </div>
                </div>
            ) : ""}

            
            <div className='md:flex md:justify-start m-auto w-full'>
                <div className='flex justify-between md:w-[300px] px-2 mb-4 md:mb-0'>
                    <input
                        type="text"
                        value={Username}
                        onChange={(e) => setUserName(e.target.value)}
                        className='bg-[#12232E] w-full text-white rounded-xl h-14 border-indigo-400 focus:outline-none px-2'
                        placeholder='Escriba el nombre del Usuario'
                    />
                </div>
                <div className='flex justify-between md:w-[300px] px-2'>
                    <input
                        type="text"
                        value={Title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='w-full bg-[#12232E] text-white rounded-xl h-14 border-indigo-400 focus:outline-none px-2'
                        placeholder='Escriba el nombre del Auto'
                    />
                </div>
                <div className='flex justify-between md:w-[300px] px-2'>
                    <select
                        value={Year}
                        onChange={(e) => setYear(e.target.value)}
                        className='w-full bg-[#12232E] text-white rounded-xl h-14 border-indigo-400 focus:outline-none px-2'
                    >
                        <option value="">Selecciona el año</option>
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                <div className='flex justify-between md:w-[300px] px-2'>
                    <input
                        type="date"
                        value={DateFilter}
                        className='w-full bg-[#12232E] text-white rounded-xl h-14 border-indigo-400 focus:outline-none px-2 mb-2'
                        placeholder='Escriba el nombre del Auto'
                        onChange={(e) => setDateFilter(e.target.value)}
                    />

                </div>

                <div className='flex justify-between md:w-[300px] px-2'>

                    <input
                        type="time"
                        value={TimeFilter}
                        onChange={(e) => setTimeFilter(e.target.value)}
                        className='w-full bg-[#12232E] text-white rounded-xl h-14 border-indigo-400 focus:outline-none px-2'
                    />
                </div>

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
                                <th scope="col" className="px-6 py-4 font-medium text-gray-100">Hora</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-100">Estado</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-100">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-600 border-t border-gray-600">
                            {FilterReservas.map((reserva) => (
                                <tr key={reserva.id} onClick={() => handleOpenDetails(reserva.IdReservedcar)} className="hover:bg-gray-900 text-gray-100 max-w-full">
                                    <td className="px-6 py-4">{reserva.informationUser.nameUser}</td>
                                    <td className="px-6 py-4">{reserva.informationUser.phoneUser}</td>
                                    <td className="px-6 py-4">{reserva.informationUser.emailUser}</td>
                                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-100">
                                        <div className="text-sm">
                                            <div className="font-medium text-gray-100">{reserva.informationVehicle?.Title}</div>
                                            <div className="text-gray-400">Condición: {reserva.informationVehicle?.condition} <br />
                                                Año:  {reserva.informationVehicle.year},  Color: {reserva.informationVehicle?.color}
                                            </div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">${Formatnumber(reserva.informationVehicle?.price)}</td>
                                    <th>
                                        <div className='font-medium text-gray-100 mx-2'>{reserva.informationUser?.ReservationDate}</div>
                                    </th>
                                    <th>
                                        <div className='font-medium text-gray-100 mx-2'>{reserva.informationUser?.ReservationTime}</div>
                                    </th>
                                    <th>
                                        <div className={`flex justify-center p-1 rounded-lg font-medium text-gray-100 mx-2 ${reserva.informationUser?.State === "Reservado" ? 'bg-red-600' : 'bg-green-600'}`}>
                                            {reserva.informationUser?.State}
                                        </div>
                                    </th>
                                    <th onClick={(e) => e.stopPropagation()} >
                                        <div className='flex justify-center gap-5'>
                                            <button className='hover:bg-slate-400 p-2'>
                                                <img className='w-6 h-6 cursor-pointer' onClick={() => handleOpenModal(reserva)} src={edit} alt="" />
                                            </button>
                                            <button className="hover:bg-slate-400 p-2">
                                                <img className='w-6 h-6 cursor-pointer' onClick={() => handleDeleteReservation(reserva.id)} src={delet} alt="deletebutton" />
                                                
                                            </button>
                                        </div>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ReservationModal showModal={showModal} handleClose={handleCloseModal} reserva={selectedReserva} setgood={setgood} seterror={seterror}/>
        </div>
    );
}

export default Reservations;
