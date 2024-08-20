import React, { useState, useEffect, useMemo } from 'react'
import { useContextCar } from '../../Context/Context'
import close from "../../assets/img/close.png"
import SelectL from '../Select/Select';
import { FaPlusCircle } from "react-icons/fa";
import ModalAdd from '../ModalAdd/ModalAdd';
import { GetItemsCarDetails } from '../../Functions/Sales/Sales';
const CarDetails = ({ updateCarDetails }) => {
    const { CarEdit, isOpenCardDetails, setisOpenCardDetails, handleNext, handleRefresh } = useContextCar()
    const [Title, setTitle] = useState('')
    const [Condition, setCondition] = useState('')
    const [BodyType, setBodyType] = useState('')
    const [Brand, setBrand] = useState('')
    const [Model, setModel] = useState('')
    const [Amount, setAmount] = useState(0)
    const [Year, setYear] = useState('')

    const [Color, setColor] = useState('')
    const [Description, setDescription] = useState('')

    const [capacity, setCapacity] = useState(2);
    const [open, setOpen] = useState(false)
    const [notification, setNotification] = useState(false)
    const [isOpenAdd, setisOpenAdd] = useState(false)
    const [Text, setText] = useState("")

    const [amountError, setAmountError] = useState('');

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (value === '' || Number(value) >= 0) {
            setAmount(Number(value));
            setAmountError('');
        } else {
            setAmountError('La cantidad no puede ser negativa.');
        }
    };

    const decreaseCapacity = () => {
        if (capacity > 2) {
            setCapacity(capacity - 1);
        }
    }

    const increaseCapacity = () => {
        setCapacity(capacity + 1);
    }


    const CarDetailsdatos = useMemo(() => ({
        Title,
        Condition,
        BodyType,
        Brand,
        Model,
        Amount,
        Year: Year,
        Capacidad: capacity,
        Color,
        Description
    }), [Title, Condition, BodyType, Brand, Model, Amount, Year, capacity, Color, Description]);

    useEffect(() => {
        updateCarDetails(CarDetailsdatos)
    }, [CarDetailsdatos]);

    useEffect(() => {
        if (CarEdit !== null) {
            setTitle(CarEdit.Sale.CarDetails.Title)
            setCondition(CarEdit.Sale.CarDetails.Condition)
            setBodyType(CarEdit.Sale.CarDetails.BodyType)
            setBrand(CarEdit.Sale.CarDetails.Brand)
            setModel(CarEdit.Sale.CarDetails.Model)
            setYear(CarEdit.Sale.CarDetails.Year)
            setColor(CarEdit.Sale.CarDetails.Color)
            setDescription(CarEdit.Sale.CarDetails.Description)

        }

    }, [CarEdit])


    useEffect(() => {
        if (isOpenCardDetails) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpenCardDetails])



    const handleCloseCardDetails = () => {

        setTitle('')
        setCondition('')
        setBodyType('')
        setBrand('')
        setModel('')
        setYear('')
        setColor('')
        setDescription('')
        setCapacity(1)
        setisOpenCardDetails(false)
        handleRefresh()
    }

    const validateCardDetails = () => {
        if (!Title || !Condition || !BodyType || !Brand || !Model || !Year || !Color || !Description) {
            setNotification(!notification)

        }
        else { return true; }

    }

    const optionsYear = Array.from({ length: 50 }, (_, i) => {
        const year = new Date().getFullYear() + 1 - i;
        return { value: year.toString(), label: year.toString() };
    });

    const [optionBodyType, setoptionBodyType] = useState([])
    const [optionsBrand, setoptionsBrand] = useState([])
    const [optionsModel, setoptionsModel] = useState([])
    const [Category, setCategory] = useState('')
    const [UpdateList, setUpdateList] = useState(false)

    const Onclose = () => {
        setisOpenAdd(!isOpenAdd);
    };

    const OpenModal = (text, category) => {
        setisOpenAdd(true)
        setText(text)
        setCategory(category)
    }

    useEffect(() => {
        GetItemsCarDetails(setoptionBodyType, setoptionsBrand, setoptionsModel)
    }, [])

    useEffect(() => {
        if (UpdateList === true) {
            GetItemsCarDetails(setoptionBodyType, setoptionsBrand, setoptionsModel)
            setUpdateList(false)
        }
    }, [UpdateList])

    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState('');
    const [modalCategory, setModalCategory] = useState('');
    const [setOptionsBrand] = useState([]);
    const [setOptionsModel] = useState([]);
    const [brand] = useState(null);
    const [model] = useState(null);

    const updateList = async (updated) => {
        if (updated) {
            try {
                // Obtén los datos actualizados desde Firebase
                const data = await GetItemsCarDetails(
                    () => { }, // Puedes dejar estos setters vacíos si no los usas aquí
                    setOptionsBrand,
                    setOptionsModel
                );
                
                if (!data) {
                    console.error("No se obtuvieron datos actualizados.");
                }
            } catch (error) {
                console.error("Error al obtener los datos actualizados: ", error);
            }
        }
    };
    useEffect(() => {
        // Inicializa las listas de opciones al cargar el componente
        const fetchInitialData = async () => {
            try {
                const data = await GetItemsCarDetails(
                    setOptionsBrand,
                    setOptionsBrand,
                    setOptionsModel
                );
                if (!data) {
                    console.error("No se obtuvieron datos iniciales.");
                }
            } catch (error) {
                console.error("Error al obtener los datos iniciales: ", error);
            }
        };

        fetchInitialData();
    }, []);

    // Función para actualizar la lista de opciones


    return (
        <>

            {
                isOpenCardDetails &&

                <div className='fixed inset-0 backdrop-blur-md z-50'>
                    <ModalAdd isOpen={isOpenAdd} onClose={Onclose} Text={Text} Category={Category} updateList={setUpdateList} />
                    <div className='bg-[#071620] m-10 rounded-lg w-auto h-[80%] mt-[6rem] text-white mb-8 overflow-y-auto max-h-screen md:max-h-none'>
                        <div className='ml-8 mr-8 mb-12 mt-8'>
                            <div className='text-left flex justify-between cursor-pointer items-center'>
                                <h3 className='items-center text-2xl mt-4'>Detalles del coche</h3>
                                <div className='mt-4'>
                                    <button
                                        onClick={handleCloseCardDetails}
                                        className='text-gray-500 hover:text-white hover:bg-red-600 hover:rounded-full p-2 focus:outline-none'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className='mt-8'>
                                <form className='max-w-full'>
                                    <div className='mb-4 grid gap-6 lg:grid-cols-2 w-full'>
                                        <div>
                                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Título</label>
                                            <input value={Title} onChange={(e) => setTitle(e.target.value)}
                                                type="text" id="titulo" className="bg-[#12232E] text-sm rounded-lg hover:bg-slate-500 transition-all block w-full p-2.5" required />
                                        </div>
                                        <div>
                                            <label htmlFor="condicion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Condición </label>
                                            <div className='flex flex-row p-2.5 '>
                                                <div className='flex flex-row items-center'>
                                                    <input checked={Condition === 'Nuevo'} onChange={(e) => setCondition(e.target.value)} value="Nuevo" type='radio' name='condicion' id='nuevo' className='h-5 w-5 bg-[#071620] rounded-full border border-blue-gray-200 relative border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required />
                                                    <label htmlFor='nuevo' className='mr-2 ml-2'>Nuevo</label>
                                                </div>
                                                <div className='ml-8 flex flex-row items-center'>
                                                    <input checked={Condition === 'Usado'} onChange={(e) => setCondition(e.target.value)} value="Usado" type='radio' name='condicion' id='usado' className='h-5 w-5 bg-[#071620] rounded-full border border-blue-gray-200 relative border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required />
                                                    <label htmlFor='usado' className='mr-2 ml-2'>Usado</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mb-4'>
                                        <div className="grid gap-6 mb-6 lg:grid-cols-4">
                                            <div>
                                                <div className='flex flex-row items-center '>
                                                    <label htmlFor="Typeofload" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                        Tipo de cuerpo
                                                    </label>

                                                    <button onClick={() => OpenModal("Tipo de cuerpo", "optionBodyType")}>
                                                        <FaPlusCircle size={20} className='ml-2' />
                                                    </button>

                                                </div>

                                                <SelectL
                                                    value={BodyType}
                                                    onChange={setBodyType}
                                                    options={optionBodyType}
                                                    isClearable
                                                    placeholder="Selecciona"
                                                />
                                            </div>
                                           
                                                <div>
                                                    <div className='flex flex-row items-center'>
                                                        <label htmlFor="Brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                            Marca
                                                        </label>
                                                        <button onClick={() => OpenModal("Marca", "optionsBrand")}>
                                                            <FaPlusCircle size={20} className='ml-2' />
                                                        </button>
                                                    </div>

                                                    <SelectL
                                                        value={brand}
                                                        onChange={setBrand}
                                                        options={optionsBrand}
                                                        isClearable
                                                        placeholder="Selecciona"
                                                    />
                                                </div>

                                                <div>
                                                    <div className='flex flex-row items-center'>
                                                        <label htmlFor="Model" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                            Modelo
                                                        </label>
                                                        <button onClick={() => OpenModal("Modelo", "optionsModel")}>
                                                            <FaPlusCircle size={20} className='ml-2' />
                                                        </button>
                                                    </div>

                                                    <SelectL
                                                        value={model}
                                                        onChange={setModel}
                                                        options={optionsModel}
                                                        isClearable
                                                        placeholder="Selecciona"
                                                        isDisabled={!brand}
                                                    />
                                                </div>

                                                <ModalAdd
                                                    isOpen={modalOpen}
                                                    onClose={() => setModalOpen(false)}
                                                    Text={modalText}
                                                    Category={modalCategory}
                                                    updateList={updateList}
                                                />
                                            
                                            <div>
                                                <div className='mb-4'>
                                                    <label htmlFor="Amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cantidad</label>
                                                    <input
                                                        value={Amount}
                                                        onChange={handleAmountChange}
                                                        type="number"
                                                        id="Amount"
                                                        className="bg-[#12232E] text-sm rounded-lg hover:bg-slate-500 transition-all block w-full p-2.5"
                                                        required
                                                    />
                                                    {amountError && <p className="mt-1 text-sm text-red-500">{amountError}</p>}
                                                </div>
                                                {/* <label htmlFor="ExteriorColor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cantidad</label>
                                                <input value={Amount} onChange={(e) => setAmount(e.target.value)}
                                                    type="number" id="Amount" className="bg-[#12232E] text-sm rounded-lg hover:bg-slate-500 transition-all block w-full p-2.5" required /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mb-4'>
                                        <div className="grid gap-6 mb-6 lg:grid-cols-3">
                                            <div>
                                                <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Año</label>
                                                <SelectL
                                                    value={Year}
                                                    onChange={setYear}
                                                    options={optionsYear}
                                                    isClearable
                                                    placeholder="Selecciona"
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Capacidad de pasajeros</label>
                                                <div className="flex">
                                                    <button type="button" onClick={decreaseCapacity} className="bg-[#004A77] text-white hover:text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-l border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                        -
                                                    </button>
                                                    <input
                                                        type="text"
                                                        value={capacity}
                                                        onChange={(e) => setCapacity(parseInt(e.target.value))}
                                                        min={2}
                                                        max={100}
                                                        className="bg-[#12232E] text-sm text-center block w-full p-2.5"
                                                        required
                                                    />
                                                    <button type="button" onClick={increaseCapacity} className="bg-[#004A77] text-white hover:text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-r border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="ExteriorColor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Color Exterior</label>
                                                <input value={Color} onChange={(e) => setColor(e.target.value)}
                                                    type="text" id="color" className="bg-[#12232E] text-sm rounded-lg hover:bg-slate-500 transition-all block w-full p-2.5" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor="Description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Descripción </label>
                                        <textarea value={Description} onChange={(e) => setDescription(e.target.value)} type="text" id="Description" className="bg-[#12232E] rounded-lg cursor-pointer text-sm block w-full p-8" placeholder='Descripción del vehiculo...' required />
                                    </div>
                                    <div className='text-left flex justify-end items-center'>
                                        <button
                                            onClick={() => handleNext(validateCardDetails)}
                                            className='items-center mr-4 hover:bg-blue-600 p-2 hover:rounded-md'>Siguiente</button>
                                        {notification ? (
                                            <div className="fixed inset-0 flex items-center justify-center z-50 sm:mx-0 min-h-screen w-full text-white backdrop-blur-sm">
                                                <div className="flex flex-col relative items-center px-20 py-8 text-3xl text-white rounded-2xl bg-orange-400 max-w-[671px] max-md:w-[85%] max-md:h-65">
                                                    <button className="absolute w-20 h-20 right-5 -top-10 rounded-full justify-center px-7 py-4 mt-16 text-xl text-white whitespace-nowrap transition-all hover:bg-red-700 bg-opacity-60 max-md:px-5 max-md:mt-10" onClick={() => setNotification(false)}>
                                                        <img src={close} alt="" />
                                                    </button>
                                                    <img
                                                        loading="lazy"
                                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Info_icon_002.svg/1024px-Info_icon_002.svg.png"
                                                        className="max-w-full aspect-square w-[80px]"
                                                    />
                                                    <div className="justify-center mt-8 text-xl max-md:text-lg">UPs!</div>
                                                    <div className="mt-3 text-xl max-md:text-sm m justify-center">
                                                        ¡Debe de Llenar Todos los Campos Por Favor!
                                                    </div>
                                                </div>
                                            </div>
                                        ) : ""}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            }

        </>
    )

}

export default CarDetails