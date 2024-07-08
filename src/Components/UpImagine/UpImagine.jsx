
import React, { useState, useEffect, useMemo } from 'react';
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { useContextCar } from '../../Context/Context';

const UpImagine = ({ AudiovisualDatos }) => {

    const { SaveMedia, user, CarEdit } = useContextCar()
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

        if (mediaType === 'image') {
            if (LinkUrl) {
                AudiovisualDatos.Imagen = LinkUrl
            }
        }
    }, [LinkUrl])



    const imageView = useMemo(() => {
        if (CarEdit && CarEdit.LinkUrl) {
            return CarEdit.LinkUrl;
        }
        return '';
    }, [CarEdit]);

    // {imageView}

    return (


        <div className='bg-[#071620] rounded-lg  text-white  m-10'>
            <div className='flex flex-row'>
                <div className='ml-8 mr-8 mt-8'>
                    <div className='text-left'>
                        <h3 className='underline text-2xl'>Imágenes y video</h3>
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
        </div>


    )


}

export default UpImagine;