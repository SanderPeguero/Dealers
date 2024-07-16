
import React, { useState, useEffect, useMemo } from 'react';
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { useContextCar } from '../../Context/Context';

const UpImagine = ({ AudiovisualDatos }) => {

    const { SaveMedia, user, CarEdit, isOpenImagen, setisOpenImagen, handleSiguiente, handleAnterior } = useContextCar()
    const [media, setMedia] = useState(null);
    const [mediaType, setMediaType] = useState(null);
    const [Enlace, setEnlace] = useState(null)

    // Esto debe ser un areglo
    const [LinkUrl, setLinkUrl] = useState([])

    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        if (file) {

            const reader = new FileReader();
            reader.onloadend = () => {
                // setMedia(reader.result);
                if (file.type.startsWith('image')) {
                    setMediaType('LinkUrl');
                    SaveMedia(file, user.uid, LinkUrl, setLinkUrl)
                } else {
                    setMediaType(null);
                    alert("Debes agregar un archivo tipo imagen");


                }
            };
            reader.readAsDataURL(file);
        }
    }

    const handleRemoveMedia = () => {
        setMedia(null);
        setMediaType(null);
    };

    const CarDetailsdatos = useMemo(() => ({
        Titulo: LinkUrl,

    }), [LinkUrl]);
    useEffect(() => {
        // console.log(LinkUrl)

            if (LinkUrl) {
                AudiovisualDatos.Imagen = LinkUrl
            }
   
    }, [LinkUrl])

    const imageView = useMemo(() => {
        if (CarEdit && CarEdit.LinkUrl) {
            return CarEdit.LinkUrl;
        }
        return '';
    }, [CarEdit]);

    // {imageView}

    useEffect(() => {
        if (isOpenImagen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpenImagen])

    const handleCloseImagen = () => {
        setisOpenImagen(!isOpenImagen)
    }

    const validateImagen = () => {
        if ( !LinkUrl) {
            return false
        }
        return true;
    };


    return (

        <>
            {isOpenImagen &&
                <div className='fixed  inset-0  backdrop-blur-md z-50'>
                    <div className='bg-[#071620] rounded-lg  text-white  m-10'>
                        <div className='flex flex-row'>
                            <div className='ml-8 mr-8 mt-8'>
                                <div className='text-left flex items-center cursor-pointer justify-between ' >
                                    <h3 className=' text-2xl'>Imagenes</h3>

                                    <div className='mt-4'>
                                        <button
                                            onClick={handleCloseImagen}
                                            className='text-gray-500 hover:text-white hover:bg-red-600 hover:rounded-full p-2 focus:outline-none'
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className='mt-8'>
                                    <form className='max-w-full'>
                                        <div>
                                            <div className='grid gap-6 mb-6 lg:grid-cols-1'>
                                                <div className='mb-4'>
                                                    <label className='text-sm'>Sube tu Imagen/Video</label>

                                                    <div className="bg-black rounded-lg border mt-2 border-gray-500 h-[12rem] w-[12rem] bg-clip-content border-dashed flex"

                                                        style={{
                                                            position: 'relative'
                                                        }}
                                                    >
                                                        {/* {mediaType === 'image' && (
                                                // qUE SE MUESTRE EN CADA IMAGENE QUE SE SUBA
                                                <img src={media} alt="Uploaded" className='object-cover h-full w-full rounded-lg' />
                                            )} */}
                                                        {/* {mediaType === 'video' && (
                                        <video src={media} controls className='h-full w-full rounded-lg'></video>
                                    )} */}
                                                        {media && (
                                                            <button onClick={handleRemoveMedia} className='absolute top-2 right-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded'>Borrar</button>
                                                        )}
                                                        {!media && (
                                                            <div className='flex items-center justify-center w-full h-full'>
                                                                <label htmlFor={`file-upload-1`} className='px-3 py-2 text-right text-xs leading-4 cursor-pointer'>
                                                                    <div className='text-white px-4 py-2 rounded-full text-center'>
                                                                        <input onChange={handleMediaChange} id={`file-upload-1`} type="file" className="hidden" />
                                                                        <span className='text-4xl '>+</span>
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        )}
                                                    </div>

                                                </div>
                                                {/* <div className='mb-4 grid gap-6 lg:grid-cols-1 w-full'>
                                <div className='mb-8'>
                                    <label className='block mb-2 text-sm font-medium text-white'>Enlace para el video</label>
                                    <input type='text' className='bg-[#12232E] text-sm block w-full p-2.5' onChange={(e) => setEnlace(e.target.value)} required />
                                </div>
                            </div> */}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className='grid grid-cols-4 gap-4 '>
                                {
                                    LinkUrl.map((link, index) => (

                                        <img

                                            key={index}
                                            src={link}
                                            alt="Uploaded"
                                            className='object-cover mb-4 grid gap-6 lg:grid-cols-2 mt-6 rounded-lg mx-24 ' />
                                    ))
                                }
                            </div>
                        </div>
                        <div className='text-left flex justify-between  items-center ' >
                            <button onClick={handleAnterior} className='items-center ml-4 hover:bg-blue-600 p-2 hover:rounded-md mb-4'>Anterior</button>

                            <button onClick={() => handleSiguiente(validateImagen)}
                                className='items-center mr-4 hover:bg-blue-600 p-2 hover:rounded-md'>Siguiente</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )


}

export default UpImagine;