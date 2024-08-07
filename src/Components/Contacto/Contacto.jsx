import React, { useEffect, useState } from "react";
import CarBackgroud from "../../assets/Contact/CarBackgroud.jpg"
import { TiSocialFacebookCircular } from "react-icons/ti";
import { TiSocialInstagramCircular } from "react-icons/ti";
import { TiSocialTwitterCircular } from "react-icons/ti";

// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

import { FaEdit } from "react-icons/fa";
import { editTituloContact, editUbicacionContact, editGmailContact, editPhoneContact, editTitulotwoContact } from "../../Functions/HomeAdmin/HomeAdmin";

import { useContextCar } from "../../Context/Context";



const mapStyles = {
    height: '300px',
    width: '100%',
};
const defaultCenter = {
    lat: 37.7749,
    lng: -122.4194,
};
const Contacto = () => {

    const { user, WhichRole, GetContact, TituloContact, setTituloContact, UbicacionContact, setUbicacionContact, GmailContact, setGmailContact, PhoneContact, setPhoneContact, TitulotwoContact, setTitulotwoContact } = useContextCar()

    const [TitleContact, setTitleContact] = useState('Encuentranos en')
    const [UbicationContact, setUbicationContact] = useState('#12 Av. Antonio G. San Frac., Duarte, 31000, Rep. Dom.')
    const [Gmail, setGmail] = useState('info@car.com')
    const [Phone, setPhone] = useState('809-333-3333')
    const [TitleTwo, setTitleTwo] = useState('Siguenos en Nuestras Redes Sociales')


    const handleEditTextContact = () => {
        const newTitle = prompt('Edit title home:', TituloContact);
        if (newTitle !== null) {
            editTituloContact(newTitle)
            GetContact(setTituloContact, setUbicacionContact, setGmailContact, setPhoneContact, setTitulotwoContact)
        }
    }
    const handleEditUbicacion = () => {
        const newUbicacion = prompt('Edit ubication home:', UbicacionContact);
        if (newUbicacion !== null) {
            editUbicacionContact(newUbicacion)
            GetContact(setTituloContact, setUbicacionContact, setGmailContact, setPhoneContact, setTitulotwoContact)
        }
    }

    const handleEditGmail = () => {
        const newCorreo = prompt('Edit gmail home:', GmailContact);
        if (newCorreo !== null) {
            editGmailContact(newCorreo)
            GetContact(setTituloContact, setUbicacionContact, setGmailContact, setPhoneContact, setTitulotwoContact)
        }
    }

    const handleEditTelefono = () => {
        const newTelefono = prompt('Edit phone home:', PhoneContact);
        if (newTelefono !== null) {
            editPhoneContact(newTelefono)
            GetContact(setTituloContact, setUbicacionContact, setGmailContact, setPhoneContact, setTitulotwoContact)
        }
    }

    const handleEditTitleTwo = () => {
        const newTituloDos = prompt('Edit title two home:', TitulotwoContact);
        if (newTituloDos !== null) {
            editTitulotwoContact(newTituloDos)
            GetContact(setTituloContact, setUbicacionContact, setGmailContact, setPhoneContact, setTitulotwoContact)
        }
    }
    const [isOpenEditImg, setisOpenEditImg] = useState(false)

    const handleOpenEditImage = () => {
        setisOpenEditImg(!isOpenEditImg)
    }


    return (
        <div className="relative w-full min-h-[768px] mt-20 max-md:mt-10 max-md:max-w-full">


            <div className="absolute inset-0 bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${CarBackgroud})`, filter: 'blur(2px)' }}>

            </div>



            <div className="absolute inset-0 bg-black opacity-50"></div>



            <div className="relative flex flex-col justify-center items-center px-16 py-1 h-full w-full max-md:px-5">
                {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (

                    <div className="px-3 py-2   text-xs leading-4">
                        <button onClick={() => handleOpenEditImage()} className=" flex px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                            <FaEdit size={14} className="text-yellow-400 " />
                            <div className="mx-2 text-yellow-500">Editar Fondo</div>
                        </button>
                    </div>
                )}
                <div className="relative flex flex-col justify-center items-center px-16 py-1 h-full w-full max-md:px-5">

                    <div className="bg-transparent mt-10 relative w-full max-w-[1226px] max-md:max-w-full">
                        <h1 className="text-3xl text-white font-bold"> Contáctanos</h1>
                        <hr />

                        <div className="bg-transparent mt-6 brightness-105 z-50  gap-5 max-md:flex-col max-md:gap-0 ">



                            {/*                            
                                <LoadScript googleMapsApiKey="AIzaSyCQuMGa2ltQrJMrqUYJUaS48CYZcgfPNO8">
                                    <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter} />
                                </LoadScript>  */}

                            <div className=" mt-20  md:flex justify-center gap-28  ">


                                <div className="  text-white text-center font-bold flex justify-between gap-12">

                                    <div className="ext-2xl font-bold">
                                        <h2 className=" text-2xl font-bold">Encuéntranos</h2>

                                        <div className='mt-5'>
                                            <div className="w-56">
                                                {UbicacionContact}
                                            </div>

                                            {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                                                <div className="px-3 py-2 text-xs">
                                                    <button onClick={() => handleEditUbicacion()} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                                        <FaEdit size={14} className="text-yellow-400" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/*  <div className='flex mt-5 text-lg'>
                                            #12 Av. Antonio G., San Frac., <br /> Duarte, 31000, Rep. Domicana
                                        </div> */}

                                    </div>

                                    <div className="">
                                        <div className=' text-lg'>
                                            SERVICIO AL CLIENTE
                                        </div>

                                        <div className="flex justify-between mt-5 gap-8">


                                            <div className="">
                                                <div className=' text-lg'>
                                                    Correo
                                                </div>
                                                <div className='mb-4'>
                                                    {GmailContact}
                                                    {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                                                        <div className="px-3 py-2   text-xs leading-4">
                                                            <button onClick={() => handleEditGmail()} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                                                <FaEdit size={14} className="text-yellow-400" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* <div className=' text-lg'>
                                                    info@car.com
                                                </div> */}
                                            </div>

                                            <div>
                                                <div className=' text-lg'>
                                                    Teléfono
                                                </div>
                                                <div className='mb-4'>
                                                    {PhoneContact}
                                                    {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                                                        <div className="px-3 py-2   text-xs leading-4">
                                                            <button onClick={() => handleEditTelefono()} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                                                <FaEdit size={14} className="text-yellow-400" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                {/* <div className=' text-lg'>
                                                    588-865-3730
                                                </div> */}
                                            </div>
                                        </div>



                                    </div>


                                </div>

                                <div>
                                    <h2 className=" text-white text-2xl font-bold text-center -mt-2 ">Siguenos en nuestras <br /> Redes Sociales</h2>
                                    <div className=" flex m-auto mt-5 items-center justify-center gap-8 w-full">
                                        <div className=" flex flex-col items-center ">
                                           
                                            <div className="hover:rotate-[360deg] hover:scale-125 hover:transition-all transition-all">
                                                 <TiSocialFacebookCircular size={54} className="text-white bg-[#3b5999] rounded-full" />
                                            </div>
                                            {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                                                <div className="px-3 py-2   text-xs leading-4">
                                                    <button onClick={() => handleOpenEditImage()} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                                        <FaEdit size={14} className="text-yellow-400" />
                                                    </button>
                                                </div>
                                            )}

                                        </div>
                                        <div className=" flex flex-col items-center">
                                            <div className="hover:rotate-[360deg] hover:scale-125 hover:transition-all transition-all">
                                                 < TiSocialInstagramCircular size={54} className=" text-white  bg-[#e4405f]  rounded-full " />
                                                 <div className="">

                                                 </div>
                                            </div>
                                            {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                                                <div className="px-3 py-2   text-xs leading-4">
                                                    <button onClick={() => handleOpenEditImage()} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                                        <FaEdit size={14} className="text-yellow-400" />
                                                    </button>
                                                </div>
                                            )}
                                           
                                           
                                        </div>
                                        
                                        <div className=" flex flex-col items-center">
                                        
                                            <div className="hover:rotate-[360deg] hover:scale-125 hover:transition-all transition-all">
                                                 <TiSocialTwitterCircular size={54} className="text-white bg-[#55acee] rounded-full" />
                                            </div>
                                            {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                                                <div className="px-3 py-2   text-xs leading-4">
                                                    <button onClick={() => handleOpenEditImage()} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                                        <FaEdit size={14} className="text-yellow-400" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>


    );

}
export default Contacto;
