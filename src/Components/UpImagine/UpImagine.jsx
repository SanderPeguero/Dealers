import React, { useState, useEffect, useMemo } from 'react';
import { useContextCar } from '../../Context/Context';

const UpImagine = ({ AudiovisualDatos }) => {
    const { SaveMedia, user, CarEdit, isOpenImagen, setisOpenImagen, handleSiguiente, handleAnterior } = useContextCar();
    const [media, setMedia] = useState([]);
    const [LinkUrl, setLinkUrl] = useState([]);
    const [showExitWarning, setShowExitWarning] = useState(false);

    // Maneja la selección de archivos y actualiza el estado
    const handleMediaChange = (e) => {
        const files = Array.from(e.target.files);
        const newLinkUrls = [];
        const newMedia = [];

        files.forEach(file => {
            if (file.type.startsWith('image')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newLinkUrls.push(reader.result);
                    newMedia.push(file);
                    if (newMedia.length === files.length) {
                        setLinkUrl(prevLinkUrl => [...prevLinkUrl, ...newLinkUrls]);
                        setMedia(prevMedia => [...prevMedia, ...newMedia]);
                    }
                };
                reader.readAsDataURL(file);
            } else {
                alert("Debes Agregar Archivos Tipo Imagen");
            }
        });
    };

    // Maneja la eliminación de una imagen específica
    const handleRemoveMedia = (index) => {
        const newLinkUrl = LinkUrl.filter((_, i) => i !== index);
        const newMedia = media.filter((_, i) => i !== index);

        setLinkUrl(newLinkUrl);
        setMedia(newMedia);
    };

    // Actualiza AudiovisualDatos con las imágenes seleccionadas
    useEffect(() => {
        if (LinkUrl.length > 0) {
            AudiovisualDatos.Imagen = LinkUrl;
        }
    }, [LinkUrl]);

    // Controla el desbordamiento del cuerpo del documento
    useEffect(() => {
        document.body.style.overflow = isOpenImagen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpenImagen]);

    // Maneja el cierre del modal con advertencia si hay imágenes cargadas
    const handleCloseImagen = () => {
        if (LinkUrl.length > 0) {
            setShowExitWarning(true);
        } else {
            setisOpenImagen(false);
        }
    };

    // Confirmar el cierre del modal y limpiar datos
    const confirmExit = () => {
        setisOpenImagen(false);
        setLinkUrl([]);
        setMedia([]);
        setShowExitWarning(false);
    };

    // Cancelar el cierre del modal
    const cancelExit = () => {
        setShowExitWarning(false);
    };

    // Validar si hay imágenes cargadas
    const validateImagen = () => {
        return LinkUrl.length > 0;
    };

    return (
        <>
            {isOpenImagen && (
                <div className='fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center'>
                    <div className='bg-[#071620] rounded-lg text-white p-6 max-w-5xl w-full h-[90vh] flex flex-col'>
                        <div className='flex justify-between items-center mb-4'>
                            <h3 className='text-2xl'>Imágenes</h3>
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

                        <div className='mb-4 flex-grow overflow-y-auto'>
                            <div className='mb-6'>
                                <label className='block text-sm mb-2'>Sube tus Imágenes</label>
                                <div className='relative bg-black rounded-lg border mt-2 border-gray-500 h-[12rem] w-full max-w-xs bg-clip-content border-dashed flex items-center justify-center'>
                                    <label htmlFor='file-upload-1' className='cursor-pointer flex flex-col items-center'>
                                        <input onChange={handleMediaChange} id='file-upload-1' type='file' multiple className='hidden' />
                                        <span className='text-4xl text-gray-400'>+</span>
                                    </label>
                                </div>
                            </div>

                            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                                {LinkUrl.map((link, index) => (
                                    <div key={index} className='relative'>
                                        <img
                                            src={link}
                                            alt='Uploaded'
                                            className='object-cover rounded-lg w-full h-40'
                                        />
                                        <button
                                            onClick={() => handleRemoveMedia(index)}
                                            className='absolute top-2 right-2 text-white text-xs bg-red-700 bg-opacity-50 px-2 py-1 rounded'
                                        >
                                            Borrar
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <button onClick={handleAnterior} className='hover:bg-blue-600 p-2 rounded-md transition-all'>Anterior</button>
                            <button onClick={() => handleSiguiente(validateImagen)} className='hover:bg-blue-600 p-2 rounded-md transition-all'>Siguiente</button>
                        </div>
                    </div>
                </div>
            )}

            {showExitWarning && (
                <div className='fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm'>
                    <div className='bg-white rounded-lg shadow-lg p-8'>
                        <h2 className='text-lg font-semibold mb-4'>¿Estás seguro de querer salir?</h2>
                        <p className='mb-6'>Se perderán todos los datos no guardados.</p>
                        <div className='flex justify-end'>
                            <button onClick={cancelExit} className='mr-4 px-4 py-2 bg-gray-200 rounded'>Cancelar</button>
                            <button onClick={confirmExit} className='px-4 py-2 bg-red-600 text-white rounded'>Salir</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UpImagine;
