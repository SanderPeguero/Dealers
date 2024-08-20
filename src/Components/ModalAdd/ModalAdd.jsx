import React, { useState, useEffect } from 'react';
import { addNewOption, addNewModel, fetchBrands } from '../../Functions/Sales/Sales';

const ModalAdd = ({ isOpen, onClose, Text, Category, updateList }) => {
    const [newOption, setNewOption] = useState('');
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [model, setModel] = useState('');

    useEffect(() => {
        if (Category === 'optionsModel') {
            const fetchBrandsData = async () => {
                try {
                    const fetchedBrands = await fetchBrands();
                    setBrands(fetchedBrands);
                } catch (error) {
                    console.error("Error al obtener las marcas: ", error);
                }
            };

            fetchBrandsData();
        }
    }, [Category]);

    const handleAccept = () => {
        if (Category === 'optionsModel') {
            if (selectedBrand && model.trim()) {
                const modelObject = { name: model.toLowerCase(), label: model };
                addNewModel(modelObject, selectedBrand)
                    .then(() => {
                        updateList(true);
                    })
                    .catch((error) => {
                        console.error("Error al agregar el nuevo modelo: ", error);
                    });
            } else if (newOption.trim()) {
                const brandObject = { label: newOption };
                addNewBrand(brandObject)
                    .then(() => {
                        updateList(true);
                    })
                    .catch((error) => {
                        console.error("Error al agregar la nueva marca: ", error);
                    });
            } else {
                console.error("Marca o modelo no seleccionado");
            }
        } else if (newOption.trim()) {
            const optionObject = { name: newOption.toLowerCase(), label: newOption };
            addNewOption(Category, optionObject)  // Aquí no se requiere marca si es solo una opción
                .then(() => {
                    updateList(true);
                })
                .catch((error) => {
                    console.error("Error al agregar la nueva opción: ", error);
                });
        }
        onClose();
    };
    const handleClose = () => {
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="flex justify-center items-center h-screen">
                    <div className="fixed inset-0 z-10 flex items-center justify-center text-white">
                        <div
                            className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            onClick={handleClose}
                        ></div>
                        <div className="bg-[#071620] rounded-md shadow-xl overflow-hidden max-w-md w-full sm:w-96 md:w-1/2 lg:w-2/3 xl:w-1/3 z-50 transform transition-transform scale-100">
                            <div className="bg-black text-white px-4 py-2 flex justify-between">
                                <h2 className="text-lg font-semibold">Nuevo {Text}</h2>
                                <div>
                                    <button
                                        onClick={handleClose}
                                        className='text-gray-500 hover:text-white hover:bg-red-600 hover:rounded-full  focus:outline-none'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <div>
                                    <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{Text}</label>
                                    {Category === 'optionsModel' ? (
                                        <>
                                            {/* <input
                                                onChange={(e) => setNewOption(e.target.value)}
                                                type="text"
                                                placeholder="Ingresa la marca"
                                                className="bg-[#12232E] text-sm rounded-lg hover:bg-slate-500 transition-all block w-full p-2.5 mb-2"
                                            /> */}
                                            <select
                                                onChange={(e) => setSelectedBrand(e.target.value)}
                                                value={selectedBrand}
                                                className="bg-[#12232E] text-sm rounded-lg hover:bg-slate-500 transition-all block w-full p-2.5 mb-2"
                                            >
                                                <option value="">Selecciona una marca</option>
                                                {brands.map((brand) => (
                                                    <option key={brand.value} value={brand.label}>
                                                        {brand.label}
                                                    </option>
                                                ))}
                                            </select>
                                            {selectedBrand && (
                                                <input
                                                    onChange={(e) => setModel(e.target.value)}
                                                    type="text"
                                                    placeholder="Ingresa el modelo"
                                                    className="bg-[#12232E] text-sm rounded-lg hover:bg-slate-500 transition-all block w-full p-2.5"
                                                />
                                            )}
                                        </>
                                    ) : (
                                        <input
                                            onChange={(e) => setNewOption(e.target.value)}
                                            type="text"
                                            id="newOption"
                                            className="bg-[#12232E] text-sm rounded-lg hover:bg-slate-500 transition-all block w-full p-2.5"
                                            required
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="border-t px-4 py-2 flex justify-end">
                                <button
                                    onClick={handleAccept}
                                    className="px-3 py-1 bg-blue-500 text-white rounded-md w-full sm:w-auto"
                                >
                                    Agregar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalAdd;
