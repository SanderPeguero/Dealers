import React, { useEffect, useState } from "react";
import CarBackgroud from "../../assets/Contact/CarBackgroud.jpg"
import { TiSocialFacebookCircular } from "react-icons/ti";
import { TiSocialInstagramCircular } from "react-icons/ti";
import { TiSocialTwitterCircular } from "react-icons/ti";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaTiktok } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

import facebooktwo from "../../assets/img/facebooktwo.png"
import instagramtwo from "../../assets/img/instagramtwo.png"
import twitter from "../../assets/img/twitter.png"

// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import SocialMediaModal from './SocialMediaModal';

import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { editTituloContact, deleteSocialMedia, editUbicacionContact, editGmailContact, editPhoneContact, editTitulotwoContact, updateSocialMediaLinks } from "../../Functions/HomeAdmin/HomeAdmin";

import { useContextCar } from "../../Context/Context";
import { ImagenRedSocial } from "../../Functions/HomeAdmin/HomeAdmin";
import EditSocialMedia from "./ModalEdit";
import AddSocialMedia from "./AddSocialMedia";


const mapStyles = {
    height: '300px',
    width: '100%',
};
const defaultCenter = {
    lat: 37.7749,
    lng: -122.4194,
};
const Contacto = () => {

    const { user, WhichRole, GetContact, setCheckContact, TituloContact, setTituloContact, UbicacionContact, setUbicacionContact,
        GmailContact, setGmailContact, PhoneContact, setPhoneContact, TitulotwoContact, setTitulotwoContact, setSocialnetworks, Socialnetworks } = useContextCar()

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
        // setisOpenEditImg(!isOpenEditImg)
        // ImagenRedSocial()
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [socialLinks, setSocialLinks] = useState({});
    const [isOpenEditModal, setisOpenEditModal] = useState(false)
    const [SocialEdit, setSocialEdit] = useState({})

    useEffect(() => {
        // Recuperar los enlaces guardados de Firebase al montar el componente
        const fetchSocialLinks = async () => {
            try {

                const savedLinks = JSON.parse(localStorage.getItem('socialLinks')) || {};
                setSocialLinks(savedLinks);
            } catch (error) {

            }
        };
        fetchSocialLinks();
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [IndexEdit, setIndexEdit] = useState(0)

    const OpenModalEdit = (datos, index) => {
        setisOpenEditModal(true)
        setSocialEdit(datos)
        setIndexEdit(index)
    }

    const CloseModalEdit = () => {
        setisOpenEditModal(false)
    }

    const handleSave = async (updatedLinks) => {
        try {
            await updateSocialMediaLinks(updatedLinks);
            setSocialLinks(updatedLinks);
            localStorage.setItem('socialLinks', JSON.stringify(updatedLinks));
        } catch (error) {

        }
    };

    const HandledeleteSocial = async (index) => {
        const confir = window.confirm("Esta seguro que quiere eliminar la red social?")
        if (confir) {
            await deleteSocialMedia(index)
            setCheckContact(true)
        }
    }

    const limitedSocialLinks = Object.keys(socialLinks).slice(0, 3);

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

                        <div className="bg-transparent mt-6 brightness-105 z-50  gap-5 max-md:flex-col max-md:gap-0">


                            <div className=" mt-20 md:flex md:justify-center md:gap-28 sm:gap-12 ">


                                <div className="text-white text-center font-bold flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-12">

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
                                            </div>
                                        </div>

                                    </div>


                                </div>

                                {/* <div className="">
                                    <h2 className="text-white text-2xl font-bold text-center -mt-2">Síguenos en nuestras <br /> Redes Sociales</h2>


                                    <SocialMediaModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />

                                    <div className="mt-5">
                                        <div className="flex m-auto  items-center justify-center gap-8 w-full">


                                            <div className="cursor-pointer" onClick={openModal} >
                                                <IoAddCircleOutline size={54} className="text-white bg-transparent rounded-full" />
                                            </div>

                                            {Object.keys(socialLinks).map((social) => (
                                                socialLinks[social] && (
                                                    <div key={social} className="grid grid-cols-2 gap-4 md:grid-cols-1">
                                                        {social === 'facebook' && (
                                                            <a href={socialLinks[social]} target="_blank" rel="noopener noreferrer">
                                                                <TiSocialFacebookCircular size={54} className="text-white bg-[#3b5999] rounded-full" />
                                                            </a>
                                                        )}
                                                        {social === 'instagram' && (
                                                            <a href={socialLinks[social]} target="_blank" rel="noopener noreferrer">
                                                                <TiSocialInstagramCircular size={54} className="text-white bg-[#e4405f] rounded-full" />
                                                            </a>
                                                        )}
                                                        {social === 'twitter' && (
                                                            <a href={socialLinks[social]} target="_blank" rel="noopener noreferrer">
                                                                <TiSocialTwitterCircular size={54} className="text-white bg-[#55acee] rounded-full" />
                                                            </a>
                                                        )}
                                                        {social === 'tiktok' && (
                                                            <a href={socialLinks[social]} target="_blank" rel="noopener noreferrer">
                                                                <FaTiktok size={54} className="text-white bg-[#ff0050] rounded-full" />
                                                            </a>
                                                        )}
                                                        {social === 'youtube' && (
                                                            <a href={socialLinks[social]} target="_blank" rel="noopener noreferrer">
                                                                <FaYoutube size={54} className="text-white bg-red-700 rounded-full" />
                                                            </a>
                                                        )}
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                </div> */}


                                <div className="">
                                    <h2 className="text-white text-2xl font-bold text-center ">
                                        Síguenos en nuestras <br /> Redes Sociales
                                    </h2>

                                    <AddSocialMedia isOpen={isModalOpen} onClose={closeModal} />
                                    <EditSocialMedia isOpen={isOpenEditModal} onClose={CloseModalEdit} datos={SocialEdit} index={IndexEdit} />

                                    <div className="flex flex-col items-center">

                                        <div className="mt-4 flex flex-wrap justify-center gap-4">
                                            <div className=" flex items-center justify-center">
                                                {Socialnetworks.map((social, index) => (
                                                    <div key={index} className="flex flex-col mr-4 ">
                                                        {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                                                            <div className="px-3 py-2   text-xs leading-4">
                                                                <button onClick={() => OpenModalEdit(social, index)} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                                                    <FaEdit size={14} className="text-yellow-400" />
                                                                </button>
                                                            </div>
                                                        )}
                                                        <div className="">
                                                            {/* <a href=""><img className="w-16 duration-200 rounded-full" src={social?.UrlImgRedSocial} alt="Facebook" /></a> */}
                                                            <a href={social?.UrlRedSocial} target="_blank" rel="noopener noreferrer">
                                                                <img className="w-16 duration-200 rounded-full" src={social?.UrlImgRedSocial} alt="Facebook" />
                                                            </a>
                                                        </div>
                                                        {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                                                            <div className="px-3 py-2   text-xs leading-4">
                                                                <button onClick={() => HandledeleteSocial(index)} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-red-400 hover:text-white focus:outline-none">
                                                                    <FaTrash size={14} className="text-red-600" />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                                )}

                                                {/* <div className="flex flex-col mr-4">
                                                    {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                                                        <div className="px-3 py-2   text-xs leading-4">
                                                            <button onClick={() => OpenModalEdit(Socialnetworks?.Facebook)} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                                                <FaEdit size={14} className="text-yellow-400" />
                                                            </button>
                                                        </div>
                                                    )}
                                                    <div className="">
                                                        <a href="#"><img className="w-16 duration-200" src={Socialnetworks?.Facebook?.UrlImgRedSocial} alt="Facebook" /></a>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col mr-4">
                                                    {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                                                        <div className="px-3 py-2   text-xs leading-4">
                                                            <button className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                                                <FaEdit size={14} className="text-yellow-400" />
                                                            </button>
                                                        </div>
                                                    )}
                                                    <div className="">
                                                        <a href="#"><img className="w-16" src={Socialnetworks?.Instagram?.UrlImgRedSocial} alt="Instagram" /></a>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col">
                                                    {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                                                        <div className="px-3 py-2   text-xs leading-4">
                                                            <button className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                                                <FaEdit size={14} className="text-yellow-400" />
                                                            </button>
                                                        </div>
                                                    )}

                                                    <div className="">
                                                        <a href="#"><img className=" w-16" src={Socialnetworks?.Twitter?.UrlImgRedSocial} alt="Twitter" /></a>
                                                    </div>
                                                </div> */}

                                            </div>


                                            {/*  {Object.keys(socialLinks).map((social) => (
                                               socialLinks[social] && (
                                                    <div key={social} className="flex items-center justify-center">
                                                        {social === 'facebook' && (
                                                            <a href={socialLinks[social]} target="_blank" rel="noopener noreferrer">
                                                                <TiSocialFacebookCircular size={54} className="text-white bg-[#3b5999] rounded-full transition-transform transform hover:scale-110" />
                                                            </a>
                                                        )}
                                                        {social === 'instagram' && (
                                                            <a href={socialLinks[social]} target="_blank" rel="noopener noreferrer">
                                                                <TiSocialInstagramCircular size={54} className="text-white bg-[#e4405f] rounded-full transition-transform transform hover:scale-110" />
                                                            </a>
                                                        )}
                                                        {social === 'twitter' && (
                                                            <a href={socialLinks[social]} target="_blank" rel="noopener noreferrer">
                                                                <TiSocialTwitterCircular size={54} className="text-white bg-[#55acee] rounded-full transition-transform transform hover:scale-110" />
                                                            </a>
                                                        )}
                                                        {social === 'tiktok' && (
                                                            <a href={socialLinks[social]} target="_blank" rel="noopener noreferrer">
                                                                <FaTiktok size={54} className="text-white bg-[#ff0050] rounded-full transition-transform transform hover:scale-110" />
                                                            </a>
                                                        )}
                                                        {social === 'youtube' && (
                                                            <a href={socialLinks[social]} target="_blank" rel="noopener noreferrer">
                                                                <FaYoutube size={54} className="text-white bg-red-700 rounded-full transition-transform transform hover:scale-110" />
                                                            </a>
                                                        )}
                                                   
                                                    </div>
                                                )
                                            ))}*/}
                                        </div>

                                        {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (

                                            <div className="cursor-pointer mt-4" onClick={openModal} >
                                                <IoAddCircleOutline size={54} className="text-white bg-transparent rounded-full" />
                                            </div>
                                        )}
                                    </div>

                                    {/* {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (

                                        <div className="flex items-center justify-center gap-6 sm:gap-8">
                                            <div className="cursor-pointer" onClick={openModal}>
                                                <IoAddCircleOutline size={54} className="text-white bg-transparent rounded-full transition-transform transform hover:scale-110" />
                                            </div>
                                        </div>
                                    )} */}

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
