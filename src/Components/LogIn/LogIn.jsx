import React, { useState, useEffect } from "react"

import { useContextCar } from "../../Context/Context"

import { Link, useNavigate } from "react-router-dom"

const LogIn = () => {

    const { LognInAuth, user, setWhichRole } = useContextCar()

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleLogIn = () => {
        LognInAuth(email, password, navigate, setWhichRole) 
        
    }

    return (
        <div className="flex flex-col items-center px-16 pt-20 pb-2.5 w-full bg-zinc-950 max-md:px-5 max-md:max-w-full">
            <div className="mt-5 w-full max-w-[1060px] max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-[67%] max-md:ml-0 max-md:w-full">

                        <div className="flex flex-col grow text-base font-semibold text-white max-md:mt-10 max-md:max-w-full">

                            <div className="text-lg text-center text-neutral-400 max-md:max-w-full">
                                Por favor complete sus datos para acceder a su cuenta.
                            </div>

                            <div className="py-8">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 border h-12 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required />
                            </div>

                            <div className="py-2">
                                <label htmlFor="contraseña" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Constaseña</label>
                                <input type="password"
                                    name="constaseña"
                                    id="constaseña"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-gray-50 border h-12 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Constaseña" required />
                            </div>

                            <button onClick={() => handleLogIn()} className="justify-center items-center px-14 py-4 mt-12 text-center whitespace-nowrap bg-sky-600 rounded max-md:px-5 max-md:mt-10 max-md:max-w-full">
                                LogIn
                            </button>

                            <div className="self-center mt-7 text-center text-blue-400">
                                No tienes una cuenta?{" "}
                                <Link to="/admin/SignIn" className="font-bold text-blue-400">Registrarte</Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col  ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col items-center mt-20 text-center text-white max-md:mt-10">
                            <img
                                loading="lazy"
                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/9f929a9df73f4a14c488f2b3bb36d7638681664193fd97b0d022a393388a0a31?apiKey=e203d7c0597f4cf28ac4ec4c4bb8501a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/9f929a9df73f4a14c488f2b3bb36d7638681664193fd97b0d022a393388a0a31?apiKey=e203d7c0597f4cf28ac4ec4c4bb8501a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9f929a9df73f4a14c488f2b3bb36d7638681664193fd97b0d022a393388a0a31?apiKey=e203d7c0597f4cf28ac4ec4c4bb8501a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/9f929a9df73f4a14c488f2b3bb36d7638681664193fd97b0d022a393388a0a31?apiKey=e203d7c0597f4cf28ac4ec4c4bb8501a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/9f929a9df73f4a14c488f2b3bb36d7638681664193fd97b0d022a393388a0a31?apiKey=e203d7c0597f4cf28ac4ec4c4bb8501a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9f929a9df73f4a14c488f2b3bb36d7638681664193fd97b0d022a393388a0a31?apiKey=e203d7c0597f4cf28ac4ec4c4bb8501a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/9f929a9df73f4a14c488f2b3bb36d7638681664193fd97b0d022a393388a0a31?apiKey=e203d7c0597f4cf28ac4ec4c4bb8501a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/9f929a9df73f4a14c488f2b3bb36d7638681664193fd97b0d022a393388a0a31?apiKey=e203d7c0597f4cf28ac4ec4c4bb8501a&"
                                className="w-40 max-w-full aspect-[0.97]"
                            />
                            <div className="mt-4 text-5xl">AutoAtom</div>
                            <div className="self-stretch mt-10 text-4xl font-bold">
                                AutoAtom Registro
                            </div>
                        </div>
                    </div>

                </div>
                <div className="py-8"> d</div>
            </div>
        </div>
    );
}

export default LogIn;