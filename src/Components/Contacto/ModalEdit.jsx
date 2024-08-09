import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useContextCar } from '../../Context/Context';
import { ImagenRedSocial, uploadImageRedSocial } from '../../Functions/HomeAdmin/HomeAdmin';

const EditSocialMedia = ({ isOpen, onClose, datos, index }) => {
    const {setCheckContact} = useContextCar();
    const [LinkUrlSocial, setLinkUrlSocial] = useState('');
    const [ImgRedSocial, setImgRedSocial] = useState('');
    const [File, setFile] = useState(null);

    useEffect(() => {
        if (datos !== null) {
            setLinkUrlSocial(datos?.UrlRedSocial || '');
            setImgRedSocial(datos?.UrlImgRedSocial || '');
        }
    }, [datos]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            const url = URL.createObjectURL(file);
            setImgRedSocial(url);
        }
    };

    const handleEdit = async () => {
        let fileUrl = ImgRedSocial;

        if (File) {
            fileUrl = await uploadImageRedSocial(File);
            if (!fileUrl) {
                console.error("No se pudo obtener la URL de la imagen.");
                return;
            }
        }

        const Datos = {
            UrlRedSocial: LinkUrlSocial,
            UrlImgRedSocial: fileUrl
        };

        await ImagenRedSocial(Datos, index);
        setCheckContact(true)
        setImgRedSocial('');
        setLinkUrlSocial('');
        setFile(null); 
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 w-full">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 text-white">
                <h2 className="text-xl font-semibold mb-4">Editar Redes Sociales</h2>
                <div className="space-y-4">
                    <div className='flex flex-row items-center'>
                        <img className="w-16 duration-200" src={ImgRedSocial} alt="Red Social" />
                        <label htmlFor="file-upload-1" className='px-3 py-2 text-right text-xl leading-4 cursor-pointer'>
                            <div className='text-white px-4 py-2 rounded-full text-center'>
                                <input id="file-upload-1" type="file" className="hidden" onChange={handleFileChange} />
                                <FaEdit size={20} className="text-yellow-400" />
                            </div>
                        </label>
                    </div>

                    <div>
                        <label htmlFor="UrlRedSocial" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Url de la red social
                        </label>
                        <input
                            value={LinkUrlSocial}
                            onChange={(e) => setLinkUrlSocial(e.target.value)}
                            type="text"
                            className="bg-[#12232E] text-sm rounded-lg hover:bg-slate-500 transition-all block w-full p-2.5"
                            required
                        />
                    </div>

                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancelar
                        </button>
                        <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditSocialMedia;
