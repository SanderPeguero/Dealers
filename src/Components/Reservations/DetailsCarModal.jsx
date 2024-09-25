import React, { useState } from 'react';

const DetailsCarModal = ({ showDatails, setshowDatails, dataCarDetails }) => {

    const images = dataCarDetails?.Sale?.Multimedia?.Image || [];
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

        <>

            {showDatails && (
                <div className="fixed z-30 inset-0 flex items-center justify-center w-full" onClick={() => setshowDatails(false)}>
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    <div  onClick={(e) => e.stopPropagation()}  className="relative  overflow-hidden shadow-xl max-w-screen-lg w-full m-4 transition transform ease-out duration-300 opacity-100 scale-100">

                        <div className="px-6 py-4  bg-gray-100 dark:bg-[#12232E]">
                            <h3 className="text-lg leading-6 font-medium text-black dark:text-white">
                                Detalles de carro reservado
                            </h3>
                        </div>
                        <div
                            className="prose max-w-screen-lg p-8 overflow-y-auto bg-white dark:bg-zinc-950"
                            style={{
                                maxHeight: '70vh',
                            }}
                        >

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
                            <div className='my-4'>
                                <h2 className=" text-black dark:text-white text-2xl font-bold mb-4">{dataCarDetails.Sale.CarDetails.Title}</h2>
                                <p className="mb-4 text-black dark:text-white">
                                    {dataCarDetails.Sale.CarDetails.Description}
                                </p>
                            </div>


                            <div>
                                <div className="flex flex-col  ">
                                    <span className="text-2xl text-black dark:text-white">Detalles de autos</span>
                                    <hr class="w-full h-1 mt-2  bg-gray-300 border-0 rounded  dark:bg-gray-700" />
                                </div>
                                <div className=" py-12 flex items-center justify-center">

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                                        {/* Detalles del Auto */}
                                        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                                            <div className="p-1 bg-blue-600"></div>
                                            <div className="p-8">
                                                <h2 className="text-1xl font-bold text-white mb-4">Detalles del Auto</h2>
                                                <ul className="text-sm text-gray-300 mb-6">
                                                    <li className="mb-2 flex items-center justify-between">
                                                        <span className="font-medium">Marca</span>
                                                        <span className="text-gray-100">{dataCarDetails?.Sale?.CarDetails?.Brand}</span>
                                                    </li>
                                                    <li className="mb-2 flex items-center justify-between">
                                                        <span className="font-medium">Modelo</span>
                                                        <span className="text-gray-300">{dataCarDetails?.Sale?.CarDetails?.Model}</span>
                                                    </li>
                                                    <li className="mb-2 flex items-center justify-between">
                                                        <span className="font-medium">Condición</span>
                                                        <span className="text-gray-100">{dataCarDetails?.Sale?.CarDetails?.Condition}</span>
                                                    </li>
                                                    <li className="mb-2 flex items-center justify-between">
                                                        <span className="font-medium">Año</span>
                                                        <span className="text-gray-300">{dataCarDetails?.Sale?.CarDetails?.Year}</span>
                                                    </li>
                                                    <li className="mb-2 flex items-center justify-between">
                                                        <span className="font-medium">Tipo de Cuerpo</span>
                                                        <span className="text-gray-300">{dataCarDetails?.Sale?.CarDetails?.BodyType}</span>
                                                    </li>
                                                    <li className="mb-2 flex items-center justify-between">
                                                        <span className="font-medium">Asientos</span>
                                                        <span className="text-gray-300">{dataCarDetails?.Sale?.CarDetails?.Capacidad} Personas</span>
                                                    </li>
                                                    <li className="flex items-center justify-between">
                                                        <span className="font-medium">Color exterior</span>
                                                        <span className="text-gray-300">{dataCarDetails?.Sale?.CarDetails?.Color}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Detalles del Motor */}
                                        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                                            <div className="p-1 bg-blue-600"></div>
                                            <div className="p-8">
                                                <h2 className="text-1xl font-bold text-gray-300 mb-4">Detalles del Motor</h2>
                                                <ul className="text-sm text-gray-300 mb-6">
                                                    <li className="mb-2 flex items-center justify-between">
                                                        <span className="font-medium">Combustible</span>
                                                        <span className="text-gray-100">{dataCarDetails?.Sale?.MotorDetails?.FuelType}</span>
                                                    </li>
                                                    <li className="mb-2 flex items-center justify-between">
                                                        <span className="font-medium">Kilometraje</span>
                                                        <span className="text-gray-300">{dataCarDetails?.Sale?.MotorDetails?.Mileage} km</span>
                                                    </li>
                                                    <li className="mb-2 flex items-center justify-between">
                                                        <span className="font-medium">Transmisión</span>
                                                        <span className="text-gray-300">{dataCarDetails?.Sale?.MotorDetails?.Transmition}</span>
                                                    </li>
                                                    <li className="mb-2 flex items-center justify-between">
                                                        <span className="font-medium mr-2">Tracción</span>
                                                        <span className="text-gray-300">{dataCarDetails?.Sale?.MotorDetails?.DriverTrain}</span>
                                                    </li>
                                                    <li className="flex items-center justify-between">
                                                        <span className="font-medium">Power</span>
                                                        <span className="text-gray-300">{dataCarDetails?.Sale?.MotorDetails?.Power} hp</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Dimensiones */}
                                        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                                            <div className="p-1 bg-blue-600"></div>
                                            <div className="p-8">
                                                <h2 className="text-1xl font-bold text-gray-300 mb-4">Dimensiones</h2>
                                                <ul className="text-sm text-gray-300 mb-6">
                                                    <li className="mb-2 flex items-center justify-between">
                                                        <span className="font-medium">Longitud</span>
                                                        <span className="text-gray-300">{dataCarDetails?.Sale?.Dimension?.Longitude} mm</span>
                                                    </li>
                                                    <li className="mb-2 flex items-center justify-between">
                                                        <span className="font-medium">Ancho</span>
                                                        <span className="text-gray-300">{dataCarDetails?.Sale?.Dimension?.Width} mm</span>
                                                    </li>
                                                    <li className="mb-2 flex items-center justify-between">
                                                        <span className="font-medium">Altura</span>
                                                        <span className="text-gray-300">{dataCarDetails?.Sale?.Dimension?.Height} mm</span>
                                                    </li>
                                                    <li className="flex items-center justify-between">
                                                        <span className="font-medium">Volumen de carga</span>
                                                        <span className="text-gray-300">{dataCarDetails?.Sale?.Dimension?.CargoVolume} L</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="">

                                <div className="flex flex-col  ">
                                    <span className="text-2xl text-black dark:text-white">Características de auto</span>
                                    <hr class="w-full h-1 mt-2  bg-gray-300 border-0 rounded  dark:bg-gray-700" />
                                </div>
                                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 text-black dark:text-white ">
                                    {dataCarDetails?.Sale?.Features?.Features.map((feature, index) => (
                                        <div key={index} className="flex items-center">
                                            <svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>

                                            {feature}</div>
                                    ))}
                                </div>

                            </div>


                        </div>
                        <div className=" bg-gray-100 dark:bg-[#12232E] px-4 py-3 sm:px-6 flex align-items justify-end p-4 gap-4 flex-row">
                            {/* Botón para cerrar el modal */}
                            <button
                                onClick={() => setshowDatails(false)}
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 sm:w-auto sm:text-sm"
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>

    );
};

export default DetailsCarModal;
