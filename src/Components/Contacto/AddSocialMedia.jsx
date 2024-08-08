import React, { useState } from 'react';
import { AgregarRedSocial, uploadImageRedSocial } from '../../Functions/HomeAdmin/HomeAdmin';
import { useContextCar } from '../../Context/Context';
const AddSocialMedia = ({ isOpen, onClose }) => {
    const {setCheckContact} = useContextCar()
    const [UrlPerfil, setUrlPerfil] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    if (!isOpen) return null;

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setImageUrl(url);
        }
    };

    const handleRemoveImage = () => {
        setSelectedFile(null);
        setImageUrl('');
    };

    const handleSaveRed = async () => {

        if (selectedFile) {
            const fileUrl = await uploadImageRedSocial(selectedFile);
            if (fileUrl) {
                const nuevaRedSocial = {
                    UrlRedSocial: UrlPerfil,
                    UrlImgRedSocial: fileUrl
                };
                await AgregarRedSocial(nuevaRedSocial);
                setCheckContact(true)
                setSelectedFile(null);
                setImageUrl('');
                setUrlPerfil('')
                onClose()
            } else {
                console.error("No se pudo obtener la URL de la imagen.");
            }


        }



    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 w-full">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 text-white">
                <h2 className="text-xl font-semibold mb-4">Agregar Redes Sociales</h2>
                <div className="space-y-4">
                    <div className='mb-4'>
                        <label className='text-sm'>Sube tu icono de la red social</label>
                        <div className="bg-black rounded-lg border mt-2 border-gray-500 h-[8rem] w-[8rem] flex items-center justify-center relative">
                            {imageUrl ? (
                                <div className="relative w-full h-full">
                                    <img src={imageUrl} alt="Icono" className="h-full w-full object-cover rounded-lg" />
                                    <button
                                        onClick={handleRemoveImage}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
                                    >
                                        X
                                    </button>
                                </div>
                            ) : (
                                <label htmlFor="file-upload-1" className='px-3 py-2 text-right text-xs leading-4 cursor-pointer'>
                                    <div className='text-white px-4 py-2 rounded-full text-center'>
                                        <input id="file-upload-1" type="file" className="hidden" onChange={handleFileChange} />
                                        <span className='text-4xl'>+</span>
                                    </div>
                                </label>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="UrlRedSocial" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Url de perfil de la red social</label>
                        <input
                            type="text"
                            className="bg-[#12232E] text-sm rounded-lg hover:bg-slate-500 transition-all block w-full p-2.5"
                            required
                            value={UrlPerfil}
                            onChange={(e) => setUrlPerfil(e.target.value)}
                        />
                    </div>

                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSaveRed}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSocialMedia;
