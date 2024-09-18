import React, { useState, useEffect, useMemo } from 'react'
import { useContextCar } from '../../Context/Context'
import close from "../../assets/img/close.png"
import SelectL from '../Select/Select';
import { FaPlusCircle } from "react-icons/fa";
import ModalAdd from '../ModalAdd/ModalAdd';
import { GetItemsCarDetails, GetItemsCarEngine, AddItemsCar } from '../../Functions/Sales/Sales';
import CheckBox from '../Checkbox/CheckBox';
import { IoMdClose } from "react-icons/io";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
const AddCarModal = (
    {
        updateCarDetails,
        updateEngineDetails,
        updateDimension,
        FeatureDatos,
        newFeature,
        setNewFeature,
        AudiovisualDatos,
        PriceDatos,
        handleSale,
        handleEdit
    }

) => {
    const { CarEdit, isOpenCardDetails, setisOpenCardDetails, handleNext, handleRefresh } = useContextCar()
    //Detalles de coches
    const [Title, setTitle] = useState('')
    const [Condition, setCondition] = useState('')
    const [BodyType, setBodyType] = useState('')
    const [Brand, setBrand] = useState('')
    const [Model, setModel] = useState('')
    const [capacity, setCapacity] = useState(2);
    const [Amount, setAmount] = useState(0)
    const [Year, setYear] = useState('')
    const [Color, setColor] = useState('')
    const [Description, setDescription] = useState('')

    //Detalles de coche
    const [FuelType, setFuelType] = useState('')
    const [Mileage, setMileage] = useState('')
    const [Transmition, setTransmition] = useState('')
    const [DriverTrain, setDriverTrain] = useState('')
    const [EngineCapacity, setEngineCapacity] = useState('')
    const [Power, setPower] = useState('')

    //Dimension
    const [Longitude, setLongitude] = useState('')
    const [Width, setWidth] = useState('')
    const [Height, setHeight] = useState('')
    const [CargoVolume, setCargoVolume] = useState('')

    //Feature
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [OtroFeature, setOtroFeature] = useState('')

    //Image
    const [media, setMedia] = useState([]);
    const [LinkUrl, setLinkUrl] = useState([]);

    //Price
    const [price, setPrice] = useState(0);

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
        BodyType: BodyType.label,
        Brand: Brand.label,
        Model: Model.label,
        Amount,
        Year: Year.label,
        Capacidad: capacity,
        Color,
        Description
    }), [Title, Condition, BodyType, Brand, Model, Amount, Year, capacity, Color, Description]);

    useEffect(() => {
        updateCarDetails(CarDetailsdatos)
    }, [CarDetailsdatos]);

    const EngineDetailsdatos = useMemo(() => ({
        FuelType: FuelType.label,
        Mileage,
        Transmition: FuelType.label,
        DriverTrain: DriverTrain.label,
        EngineCapacity,
        Power,
    }), [FuelType, Mileage, Transmition, DriverTrain, EngineCapacity, Power]);

    useEffect(() => {
        updateEngineDetails(EngineDetailsdatos)
    }, [EngineDetailsdatos])


    const Dimensiondatos = useMemo(() => ({
        Longitude,
        Width,
        Height,
        CargoVolume,
    }), [Longitude, Width, Height, CargoVolume]);

    useEffect(() => {
        updateDimension(Dimensiondatos)
    }, [Dimensiondatos])

    useEffect(() => {
        FeatureDatos.Features = selectedFeatures
        if (newFeature !== "") {
            FeatureDatos.Otros = newFeature
        }
    }, [selectedFeatures, FeatureDatos, newFeature])

    useEffect(() => {
        if (LinkUrl.length > 0) {
            AudiovisualDatos.Image = LinkUrl;
        }
    }, [LinkUrl]);

    useEffect(() => {
        if (price > 0) {
            PriceDatos.Price = price;
        }
    }, [price]);


    useEffect(() => {
        if (CarEdit !== null) {
            console.log("Rellenar los datos")
            console.log(CarEdit)

            // Detalles de coche
            setTitle(CarEdit.Sale.CarDetails.Title)
            setCondition(CarEdit.Sale.CarDetails.Condition)
            setBodyType({ label: CarEdit.Sale.CarDetails.BodyType, value: CarEdit.Sale.CarDetails.BodyType });
            setBrand({ label: CarEdit.Sale.CarDetails.Brand, value: CarEdit.Sale.CarDetails.Brand });
            setModel({ label: CarEdit.Sale.CarDetails.Model, value: CarEdit.Sale.CarDetails.Model });
            setAmount(CarEdit.Sale.CarDetails.Amount)
            setYear({ label: CarEdit.Sale.CarDetails.Year, value: CarEdit.Sale.CarDetails.Year });
            setColor(CarEdit.Sale.CarDetails.Color)
            setDescription(CarEdit.Sale.CarDetails.Description)
            // Detalles de motor
            setFuelType({ label: CarEdit.Sale.MotorDetails.FuelType, value: CarEdit.Sale.MotorDetails.FuelType });
            setMileage(CarEdit.Sale.MotorDetails.Mileage)
            setTransmition({ label: CarEdit.Sale.MotorDetails.Transmition, value: CarEdit.Sale.MotorDetails.Transmition });
            setDriverTrain({ label: CarEdit.Sale.MotorDetails.DriverTrain, value: CarEdit.Sale.MotorDetails.DriverTrain });
            setEngineCapacity(CarEdit.Sale.MotorDetails.EngineCapacity)
            setPower(CarEdit.Sale.MotorDetails.Power)
            // Dimension
            setLongitude(CarEdit.Sale.Dimension.Longitude)
            setWidth(CarEdit.Sale.Dimension.Width)
            setHeight(CarEdit.Sale.Dimension.Height)
            setCargoVolume(CarEdit.Sale.Dimension.CargoVolume)
            // Feature
            setSelectedFeatures(CarEdit.Sale.Features.Features)
            setOtroFeature(CarEdit.Sale.Features.newFeature)
            // Imagen
            setLinkUrl(CarEdit.Sale.Multimedia.Image)
            // Precio
            setPrice(CarEdit.Sale.Price.Price)

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
    //Detalles de coche
    const [optionBodyType, setoptionBodyType] = useState([])
    const [optionsBrand, setoptionsBrand] = useState([])
    const [optionsModel, setoptionsModel] = useState([])

    //Detalles de motor
    const [optionTypeFuel, setoptionTypeFuel] = useState([])
    const [optionTransmission, setoptionTransmission] = useState([])
    const [optionTraction, setoptionTraction] = useState([])


    const [filteredModels, setFilteredModels] = useState([]);
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
        GetItemsCarEngine(setoptionTypeFuel, setoptionTransmission, setoptionTraction)
    }, [])

    useEffect(() => {
        if (UpdateList === true) {
            GetItemsCarDetails(setoptionBodyType, setoptionsBrand, setoptionsModel)
            GetItemsCarEngine(setoptionTypeFuel, setoptionTransmission, setoptionTraction)
            setUpdateList(false)
        }
    }, [UpdateList])

    useEffect(() => {

        if (Brand) {
            const selectedBrandModels = optionsModel[Brand.value] || [];
            setFilteredModels(selectedBrandModels);
        } else {
            setFilteredModels([]);
            setModel('');
        }
    }, [Brand]);

    const handleCheckboxChange = (feature) => {
        setSelectedFeatures((prevSelectedFeatures) => {
            if (prevSelectedFeatures.includes(feature)) {
                if (feature === "Otro") {
                    setOtroFeature(null);
                }
                return prevSelectedFeatures.filter((item) => item !== feature);
            } else {
                if (feature === "Otro") {
                    setOtroFeature(feature);
                }
                return [...prevSelectedFeatures, feature];
            }
        });
    };

    const handleMediaChange = (e) => {
        const files = Array.from(e.target.files);
        const newLinkUrls = [];
        const newMedia = [];

        files.forEach(file => {
            if (file.type.startsWith('image')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newLinkUrls.push(reader.result);
                    newMedia.push(file);
                    if (newMedia.length === files.length) {
                        setLinkUrl(prevLinkUrl => [...prevLinkUrl, ...newLinkUrls]);
                        setMedia(prevMedia => [...prevMedia, ...newMedia]);
                    }
                };
                reader.readAsDataURL(file);
            } else {
                alert("Debes Agregar Archivos Tipo Imagen");
            }
        });
    };

    const handleRemoveMedia = (e, index) => {
        const newLinkUrl = LinkUrl.filter((_, i) => i !== index);
        const newMedia = media.filter((_, i) => i !== index);

        setLinkUrl(newLinkUrl);
        setMedia(newMedia);
    };



    const handleClose = () => {
        setTitle('')
        setCondition('')
        setBodyType('')
        setBrand('')
        setModel('')
        setAmount(0)
        setYear('')
        setColor('')
        setDescription('')
        setCapacity(1)

        setFuelType('')
        setMileage('')
        setTransmition('')
        setDriverTrain('')
        setEngineCapacity('')
        setPower('')
        setLongitude('')
        setWidth('')
        setHeight('')
        setCargoVolume('')

        setSelectedFeatures([])
        setOtroFeature('')

        setMedia([])
        setLinkUrl([])

        setPrice(0)

        setisOpenCardDetails(false)


    }

    const handleSave = (e) => {
        e.preventDefault();
        // if (validatePrecio()) {
        if (CarEdit) {
            handleEdit(e, handleClose); // Editar auto
        } else {
            handleSale(e); // Vender mi auto
        }
        // handleClose()
        // handleRefresh()

    };



    const [currentIndex, setCurrentIndex] = useState(1);


    const previous = (e) => {
        e.preventDefault()
        if (currentIndex > 1) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const forward = (e) => {
        e.preventDefault()
        if (currentIndex < LinkUrl.length) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <>
            {isOpenCardDetails && (
                <div className="font-sans bg-gray-100 flex items-center justify-center h-screen">
                    <div>

                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            <ModalAdd isOpen={isOpenAdd} onClose={Onclose} Text={Text} Category={Category} updateList={setUpdateList} Brand={optionsBrand} />
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            <div className="relative bg-[#071620] rounded-lg overflow-hidden shadow-xl max-w-screen-md w-full m-4">
                                <div className="px-6 py-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-2xl leading-6 font-bold text-white">
                                            Agregar Autos
                                        </h2>
                                        <IoMdClose
                                            onClick={handleClose}
                                            className='cursor-pointer text-white hover:text-red-500 text-2xl sm:text-3xl transition-colors duration-300'

                                        />
                                    </div>
                                </div>
                                <div
                                    className="prose max-w-screen-md p-6 overflow-y-auto text-white"
                                    style={{
                                        maxHeight: "70vh",
                                        backgroundColor: "#071620",

                                        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
                                    }}
                                >
                                    <h2 className="text-2xl font-bold mb-4">Detalles del coche</h2>
                                    <div>
                                        <form className='max-w-full' >
                                            {/* Detalles de coche */}
                                            <div className='mb-4 grid gap-6 lg:grid-cols-2 w-full'>
                                                <div>
                                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Título</label>
                                                    <input value={Title} onChange={(e) => setTitle(e.target.value)}
                                                        type="text" id="titulo" className="bg-[#12232E] text-sm rounded-lg hover:bg-slate-500 transition-all block w-full p-2.5" />
                                                </div>
                                                <div>
                                                    <label htmlFor="condicion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Condición </label>
                                                    <div className='flex flex-row p-2.5 '>
                                                        <div className='flex flex-row items-center'>
                                                            <input checked={Condition === 'Nuevo'} onChange={(e) => setCondition(e.target.value)} value="Nuevo" type='radio' name='condicion' id='nuevo' className='h-5 w-5 bg-[#071620] rounded-full border border-blue-gray-200 relative border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                                                            <label htmlFor='nuevo' className='mr-2 ml-2'>Nuevo</label>
                                                        </div>
                                                        <div className='ml-8 flex flex-row items-center'>
                                                            <input checked={Condition === 'Usado'} onChange={(e) => setCondition(e.target.value)} value="Usado" type='radio' name='condicion' id='usado' className='h-5 w-5 bg-[#071620] rounded-full border border-blue-gray-200 relative border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
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
                                                        <div className='flex flex-row items-center '>
                                                            <label htmlFor="Brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                Marca
                                                            </label>
                                                            <button onClick={() => OpenModal("Marca", "optionsBrand")}>
                                                                <FaPlusCircle size={20} className='ml-2' />
                                                            </button>
                                                        </div>

                                                        <SelectL
                                                            value={Brand}
                                                            onChange={setBrand}
                                                            options={optionsBrand}
                                                            isClearable
                                                            placeholder="Selecciona"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className='flex flex-row items-center '>
                                                            <label htmlFor="Model" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                Modelo
                                                            </label>
                                                            <button onClick={() => OpenModal("Modelo", "optionsModel")}>
                                                                <FaPlusCircle size={20} className='ml-2' />
                                                            </button>
                                                        </div>

                                                        <SelectL
                                                            value={Model}
                                                            onChange={setModel}
                                                            options={filteredModels}
                                                            isClearable
                                                            placeholder="Selecciona"
                                                            isDisabled={!Brand}
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className='mb-4'>
                                                            <label htmlFor="Amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cantidad</label>
                                                            <input
                                                                value={Amount}
                                                                onChange={handleAmountChange}
                                                                type="number"
                                                                id="Amount"
                                                                className="bg-[#12232E] text-sm rounded-lg hover:bg-slate-500 transition-all block w-full p-2.5"

                                                            />
                                                            {amountError && <p className="mt-1 text-sm text-red-500">{amountError}</p>}
                                                        </div>

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

                                                            />
                                                            <button type="button" onClick={increaseCapacity} className="bg-[#004A77] text-white hover:text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-r border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="ExteriorColor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Color Exterior</label>
                                                        <input value={Color} onChange={(e) => setColor(e.target.value)}
                                                            type="text" id="color" className="bg-[#12232E] text-sm rounded-lg hover:bg-slate-500 transition-all block w-full p-2.5" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='mb-4'>
                                                <label htmlFor="Description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Descripción </label>
                                                <textarea value={Description} onChange={(e) => setDescription(e.target.value)} type="text" id="Description" className="bg-[#12232E] rounded-lg cursor-pointer text-sm block w-full p-8" placeholder='Descripción del vehiculo...' />
                                            </div>


                                            {/* Detalles de motor */}
                                            <h2 className="text-2xl font-bold mb-4">Detalles del motor</h2>
                                            <div className='mb-4'>
                                                <div className="grid gap-6 mb-6 lg:grid-cols-3">
                                                    <div>
                                                        <div className='flex flex-row items-center'>
                                                            <label htmlFor="Typeofload" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                Tipos de combustible
                                                            </label>
                                                            <button onClick={() => OpenModal("Tipos de combustible", "optionTypeFuel")}>
                                                                <FaPlusCircle size={20} className='ml-2' />
                                                            </button>
                                                        </div>

                                                        <SelectL
                                                            value={FuelType}
                                                            onChange={setFuelType}
                                                            options={optionTypeFuel}
                                                            isClearable
                                                            placeholder="Selecciona"
                                                        />

                                                    </div>
                                                    <div>
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kilometraje</label>
                                                        <div className="flex">
                                                            <input value={Mileage} onChange={(e) => setMileage(e.target.value)} type="number" id="title" className="bg-[#12232E] rounded-lg text-sm block w-full p-2.5" />
                                                            <div type="button" className="bg-[#004A77] text-white px-4 py-2 rounded-r focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                                km
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='flex flex-row items-center'>
                                                            <label htmlFor="Transmisión" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                Transmisión
                                                            </label>
                                                            <button onClick={() => OpenModal("Transmisión", "optionTransmission")}>
                                                                <FaPlusCircle size={20} className='ml-2' />
                                                            </button>
                                                        </div>

                                                        <SelectL
                                                            value={Transmition}
                                                            onChange={setTransmition}
                                                            options={optionTransmission}
                                                            isClearable
                                                            placeholder="Selecciona"
                                                        />

                                                    </div>

                                                    <div className='mb-8 '>
                                                        <div className='flex flex-row items-center'>
                                                            <label htmlFor="Tracción" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                Tipo de Tracción
                                                            </label>
                                                            <button onClick={() => OpenModal("Tipo de Tracción", "optionTraction")}>
                                                                <FaPlusCircle size={20} className='ml-2' />
                                                            </button>
                                                        </div>

                                                        <SelectL
                                                            value={DriverTrain}
                                                            onChange={setDriverTrain}
                                                            options={optionTraction}
                                                            isClearable
                                                            placeholder="Selecciona"
                                                        />

                                                    </div>

                                                    <div>
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Capacidad del motor</label>
                                                        <div className="flex">
                                                            <input value={EngineCapacity} onChange={(e) => setEngineCapacity(e.target.value)} type="number" id="title" className="bg-[#12232E] text-sm block w-full p-2.5 rounded-lg hover:bg-slate-500 transition-all" />
                                                            <div type="button" className="bg-[#004A77] text-white px-4 py-2 rounded-r focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                                cc
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div >
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Power</label>
                                                        <div className="flex">
                                                            <input value={Power} onChange={(e) => setPower(e.target.value)} type="number" id="title" className="bg-[#12232E] text-sm block w-full p-2.5 rounded-lg hover:bg-slate-500 transition-all" />
                                                            <div type="button" className="bg-[#004A77] text-white px-4 py-2 rounded-r focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                                hp
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                            {/* Dimension */}
                                            <h2 className="text-2xl font-bold mb-4">Dimension</h2>
                                            <div className=''>
                                                <div className="grid gap-6 mb-6 lg:grid-cols-4">
                                                    <div className='mb-8'>
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Longitud </label>
                                                        <div className="flex">
                                                            <input value={Longitude} onChange={(e) => setLongitude(e.target.value)} type="number" className="bg-[#12232E] text-sm block w-full p-2.5 rounded-lg hover:bg-slate-500 transition-all" />
                                                            <div type="button" className="bg-[#004A77] text-white px-4 py-2 rounded-r focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                                mm
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ancho</label>
                                                        <div className="flex">
                                                            <input value={Width} onChange={(e) => setWidth(e.target.value)} type="number" className="bg-[#12232E] text-sm block w-full p-2.5 rounded-lg hover:bg-slate-500 transition-all" />
                                                            <div type="button" className="bg-[#004A77] text-white px-4 py-2 rounded-r focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                                mm
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Altura</label>
                                                        <div className="flex">
                                                            <input value={Height} onChange={(e) => setHeight(e.target.value)} type="number" className="bg-[#12232E] text-sm block w-full p-2.5 rounded-lg hover:bg-slate-500 transition-all" />
                                                            <div type="button" className="bg-[#004A77] text-white px-4 py-2 rounded-r focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                                mm
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Volumen de carga</label>
                                                        <div className="flex">
                                                            <input value={CargoVolume} onChange={(e) => setCargoVolume(e.target.value)} type="number" className="bg-[#12232E] text-sm block w-full p-2.5 rounded-lg hover:bg-slate-500 transition-all" />
                                                            <div type="button" className="bg-[#004A77] text-white px-4 py-2 rounded-r focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                                L
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Feature */}
                                            <h2 className="text-2xl font-bold mb-4">Feature</h2>
                                            <div className='mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 w-full'>
                                                {['Dirección asistida', 'Asientos con calefacción', 'Sensor de estacionamiento trasero', 'USB Port', 'AC', 'Wifi', 'Barra de techo', 'Sistema de sonido', 'Alarma', 'Control de crucero', 'Ventanas eléctricas', 'Asiento con memoria', 'Bluetooth', 'Sensor de estacionamiento delantero', 'Techo corredizo', 'Otro'].map((feature) => (
                                                    <CheckBox
                                                        value={feature}
                                                        key={feature}
                                                        text={feature}
                                                        isChecked={selectedFeatures.includes(feature)}
                                                        onCheckboxChange={() => handleCheckboxChange(feature)}
                                                    />
                                                ))}
                                            </div>

                                            <div className='mb-4'>
                                                <p className='mb-2 text-gray-400 ml-2'>Indique aquí si seleccionó la opción "Otro".</p>
                                                <textarea
                                                    value={newFeature}
                                                    onChange={(e) => setNewFeature(e.target.value)}
                                                    className="bg-[#12232E] text-sm block w-full p-4"
                                                    placeholder='Escribe otra característica aquí.'

                                                    disabled={OtroFeature !== "Otro"}
                                                />
                                            </div>

                                            {/* Imagen */}
                                            <div className="flex flex-col md:flex-row space-x-4">

                                                <div className="flex-grow">
                                                    <h2 className="text-2xl font-bold mb-4">Imágenes</h2>
                                                    <div className="mb-4 flex-grow overflow-y-auto">
                                                        <div className="mb-6">
                                                            <label className="block text-sm mb-2">Sube tus Imágenes</label>
                                                            <div className="relative bg-black rounded-lg border mt-2 border-gray-500 h-[12rem] w-full max-w-xs bg-clip-content border-dashed flex items-center justify-center">
                                                                <label htmlFor="file-upload-1" className="cursor-pointer flex flex-col items-center">
                                                                    <input onChange={handleMediaChange} id="file-upload-1" type="file" multiple className="hidden" />
                                                                    <span className="text-4xl text-gray-400">+</span>
                                                                </label>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>

                                                {/* Carrusel de imágenes */}
                                                {
                                                    LinkUrl.length > 0 && (
                                                        <main className="grid min-h-[20rem] place-content-center bg-gray-900 flex-shrink-0">
                                                            <div className="relative mx-auto max-w-2xl overflow-hidden rounded-md  p-2 sm:p-1">

                                                                <div className="absolute right-5 top-5 z-10 rounded-full bg-gray-600 px-2 text-center text-sm text-white">
                                                                    <span>{currentIndex}</span>/<span>{LinkUrl.length}</span>
                                                                </div>



                                                                <button
                                                                    onClick={(e) => previous(e)}
                                                                    className="absolute left-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 shadow-md"
                                                                >
                                                                    <MdNavigateBefore color='black' size={20} />

                                                                </button>

                                                                <button
                                                                    onClick={(e) => forward(e)}
                                                                    className="absolute right-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 shadow-md"
                                                                >
                                                                    <MdNavigateNext color='black' size={20} />

                                                                </button>

                                                                <div className="relative h-[20rem] w-[30rem]">
                                                                    {LinkUrl.map((image, index) => (
                                                                        <div
                                                                            key={index}
                                                                            className={`absolute top-0 transition-opacity duration-300 ${currentIndex === index + 1 ? 'opacity-100' : 'opacity-0'
                                                                                }`}
                                                                        >
                                                                            <img
                                                                                src={image}
                                                                                alt={`slide-${index}`}
                                                                                className="rounded-sm md:h-[20rem] md:w-[20rem] lg:h-[20rem] lg:w-[30rem]"
                                                                            />

                                                                            {/* Botón de Borrar */}
                                                                            <button
                                                                                onClick={(e) => handleRemoveMedia(e, index)}
                                                                                className="absolute top-2 left-2 z-20 text-white text-xs bg-red-700 bg-opacity-50  hover:bg-red-700 px-2 py-1 rounded"
                                                                            >
                                                                                Borrar
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>

                                                            </div>
                                                        </main>
                                                    )
                                                }

                                            </div>

                                            {/* Precio */}
                                            <h2 className="text-2xl font-bold mb-4">Precio</h2>
                                            <div className=''>
                                                <div className="grid gap-6 mb-6 lg:grid-cols-1">
                                                    <div className='mb-8'>
                                                        <div className="flex">
                                                            <div className="bg-[#004A77] justify-center text-2xl text-white px-4 py-2 rounded-l focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                                                                $
                                                            </div>
                                                            <input
                                                                value={price}
                                                                onChange={(e) => setPrice(e.target.value)}
                                                                type='number'
                                                                className="bg-[#12232E] text-sm block w-full p-4 rounded-l"

                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </form>
                                    </div>

                                </div>
                                <div className="bg-[#071620] px-4 py-3 sm:px-6 flex align-items justify-center p-4 gap-4 flex-row">
                                    <button
                                        type="submit"
                                        onClick={(e) => handleSave(e)}
                                        className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 sm:w-1/2 sm:text-sm"
                                    >
                                        {CarEdit ? 'Editar auto' : 'Vender mi auto'}
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default AddCarModal;
