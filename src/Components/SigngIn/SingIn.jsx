import React, { useState, useEffect } from "react";
import { useContextCar } from "../../Context/Context";
import { useNavigate, Link } from "react-router-dom"
import Toast from "../Toast/Toast";
const SignIn = () => {

    const { SignInAuth, setWhichRole } = useContextCar()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const navigate = useNavigate()

    const [toastOpen, setToastOpen] = useState(false);
    const [toastType, setToastType] = useState('success');
    const [toastMessage, setToastMessage] = useState('');

    const launchToast = (type, message) => {
        setToastType(type);
        setToastMessage(message);
        setToastOpen(true);
    };

    const handleSubmit = async () => {

        if (!name.trim() || !email.trim() || !password.trim() || !phone.trim()) {
            launchToast('error', 'Todos los campos son obligatorios.');
            return;
        }
    
        const datos = {
            name: name.trim(),
            email: email.trim(),
            password: password.trim(),
            phone: phone.trim(),
            role: 'user'
        };
    
        try {
            await SignInAuth(datos, setWhichRole);
            navigate('/admin/TableUser', {
                state: {
                    showToast: true,
                    toastType: 'success',
                    toastMessage: 'Cuenta creada con éxito!'
                }
            });
        } catch (error) {
            console.error(error);
            launchToast('error', 'Error al crear la cuenta. Verifique sus credenciales.');
        }
    };
    

    return (
        <div className="flex flex-col items-center px-16 pt-20 pb-2.5 w-full bg-zinc-950 max-md:px-5 max-md:max-w-full">
            <Toast
                type={toastType}
                message={toastMessage}
                isOpen={toastOpen}
                onClose={() => setToastOpen(false)}
            />
            <div className="mt-5 w-full max-w-[1060px] max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-[67%] max-md:ml-0 max-md:w-full">

                        <div className="flex flex-col grow text-base font-semibold text-white max-md:mt-10 max-md:max-w-full">

                            <div className="text-lg text-center text-neutral-400 max-md:max-w-full">
                                Por favor complete sus datos para registrar su cuenta.
                            </div>

                            <div className="py-5">
                                <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre completo</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    id="nombre"
                                    onChange={(e) => setName(e.target.value)}
                                    className="bg-gray-50 border h-12 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre completo" required />

                            </div>

                            <div className="py-2">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 border h-12 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required />

                            </div>

                            <div className="py-2">
                                <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
                                <input
                                    type="text"
                                    name="telefono"
                                    id="telefono"
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="bg-gray-50 border h-12 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Teléfono" required />

                            </div>


                            <div className="py-2">
                                <label htmlFor="contraseña" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Constaseña</label>
                                <input
                                    type="password"
                                    name="constaseña"
                                    id="constaseña"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-gray-50 border h-12 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Constaseña" required />

                            </div>


                            <button onClick={() => handleSubmit()} className="justify-center items-center px-14 py-4 mt-12 text-center whitespace-nowrap bg-sky-600 rounded max-md:px-5 max-md:mt-10 max-md:max-w-full">
                                Registrar
                            </button>

                        </div>
                    </div>

                    <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
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
            </div>
        </div>
    )
}
export default SignIn;