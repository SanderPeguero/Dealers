import React from "react";
import { useState } from "react";
import { useContextCar } from '../../Context/Context'

const ProductDetails = () => {
    const { CarAvailable, Formatnumber, ReservaCar } = useContextCar()
    const [isOpen, setIosOpen] = useState(false);

    const [nameUser, setNameUser] = useState('');
    const [emailUser, setEmailUser] = useState('');
    const [phoneUser, setPhoneUser] = useState('');

    const currentDate = new Date();
    const ReservationDate = currentDate.toLocaleString();

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
                ReservationDate
            },
            informationVehicle: {
                Titulo: CarAvailable.Sale.DetalleCoche.Titulo,
                marca: CarAvailable.Sale.DetalleCoche.Marca,
                modelo: CarAvailable.Sale.DetalleCoche.Modelo,
                condicion: CarAvailable.Sale.DetalleCoche.Condicion,
                precio: CarAvailable.Sale.Precio.Precio
            }
        };
        // Llamar a la función ReservaCar con los datos de la reserva
        await ReservaCar(reservationData);
        setIosOpen(true);
    };


    const [selectedImage, setSelectedImage] = useState(null);


    return (

        <div className=' bg-zinc-950 '>
            <div className=" text-white flex flex-col justify-center items-start px-16 py-14 w-full bg-zinc-950 max-md:px-5 max-md:max-w-full  ">
                <div className="flex flex-col ml-16 max-md:max-w-full">
                    <div className="text-5xl max-md:max-w-full max-md:text-4xl">
                        {CarAvailable?.Sale?.DetalleCoche?.Titulo}
                    </div>
                </div>
            </div>


            {/* <div className="grid grid-cols-6 mx-20  ">

                {CarAvailable?.Sale?.Multimedia.Imagen.map((Image, index) => (
                    <div key={index} className="w-64 mt-10 ">
                        <img
                            className="rounded-t-lg w-56 p-2 cursor-pointer"
                            src={Image}
                            alt={`Image ${index}`}
                            onClick={() => setSelectedImage(Image)}
                        />
                    </div>
                ))}

                {selectedImage && (
                    <div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
                        onClick={() => setSelectedImage(null)}
                    >
                        <img
                            src={selectedImage}
                            alt="Enlarged view"
                            className="w-full max-w-3xl h-auto"
                            onClick={(e) => e.stopPropagation()} 
                        />
                    </div>
                )}


            </div> */}

            <div className="mx-5 md:mx-10 lg:mx-20 ">
                <div className="block md:hidden">
                    {CarAvailable?.Sale?.Multimedia.Imagen.length > 0 && (
                        <div className="w-full mt-10">
                            <img
                                className="rounded-t-lg w-full h-auto p-2 cursor-pointer"
                                src={CarAvailable.Sale.Multimedia.Imagen[0]}
                                alt={`Image 0`}
                                onClick={() => setSelectedImage(CarAvailable.Sale.Multimedia.Imagen[0])}
                            />
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                    {CarAvailable?.Sale?.Multimedia.Imagen.slice(1).map((Image, index) => (
                        <div key={index} className="w-full mt-10">
                            <img
                                className="rounded-t-lg w-full h-auto p-2 cursor-pointer"
                                src={Image}
                                alt={`Image ${index + 1}`}
                                onClick={() => setSelectedImage(Image)}
                            />
                        </div>
                    ))}
                </div>

                {selectedImage && (
                    <div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 "
                        onClick={() => setSelectedImage(null)}
                    >
                        <img
                            src={selectedImage}
                            alt="Enlarged view"
                            className="w-full max-w-3xl h-auto"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )}
            </div>




            <div className="mx-2 p-5 flex flex-col self-stretch py-20 mt-3 font-semibold text-white bg-[#0B0C10] max-w-full justify-center md:pl-5 md:mt-10">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:flex-col">
                    <div className="mx-2">

                        <div className="flex flex-col grow mt-1.5 max-md:mt-10 max-md:max-w-full">
                            <div className="text-2xl font-bold text-zinc-300 max-md:max-w-full">
                                Descripción
                            </div>
                            <div className="mt-5 text-base bg-clip-text max-md:max-w-full">
                                {CarAvailable?.Sale?.DetalleCoche?.Descripcion}

                            </div>

                            <div className="mt-16 text-2xl font-bold text-zinc-300 max-md:mt-10 max-md:max-w-full">
                                Característica
                            </div>

                            {/* grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-white */}
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 text-white ">
                                {CarAvailable?.Sale?.Features?.Features.map((feature, index) => (
                                    <div key={index} className="flex">
                                        <svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                        </svg>

                                        {feature}</div>
                                ))}
                            </div>

                            <div className="flex flex-col ml-5 max-md:ml-0 max-md:w-full">
                                <div className="mt-24  text-base font-medium text-white max-md:mt-10 max-md:max-w-full">

                                    <div className='text-2xl'>
                                        Hacer reserva
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

                                </div>

                                {/* Tu contenido del componente aquí */}
                                <button
                                    className="justify-center py-4 mt-16 text-xl text-white whitespace-nowrap rounded-lg bg-sky-600 hover:bg-sky-400 bg-opacity-60 max-md:px-5 max-md:mt-10"
                                    onClick={handleReservationClick}>Reservar</button>

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
                                                    onClick={() => setIosOpen(false)}>
                                                    Cerrar
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }


                            </div>


                        </div>

                    </div>

                    <div className=" m-6 md:m-12 lg:m-24 my-24 md:my-48 -lg:my-96 ">
                        <div className="max-w-sm p-6  mx-auto text-center text-sky-600 text-2xl border border-sky-600  rounded-lg">
                            ${Formatnumber(CarAvailable?.Sale?.Precio?.Precio)}
                        </div>

                        <div className="flex flex-col p-6 mt-12  w-full bg-gray-900 rounded max-md:px-5 max-md:mt-10">
                            <div className="text-xl font-bold text-white">Detalles del auto</div>
                            <div className="flex gap-5 justify-between py-1.5 mt-5 whitespace-nowrap">
                                <div className="text-base font-medium text-neutral-400">Marca</div>
                                <div className="text-lg text-right text-white">{CarAvailable?.Sale?.DetalleCoche?.Marca}</div>
                            </div>
                            <div className="flex gap-5 justify-between py-1.5 mt-2">
                                <div className="text-base font-medium text-neutral-400">Modelo</div>
                                <div className="text-lg text-right text-white">{CarAvailable?.Sale?.DetalleCoche?.Modelo}</div>
                            </div>
                            <div className="flex gap-5 justify-between py-1.5 mt-2 whitespace-nowrap">
                                <div className="text-base font-medium text-neutral-400">Condición</div>
                                <div className="text-lg text-right text-white">{CarAvailable?.Sale?.DetalleCoche?.Condicion}</div>
                            </div>
                            <div className="flex gap-5 justify-between py-1.5 mt-2 whitespace-nowrap">
                                <div className="text-base font-medium text-neutral-400">Año</div>
                                <div className="text-lg text-right text-white">{CarAvailable?.Sale?.DetalleCoche?.Year}</div>
                            </div>
                            <div className="flex gap-5 justify-between py-1 mt-2 whitespace-nowrap">
                                <div className="self-start text-base font-medium text-neutral-400">
                                    Tipo de Cuerpo
                                </div>
                                <div className="text-lg text-right text-white">{CarAvailable?.Sale?.DetalleCoche?.TipoCuerpo}</div>
                            </div>
                            <div className="flex gap-5 justify-between py-1 mt-2">
                                <div className="text-base font-medium text-neutral-400">Asientos</div>
                                <div className="text-lg text-right text-white"> {CarAvailable?.Sale?.DetalleCoche?.Capacidad} Personas</div>
                            </div>
                            <div className="flex gap-5 justify-between py-1.5 mt-2">
                                <div className="text-base font-medium text-neutral-400">
                                    Color exterior
                                </div>
                                <div className="text-lg text-right text-white">{CarAvailable?.Sale?.DetalleCoche?.Color}</div>

                            </div>
                            <hr class="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />

                            <div className="mt-1 text-xl font-bold text-white max-md:mt-10">
                                Motor
                            </div>
                            <div className="flex gap-5 justify-between py-1.5 mt-5 whitespace-nowrap">
                                <div className="text-base font-medium text-neutral-400">
                                    Combustible
                                </div>
                                <div className="text-lg text-right text-white">{CarAvailable?.Sale?.DetalleMotor?.TipoCombustimble}</div>
                            </div>
                            <div className="flex gap-5 justify-between py-1 mt-2">
                                <div className="text-base font-medium text-neutral-400">
                                    Kilometraje
                                </div>
                                <div className="text-lg text-right text-white">{CarAvailable?.Sale?.DetalleMotor?.Kilometraje} km</div>
                            </div>
                            <div className="flex gap-5 justify-between py-1.5 mt-2 whitespace-nowrap">
                                <div className="text-base font-medium text-neutral-400">
                                    Transmisión
                                    <br />
                                </div>
                                <div className="text-lg text-right text-white">{CarAvailable?.Sale?.DetalleMotor?.Transmision}</div>
                            </div>
                            <div className="flex gap-5 justify-between py-1.5 mt-2">
                                <div className="text-base font-medium text-neutral-400">
                                    Tracción
                                    <br />
                                </div>
                                <div className="text-lg text-right text-white">
                                    {CarAvailable?.Sale?.DetalleMotor?.DriverTrain}
                                    <br />
                                </div>
                            </div>
                            <div className="flex gap-5 py-1 mt-2">
                                <div className="my-auto text-base font-medium text-neutral-400">
                                    Power
                                </div>
                                <div className="flex-auto text-lg text-right text-white">
                                    {CarAvailable?.Sale?.DetalleMotor?.CapacidadMotor} hp
                                </div>
                            </div>

                            <hr class="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />

                            <div className="mt-1 text-xl font-bold text-white max-md:mt-10">
                                Dimensión
                                <br />
                            </div>
                            <div className="flex gap-5 justify-between py-1">
                                <div className="text-base font-medium text-neutral-400">
                                    Longitud
                                    <br />
                                </div>
                                <div className="text-lg text-right text-white">{CarAvailable?.Sale?.Dimension?.Longitud} mm</div>
                            </div>
                            <div className="flex gap-5 justify-between py-1.5 mt-2">
                                <div className="text-base font-medium text-neutral-400">
                                    Ancho
                                    <br />
                                </div>
                                <div className="text-lg text-right text-white">{CarAvailable?.Sale?.Dimension?.Ancho} mm</div>
                            </div>
                            <div className="flex gap-5 justify-between py-1.5 mt-2">
                                <div className="text-base font-medium text-neutral-400">Altura</div>
                                <div className="text-lg text-right text-white">{CarAvailable?.Sale?.Dimension?.Altura} mm</div>
                            </div>
                            <div className="flex gap-5 justify-between py-1 mt-2">
                                <div className="flex-auto text-base font-medium text-neutral-400">
                                    Volumen de carga
                                </div>
                                <div className="text-lg text-right text-white">{CarAvailable?.Sale?.Dimension?.VolumenCarga} L</div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ProductDetails;