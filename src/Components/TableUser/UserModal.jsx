import React, { useState, useEffect, useMemo } from 'react';
import { useContextCar } from '../../Context/Context';
import { IoMdClose } from "react-icons/io";
import { updateUser } from '../../Functions/Authentication/Authentication';
const UserModal = ({ showModal, handleClose, user }) => {
    const { setListAllUser } = useContextCar()

    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Phone, setPhone] = useState("")
    const [Password, setPassword] = useState("")

    useEffect(() => {
        if (user !== null) {
            setName(user?.name || "")
            setEmail(user?.email || "")
            setPhone(user?.phone || "")
            setPassword(user?.password || "")
        }
    }, [user]);

    const handleSaveEdit = async (e) => {
        e.preventDefault()

        const datos = {
            name: Name,
            email: Email,
            password: Password,
            phone: Phone,
            role: user?.role
        }

        await updateUser(user?.id, datos, setListAllUser)

        handleClose();
    };

    if (!showModal) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 text-white backdrop-blur-md' onClick={handleClose}>
            <div onClick={(e) => e.stopPropagation()} className="relative bg-gray-800 rounded-lg shadow-xl p-8 sm:p-10 lg:p-12 max-w-2xl w-full">

                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold sm:text-3xl">Detalles del usuario</h2>
                    <IoMdClose
                        className='cursor-pointer text-white hover:text-red-500 text-2xl sm:text-3xl transition-colors duration-300'
                        onClick={handleClose}
                    />
                </div>

                <hr className="border-gray-600 mb-6" />

                <div className='space-y-6'>

                    <div>
                        <label className="block text-sm sm:text-lg font-semibold mb-1">Nombre:</label>
                        <input
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            type="text"
                            placeholder="Ingrese nombre"
                        />
                    </div>

                    <div>
                        <label className="block text-sm sm:text-lg font-semibold mb-1">Teléfono:</label>
                        <input
                            value={Phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            type="text"
                            placeholder="Ingrese teléfono"
                        />
                    </div>

                    <div>
                        <label className="block text-sm sm:text-lg font-semibold mb-1">Email:</label>
                        <input
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            type="email"
                            placeholder="Ingrese email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm sm:text-lg font-semibold mb-1">Contraseña:</label>
                        <input
                            disabled
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-700 text-gray-400 rounded-md px-4 py-2 focus:outline-none"
                            type="password"
                            placeholder="Contraseña protegida"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        onClick={(e) => handleSaveEdit(e)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold text-lg transition-all duration-300 focus:ring-4 focus:ring-blue-500"
                    >
                        Editar
                    </button>
                </div>
            </div>
        </div>

    );
};

export default UserModal