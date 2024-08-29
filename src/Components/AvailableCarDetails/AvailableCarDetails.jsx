import React, { useState } from "react";
import { useContextCar } from '../../Context/Context';
import ReserveModal from "../ProductDetails/ReserveModal";
import { useNavigate, Link, useLocation } from 'react-router-dom';

const AvailableCarDetails = () => {
    const { CarAvailable, Formatnumber, ReservaCar, setAutosVisible } = useContextCar();
    const [isOpen, setIosOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [nameUser, setNameUser] = useState('');
    const [emailUser, setEmailUser] = useState('');
    const [phoneUser, setPhoneUser] = useState('');

    const currentDate = new Date();
    const ReservationDate = currentDate.toLocaleString();
    const navigate = useNavigate()
    const location = useLocation()

    const handleAutosVisibles = () => {
        if (location.pathname !== '/' && location.pathname !== '/admin') {
            navigate('/')
            setAutosVisible(true)
        }
        else {
            setAutosVisible(true)
            // setIsMenuOpen(!isMenuOpen)
        }
    }

    const getAdjustedPath = (path) => {
        return location.pathname.includes('/admin') ? `/admin${path}` : path;
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const validateName = (name) => {
        return name && name.trim().length > 0;
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };

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
            informationUser: {
                nameUser,
                emailUser,
                phoneUser,
                ReservationDate,
            },
            informationVehicle: {
                Title: CarAvailable.Sale.CarDetails.Title,
                brand: CarAvailable.Sale.CarDetails.Brand,
                model: CarAvailable.Sale.CarDetails.Model,
                condition: CarAvailable.Sale.CarDetails.Condition,
                price: CarAvailable.Sale.Price.Price,
                year: CarAvailable.Sale.CarDetails.Year,
                color: CarAvailable.Sale.CarDetails.Color,
            },
        };

        await ReservaCar(reservationData);
        setIosOpen(true);
    };

    const images = CarAvailable?.Sale?.Multimedia?.Image || [];
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className='bg-zinc-950'>
            <ReserveModal showModal={showModal} handleCloseModal={handleCloseModal} />
            <nav className="text-sm sm:text-base text-white p-4 md:p-6 lg:p-6 rounded-md shadow-lg">
                <ol className="list-none p-0 inline-flex space-x-2">
                    <li className="flex items-center">
                        <Link to={getAdjustedPath('/')} className="text-gray-300 hover:text-blue-500 transition-colors duration-300">Home</Link>
                        <span className="mx-2">/</span>
                    </li>
                    <li className="flex items-center">
                        <button onClick={handleAutosVisibles} className="text-gray-300 hover:text-blue-500 transition-colors duration-300">Autos</button>
                        <span className="mx-2">/</span>
                    </li>
                    <li className="flex items-center">
                        <span className="text-gray-600">{CarAvailable?.Sale?.CarDetails?.Title}</span>
                    </li>
                </ol>
            </nav>

            <div className=" max-w-2xl mx-auto">
                <div className="relative" data-carousel="static">

                    <div className="overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
                                    }`}
                                data-carousel-item
                            >
                                <img
                                    src={image}
                                    className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
                                    alt={`Slide ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-400"
                                    }`}
                                aria-current={currentIndex === index}
                                aria-label={`Slide ${index + 1}`}
                                onClick={() => setCurrentIndex(index)}
                            ></button>
                        ))}
                    </div>
                    <button
                        type="button"
                        className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                        onClick={handlePrevious}
                    >
                        <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                            <svg
                                className="w-5 h-5 text-white sm:w-6 sm:h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 19l-7-7 7-7"
                                ></path>
                            </svg>
                            <span className="hidden">Previous</span>
                        </span>
                    </button>
                    <button
                        type="button"
                        className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                        onClick={handleNext}
                    >
                        <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                            <svg
                                className="w-5 h-5 text-white sm:w-6 sm:h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                ></path>
                            </svg>
                            <span className="hidden">Next</span>
                        </span>
                    </button>
                </div>

            </div>
            <div className="text-sm sm:text-base bg-gray-900 text-white p-2 md:p-4 lg:p-6 drop-shadow-lg mt-4">
                <div className="flex flex-row items-center px-10">
                    <ol className="list-none font-bold p-0 flex-1 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-16">
                        <li className="flex items-center">
                            <span className="text-xl sm:text-xl md:text-2xl">{CarAvailable?.Sale?.CarDetails?.Title}</span>
                        </li>
                        <li className="flex items-center">
                            <span className="text-lg sm:text-2xl md:text-2xl">${Formatnumber(CarAvailable?.Sale?.Price?.Price)}</span>
                        </li>
                        <li className="flex flex-row items-center mx-8">
                            {CarAvailable?.Sale?.CarDetails?.Amount > 0
                                ?
                                <svg class="w-5 h-5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                :
                                <svg class="w-5 h-5 me-2  text-red-500 dark:text-red-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 9.293l3.293-3.293a1 1 0 1 1 1.414 1.414L11.414 10l3.293 3.293a1 1 0 0 1-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 1 1-1.414-1.414L8.586 10 5.293 6.707a1 1 0 1 1 1.414-1.414L10 8.586z" />
                                </svg>
                            }
                            <span className="text-lg sm:text-2xl md:text-1xl">{CarAvailable?.Sale?.CarDetails?.Amount > 0 ? <>Disponible</> : <>No disponible</>}</span>
                        </li>

                    </ol>

                    <button
                        onClick={handleOpenModal}
                        className="justify-center px-16 py-4 text-base font-semibold text-center text-white whitespace-nowrap bg-sky-600 rounded max-md:px-5">
                        Reservar
                    </button>

                </div>
            </div>

            <div className="p-12">
                <div className="mb-5">
                    <div className="text-2xl font-bold text-zinc-300 max-md:max-w-full">
                        Descripción
                    </div>
                    <div className="text-zinc-300 mt-5 text-base bg-clip-text max-md:max-w-full">
                        {CarAvailable?.Sale?.CarDetails?.Description}

                    </div>
                </div>

                <div>
                    <div className="flex flex-col  ">
                        <span className="text-2xl text-white">Detalles de autos</span>
                        <hr class="w-full h-1 mt-2  bg-gray-100 border-0 rounded  dark:bg-gray-700" />
                    </div>
                    <div className=" py-12 flex items-center justify-center">

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                            {/* Detalles del Auto */}
                            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                                <div className="p-1 bg-blue-600"></div>
                                <div className="p-8">
                                    <h2 className="text-3xl font-bold text-white mb-4">Detalles del Auto</h2>
                                    <ul className="text-sm text-gray-300 mb-6">
                                        <li className="mb-2 flex items-center justify-between">
                                            <span className="font-medium">Marca</span>
                                            <span className="text-gray-100">{CarAvailable?.Sale?.CarDetails?.Brand}</span>
                                        </li>
                                        <li className="mb-2 flex items-center justify-between">
                                            <span className="font-medium">Modelo</span>
                                            <span className="text-gray-300">{CarAvailable?.Sale?.CarDetails?.Model}</span>
                                        </li>
                                        <li className="mb-2 flex items-center justify-between">
                                            <span className="font-medium">Condición</span>
                                            <span className="text-gray-100">{CarAvailable?.Sale?.CarDetails?.Condition}</span>
                                        </li>
                                        <li className="mb-2 flex items-center justify-between">
                                            <span className="font-medium">Año</span>
                                            <span className="text-gray-300">{CarAvailable?.Sale?.CarDetails?.Year}</span>
                                        </li>
                                        <li className="mb-2 flex items-center justify-between">
                                            <span className="font-medium">Tipo de Cuerpo</span>
                                            <span className="text-gray-300">{CarAvailable?.Sale?.CarDetails?.BodyType}</span>
                                        </li>
                                        <li className="mb-2 flex items-center justify-between">
                                            <span className="font-medium">Asientos</span>
                                            <span className="text-gray-300">{CarAvailable?.Sale?.CarDetails?.Capacidad} Personas</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="font-medium">Color exterior</span>
                                            <span className="text-gray-300">{CarAvailable?.Sale?.CarDetails?.Color}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Detalles del Motor */}
                            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                                <div className="p-1 bg-blue-600"></div>
                                <div className="p-8">
                                    <h2 className="text-3xl font-bold text-gray-300 mb-4">Detalles del Motor</h2>
                                    <ul className="text-sm text-gray-300 mb-6">
                                        <li className="mb-2 flex items-center justify-between">
                                            <span className="font-medium">Combustible</span>
                                            <span className="text-gray-100">{CarAvailable?.Sale?.MotorDetails?.FuelType}</span>
                                        </li>
                                        <li className="mb-2 flex items-center justify-between">
                                            <span className="font-medium">Kilometraje</span>
                                            <span className="text-gray-300">{CarAvailable?.Sale?.MotorDetails?.Mileage} km</span>
                                        </li>
                                        <li className="mb-2 flex items-center justify-between">
                                            <span className="font-medium">Transmisión</span>
                                            <span className="text-gray-300">{CarAvailable?.Sale?.MotorDetails?.Transmition}</span>
                                        </li>
                                        <li className="mb-2 flex items-center justify-between">
                                            <span className="font-medium">Tracción</span>
                                            <span className="text-gray-300">{CarAvailable?.Sale?.MotorDetails?.DriverTrain}</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="font-medium">Power</span>
                                            <span className="text-gray-300">{CarAvailable?.Sale?.MotorDetails?.Power} hp</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Dimensiones */}
                            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                                <div className="p-1 bg-blue-600"></div>
                                <div className="p-8">
                                    <h2 className="text-3xl font-bold text-gray-300 mb-4">Dimensiones</h2>
                                    <ul className="text-sm text-gray-300 mb-6">
                                        <li className="mb-2 flex items-center justify-between">
                                            <span className="font-medium">Longitud</span>
                                            <span className="text-gray-300">{CarAvailable?.Sale?.Dimension?.Longitude} mm</span>
                                        </li>
                                        <li className="mb-2 flex items-center justify-between">
                                            <span className="font-medium">Ancho</span>
                                            <span className="text-gray-300">{CarAvailable?.Sale?.Dimension?.Width} mm</span>
                                        </li>
                                        <li className="mb-2 flex items-center justify-between">
                                            <span className="font-medium">Altura</span>
                                            <span className="text-gray-300">{CarAvailable?.Sale?.Dimension?.Height} mm</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="font-medium">Volumen de carga</span>
                                            <span className="text-gray-300">{CarAvailable?.Sale?.Dimension?.CargoVolume} L</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="">

                    <div className="flex flex-col  ">
                        <span className="text-2xl text-white">Características de auto</span>
                        <hr class="w-full h-1 mt-2  bg-gray-100 border-0 rounded  dark:bg-gray-700" />
                    </div>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 text-white ">
                        {CarAvailable?.Sale?.Features?.Features.map((feature, index) => (
                            <div key={index} className="flex">
                                <svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>

                                {feature}</div>
                        ))}
                    </div>

                </div>
            </div>

        </div>
    );
};

export default AvailableCarDetails;
