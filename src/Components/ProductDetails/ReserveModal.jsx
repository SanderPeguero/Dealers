import React from 'react'
import { useState } from "react";
import { useContextCar } from '../../Context/Context'
import close from "../../assets/img/close.png"
import { validateCarSaleDatos } from '../../Layout/MainScreen/Validations';
import { EditCarSale } from '../../Functions/Sales/Sales';
function ReserveModal({ showModal, setShowModal, handleCloseModal }) {

    const { CarAvailable, Formatnumber, ReservaCar } = useContextCar()
    const [isOpen, setIosOpen] = useState(false);
    const [nameUser, setNameUser] = useState('');
    const [emailUser, setEmailUser] = useState('');
    const [phoneUser, setPhoneUser] = useState('');

    const currentDate = new Date();
    const ReservationDate = currentDate.toLocaleDateString();
    const ReservationTime = currentDate.toLocaleTimeString();

    const validateName = (name) => {
        return name && name.trim().length > 0;
    };


    const closeNotification = () => {
        setIosOpen(false)


    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };

    console.log(CarAvailable)

    const handleReservationClick = async () => {

        if (!validateName(nameUser)) {
            alert('Por favor, ingresa el nombre correcto.');
            return;
        }

        if (!validateEmail(emailUser)) {
            alert('Por favor, ingresa el Email correcto.');
            return;
        }

        if (!validatePhone(phoneUser)) {
            alert('Por favor, ingresa el número correcto.');
            return;
        }

        const reservationData = {
            IdReservedcar: CarAvailable.IdCarSale,
            informationUser: {
                nameUser,
                emailUser,
                phoneUser,
                ReservationDate,
                ReservationTime,
                State: "Reservado"
            },
            informationVehicle: {
                Title: CarAvailable.Sale.CarDetails.Title,
                brand: CarAvailable.Sale.CarDetails.Brand,
                model: CarAvailable.Sale.CarDetails.Model,
                condition: CarAvailable.Sale.CarDetails.Condition,
                price: CarAvailable.Sale.Price.Price,
                year: CarAvailable.Sale.CarDetails.Year,
                color: CarAvailable.Sale.CarDetails.Color

            }
        };

        if (validateCarSaleDatos(CarAvailable.Sale)) {
            if (CarAvailable.Sale.CarDetails.Amount > 0) {
                CarAvailable.Sale.CarDetails.Amount -= 1;
                await EditCarSale(CarAvailable.IdCarSale, CarAvailable)
                await ReservaCar(reservationData, CarAvailable)
                setIosOpen(true);
            } else {
                console.log("AUTO  NO DISPONIBLE")
            }

        } else {
            console.log("Error al reservar, datos vacios")
        }







    };

    const [selectedImage, setSelectedImage] = useState(
        CarAvailable?.Sale?.Multimedia.Image[0] || ''
    );




    if (!showModal) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 text-white backdrop-blur-sm">
            <div className="block bg-gray-900 w-96 py-5 px-4 rounded-xl">

                <div className=' flex justify-between text-2xl'>
                    <h1>Hacer reserva</h1>
                    <img onClick={handleCloseModal} className='w-8 h-8 bg-red-600 px-2 py-2 rounded-xl hover:bg-red-400 transition-colors hover:cursor-pointer' src={close} alt="" />
                </div>

                <div className="py-2 mt-4">
                    <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre completo</label>
                    <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        onChange={(e) => setNameUser(e.target.value)}
                        className="bg-gray-50 border h-12 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre completo" required />

                </div>

                <div className="py-2">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={(e) => setEmailUser(e.target.value)}
                        className="bg-gray-50 border h-12 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required />

                </div>

                <div className="py-2">
                    <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
                    <input
                        type="text"
                        name="telefono"
                        id="telefono"
                        onChange={(e) => setPhoneUser(e.target.value)}
                        className="bg-gray-50 border h-12 w-full p-2.5 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Teléfono" required />

                </div>
                <button
                    className=" w-full py-4 mt-5 text-xl text-white whitespace-nowrap rounded-lg bg-sky-600 hover:bg-sky-400 bg-opacity-60 max-md:px-5 max-md:mt-10"
                    onClick={handleReservationClick}>Reservar
                </button>
            </div>


            {
                isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 sm:mx-0 min-h-screen w-full text-white backdrop-blur-sm">
                        <div className="flex flex-col items-center px-20 py-8 text-3xl text-black rounded-2xl bg-zinc-300 max-w-[671px] max-md:w-[85%] max-md:h-65">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8deecdfa608c19b062408dc30ffa638c671c7967a8c0d2febfa133cf058b525a?"
                                className="max-w-full aspect-square w-[80px]"
                            />
                            <div className="justify-center mt-8 text-xl max-md:text-lg">Gracias por compatirnos tu interes.</div>
                            <div className="mt-3 text-xl max-md:text-sm m justify-center">
                                Brevemente nos estaremos contactando con usted.
                            </div>
                            <button className="justify-center px-7 py-4 mt-16 text-xl text-white whitespace-nowrap rounded-lg bg-red-700 bg-opacity-60 max-md:px-5 max-md:mt-10"
                                onClick={handleCloseModal} >
                                Cerrar
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ReserveModal