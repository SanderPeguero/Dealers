import React, { useState, useEffect } from 'react';
import { useContextCar } from '../../Context/Context';
import { IoPersonAdd } from "react-icons/io5";
import { Link, useLocation } from 'react-router-dom';
import Toast from '../Toast/Toast';
import { deleteUser } from '../../Functions/Authentication/Authentication';
import edit from "../../assets/img/edit.png";
import delet from "../../assets/img/delet.png";
import StateChange from "../../assets/img/StateChange.png"
import useredit from "../../assets/img/useredit.png"
import UserModal from './UserModal';
const TableUser = () => {
    const { ListAllUser, updateUserRole, setListAllUser } = useContextCar();

    const handleEditRole = (userId, rol) => {
        const newRole = prompt("Ingrese el nuevo rol para este usuario: ", rol);
        if (newRole) {
            updateUserRole(userId, newRole, setListAllUser);
        }
    }
    const [OpenEditModal, setOpenEditModal] = useState(false)
    const location = useLocation();
    const [toastOpen, setToastOpen] = useState(false);
    const [toastType, setToastType] = useState('success');
    const [toastMessage, setToastMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectUser, setselectUser] = useState(null)
    const [OpenModal, setOpenModal] = useState(false)
    useEffect(() => {
        if (location.state?.showToast) {
            setToastType(location.state.toastType || 'success');
            setToastMessage(location.state.toastMessage || 'Operation successful!');
            setToastOpen(true);
        }
    }, [location.state]);

    const handleStateChange = async (e, userId) => {
        console.log(userId)
        const newState = e.target.value;
        await deleteUser(userId, newState, setListAllUser);
        setOpenModal(true)
    }
    
    const [error, seterror] = useState(false)
    const handleDeleteUser = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro que deseas remover este Usuario?");
        if (confirmDelete) {
            await deleteUser(id, 'Removed', setListAllUser);
        } else {
            alert("Usuario no eliminado!");
        }
    }
    useEffect(() => {
        setInterval(() => {
          setOpenModal();
        }, 4500);

      }, []);
      useEffect(() => {
        setInterval(() => {
          setOpenEditModal();
        }, 3500);

      }, []);
    const handleOpenModal = (user) => {
        setselectUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setselectUser(null);
        setOpenEditModal(true)
    };

    const getStateClass = (state) => {
        switch (state) {
            case 'Active':
                return 'bg-green-600';
            case 'Disabled':
                return 'bg-orange-600';
            case 'Removed':
                return 'bg-red-600';
            default:
                return 'bg-gray-600';
        }
    };

    return (
        <div className="overflow-x-auto">
            <Toast
                type={toastType}
                message={toastMessage}
                isOpen={toastOpen}
                onClose={() => setToastOpen(false)}
            />
            <UserModal
                showModal={showModal}
                handleClose={handleCloseModal}
                user={selectUser}
                
            />
           

           {OpenEditModal ? (
                            <div className="fixed  inset-0 flex items-center justify-center z-50  sm:mx-0 min-h-screen w-full text-white backdrop-blur-sm  ">

                                <div className="flex flex-col relative items-center px-20 py-8 text-3xl text-white rounded-2xl bg-green-400 max-w-[671px] max-md:w-[85%] max-md:h-65  ">
                                <img
                                    loading="lazy"
                                    src={useredit}
                                    className="max-w-full aspect-square w-[80px]"
                                />
                                <div className="justify-center mt-8 text-xl max-md:text-lg">¡¡¡Exito!!!!</div>
                                <div className=" mt-3 text-xl max-md:text-sm m justify-center ">
                                ¡Haz Cambiado Editado el Usuario Exitosamente!
                                </div>

                            </div>
                            </div>
                        ) : ""}
            <div className="min-w-full inline-block align-middle">

                <div className="overflow-hidden rounded-lg  shadow-md m-5">
                    <div className="flex justify-end mb-8">
                        <Link
                            to="/admin/SignIn"
                            className="flex items-center gap-2 px-8 py-3 text-base font-semibold text-white bg-sky-600 rounded-md transition-colors hover:bg-sky-700 max-md:px-4"
                        >
                            <IoPersonAdd className="text-lg" />
                            Usuarios
                        </Link>
                    </div>

                    <table className="min-w-full divide-y divide-gray-600 bg-[#12232E] text-left text-sm text-gray-500">
                        <thead className="bg-[#0e1b24]">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-100">Nombre</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-100">Teléfono</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-100">Roles</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-100">Permisos</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-100">Estado</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-100">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-600 border-t border-gray-600">
                            {ListAllUser.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-900 text-gray-100 max-w-full">
                                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-100">
                                        <div className="relative h-10 w-10">
                                            <img
                                                className="h-full w-full rounded-full object-cover object-center"
                                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
                                            <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                                        </div>
                                        <div className="text-sm">
                                            <div className="font-medium text-gray-100">{user.name}</div>
                                            <div className="text-gray-400">{user.email}</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">{user.phone}</td>
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        {user.role === 'admin' ? 'Administrador' : user.role === "user" ? 'Usuario' : 'Propietario'}


                                        {user.role !== "Owner" && (
                                            <button onClick={() => handleEditRole(user.id, user.role)} className='ml-2'>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-5 w-5 text-yellow-500 hover:text-yellow-400"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                                    />
                                                </svg>
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2 flex-wrap">
                                            {user.role === "admin" && (
                                                <>
                                                    <span
                                                        className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                                                    >
                                                        Eliminar
                                                    </span>
                                                    <span
                                                        className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"
                                                    >
                                                        Agregar
                                                    </span>
                                                    <span
                                                        className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600"
                                                    >
                                                        Actualizar
                                                    </span>
                                                </>
                                            )}
                                            {user.role === "Owner" && (
                                                <>
                                                    <span
                                                        className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                                                    >
                                                        Eliminar
                                                    </span>
                                                    <span
                                                        className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"
                                                    >
                                                        Agregar
                                                    </span>
                                                    <span
                                                        className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600"
                                                    >
                                                        Actualizar
                                                    </span>
                                                    <span
                                                        className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600 cursor-pointer"
                                                        onClick={() => handleEditRole(user.id, user.role)}
                                                    >
                                                        Editar roles
                                                    </span>
                                                </>
                                            )}
                                            {user.role === "user" && (
                                                <>
                                                    <span
                                                        className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-red-600"
                                                    >
                                                        Ninguno
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`p-2 rounded-md ${getStateClass(user.State)}`}>
                                            <select
                                                className="bg-transparent text-black cursor-pointer outline-none"
                                                value={user.State}
                                                onChange={(e) => handleStateChange(e, user.id)}
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Disabled">Disabled</option>
                                                <option value="Removed">Removed</option>
                                            </select>
                                            {OpenModal ? (
                                                    <div className="fixed  inset-0 flex items-center justify-center z-50  sm:mx-0 min-h-screen w-full text-white backdrop-blur-sm  ">

                                                    <div className="flex flex-col relative items-center px-20 py-8 text-3xl text-white rounded-2xl bg-green-400 max-w-[671px] max-md:w-[85%] max-md:h-65  ">
                                                    
                                                        <img
                                                            loading="lazy"
                                                            src={StateChange}
                                                            className="max-w-full aspect-square w-[80px]"
                                                        />
                                                        <div className="justify-center mt-8 text-xl max-md:text-lg">¡¡¡Exito!!!!</div>
                                                        <div className=" mt-3 text-xl max-md:text-sm m justify-center ">
                                                            ¡Haz Cambiado el Estado Exitosamente!
                                                        </div>

                                                    </div>
                                                </div>
                                            ) : ""}
                                        </div>
                                    </td>
                                    <td onClick={(e) => e.stopPropagation()} >
                                        <div className='flex justify-center gap-5'>
                                            <button className='hover:bg-slate-400 p-2'>
                                                <img onClick={() => handleOpenModal(user)} className='w-6 h-6 cursor-pointer' src={edit} alt="" />
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TableUser;
