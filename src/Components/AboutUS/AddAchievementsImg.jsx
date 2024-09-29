import React from 'react'
import {uploadAchievementsImg, AddAchievementsImg } from '../../Functions/HomeAdmin/HomeAdmin';
import { useContextCar } from '../../Context/Context';
import { useState } from 'react';
function AddAchievementsImg() {
    const {setCheckAbout} = useContextCar()
    const [selectedImage, setSelectedImage] = useState(null);
    const [URLImage, setURLImage] = useState('');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            const url = URL.createObjectURL(file);
            setURLImage(url);
        }
    };

    const handleDeleteImage = () => {
        setSelectedImage(null);
        setURLImage('');
    };
    const handleSaveImage = async () => {

        if (selectedImage) {
            const fileUrl = await uploadFirstImageAbout(selectedImage);
            if (fileUrl) {
                const NewAchievementsImg = {
                    UrlAchievementsImg: fileUrl
                };
                await AddNewFirstImageAbout(NewAchievementsImg);
                setCheckAbout(true)
                setSelectedImage(null);
                setURLImage('');

                HandleCloseModal()
                
            } else {
                console.error("No se pudo obtener la URL de la imagen.");
            }

        }

    }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 w-full backdrop-blur-sm">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 text-white">
                <h2 className="text-xl font-semibold mb-4">Agregar Imagen de Presentación</h2>
                <div className="space-y-7">
                    <div className='mb-4'>
                        <label className='text-sm'>Sube tu imagen de Presentación</label>
                        <div className="bg-black rounded-lg border mt-2 border-gray-500 h-[14rem] w-[20rem] flex items-center justify-center relative">
                        {URLImage ? (
                                <div className="relative w-full h-full">
                                    <img src={URLImage} alt="Icono" className="h-full w-full object-cover rounded-lg" />
                                    <button
                                        onClick={handleDeleteImage}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
                                    >
                                        X
                                    </button>
                                </div>
                            ) : (
                                <label htmlFor="file-upload-1" className='px-3 py-2 text-right text-xs leading-4 cursor-pointer'>
                                    <div className='text-white px-4 py-2 rounded-full text-center'>
                                        <input id="file-upload-1" type="file" className="hidden" onChange={handleImageChange} />
                                        <span className='text-4xl'>+</span>
                                    </div>
                                </label>
                            )}
                            
                        </div>
                    </div>

                    

                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            onClick={HandleCloseModal}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSaveImage}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default AddAchievementsImg