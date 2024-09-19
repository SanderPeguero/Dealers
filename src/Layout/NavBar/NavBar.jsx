import React, { useState, useEffect } from 'react';
import { useContextCar } from '../../Context/Context';
import { useNavigate, Link, useLocation, NavLink } from 'react-router-dom';

import close from "../../assets/img/close.png"
import menu from "../../assets/img/menu.png"
import { MdOutlineModeNight } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
const Navbar = ({ background }) => {
    const { user, WhichRole, logout, AutosVisible, setAutosVisible, ContactVisible, setContactVisible, locationR, setlocationR, setContactVisibles } = useContextCar()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const Open = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    const [openSettingUser, setopenSettingUser] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(-10);
    const navigate = useNavigate()
    const location = useLocation()


    const handleLogout = (e) => {
        e.preventDefault()

        logout()
        setopenSettingUser(false)
        navigate('/admin/LognIn')
    }

    useEffect(() => {

        if (location.pathname.includes('/admin')) {
        }
    }, [location]);

    useEffect(() => {
        setlocationR(location.pathname)
    }, [locationR, location])


    const getAdjustedPath = (path) => {
        return location.pathname.includes('/admin') ? `/admin${path}` : path;
    };

    const handleAutosVisibles = () => {
        if (location.pathname !== '/' && location.pathname !== '/admin') {
            navigate('/')
            setAutosVisible(true)
        }
        else {
            setAutosVisible(true)
            setIsMenuOpen(!isMenuOpen)
        }
    }

    const handleContactoVisibles = () => {
        if (location.pathname !== '/' && location.pathname !== '/admin') {
            navigate('/')
            setContactVisible(true)
        }
        else {
            setContactVisible(true)
            setIsMenuOpen(!isMenuOpen)
        }
    }


    const handleReservas = () => {
        window.scrollTo(0, 0);
        navigate('/admin/Reservas')
    }



    const handleScroll = () => {
        if (window.scrollY > 50) {
            // Si el usuario está scrolleando hacia abajo, ocultar el menú
            setIsMenuOpen(false);
            setopenSettingUser(false)
        } else {
            // Si el usuario está scrolleando hacia arriba, mostrar el menú

        }

    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);


    }, []);

    return (

        <nav className={`relative bg-transparent z-20  border-gray-200 `}>
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4  ">
                <a to="https://flowbite.com" className="flex items-center -mr-14 space-x-3 rtl:space-x-reverse">
                    <img src="https://i.ibb.co/xXWCwHF/logo.png" className="h-12" alt="logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white hidden lg:flex">Cars  Showroom</span>
                </a>

                <div className="flex items-center justify-end md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
                    {/* Profile */}
                    {user ? (
                        <div className="relative flex items-center">
                            <span className="text-white hidden md:inline-block mr-4">{user.displayName}</span>
                            <button
                                onClick={() => setopenSettingUser(!openSettingUser)}
                                type="button"
                                className="relative flex items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                id="user-menu-button"
                                aria-expanded="false"
                                aria-haspopup="true"
                            >
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                            </button>

                            {openSettingUser && (
                                <div
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu-button"
                                    tabIndex="-1"
                                >
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-white hover:bg-gray-600"
                                        role="menuitem"
                                        tabIndex="-1"
                                        id="user-menu-item-0"
                                    >
                                        Your Profile
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-white hover:bg-gray-600"
                                        role="menuitem"
                                        tabIndex="-1"
                                        id="user-menu-item-1"
                                    >
                                        Settings
                                    </a>
                                    {user && WhichRole === 'Owner' && (
                                        <Link
                                            to="/admin/TableUser"
                                            className="block px-4 py-2 text-sm text-white hover:bg-gray-600"
                                            role="menuitem"
                                            tabIndex="-1"
                                            id="user-menu-item-1"
                                        >
                                            Usuarios
                                        </Link>
                                    )}
                                    <button
                                        onClick={(e) => handleLogout(e)}
                                        className="block px-4 py-2 w-full text-sm text-left text-white hover:bg-gray-600"
                                        role="menuitem"
                                        tabIndex="-1"
                                        id="user-menu-item-2"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : user === null && location.pathname.includes('/admin') ? (
                        <NavLink
                            to="/admin/LognIn"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-blue-500 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 hidden md:inline'
                                    : 'text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 hidden md:inline'
                            }
                        >
                            Sign in
                        </NavLink>
                    ) : null}

                    <button
                        onClick={Open}
                        data-collapse-toggle="mega-menu"
                        type="button"
                        className="inline-flex items-center justify-center p-2 w-10 h-10 rounded-lg md:hidden text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="mega-menu"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <img className="w-7 h-7 z-50" src={menu} alt="menu" />
                    </button>

                </div>

                <div id="mega-menu" className={`items-center absolute mt-[270px]  md:relative left-0 md:mt-2 bg-gray-800 md:bg-transparent m-auto justify-between   w-full md:block md:w-auto z-50 md:order-1 ${isMenuOpen ? "block" : "hidden"}`}>
                    <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-[7px] md:space-x-8 rtl:space-x-reverse">
                        <li>
                            <NavLink
                                to={getAdjustedPath('/')}
                                className={({ isActive }) =>
                                    isActive ? "block py-2 px-3  hover:text-center scale-x-95 max-w-full hover:scale-x-110 transition-all  border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0  text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                                        : "block py-2 px-3  hover:text-center scale-x-95 max-w-full hover:scale-x-110 transition-all  border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0  text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"}
                                aria-current="page" onClick={Open}
                            >
                                Home
                            </NavLink>
                        </li>

                        <li>
                            <button
                                onClick={handleAutosVisibles}

                                className="block py-2 px-3 hover:text-center scale-x-95 w-full hover:scale-x-110 transition-all text-gray-900 border-b  text-start border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Autos
                            </button>
                        </li>
                        <li>
                            <NavLink to='/AboutUs'

                                className={({ isActive }) =>
                                    isActive ? "block py-2 px-3  hover:text-center scale-x-95 max-w-full hover:scale-x-110 transition-all  border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0  text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                                        : "block py-2 px-3  hover:text-center scale-x-95 max-w-full hover:scale-x-110 transition-all  border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0  text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"}
                            >
                                Sobre Nosotros
                            </NavLink>
                        </li>
                        <li>
                            <button
                                onClick={handleContactoVisibles}
                                className="block py-2 hover:text-center scale-x-95 w-full hover:scale-x-110 transition-all px-3  text-start text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Contáctanos
                            </button>
                        </li>
                        {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                            <div>
                                <button
                                    onClick={handleReservas}
                                    className="block py-2 hover:text-center scale-x-95 w-full hover:scale-x-110 transition-all px-3  text-start text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">

                                    Reservas

                                </button>
                            </div>
                        )}

                    </ul>


                </div>

            </div>
        </nav>

    );
};
export default Navbar;