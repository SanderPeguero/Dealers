import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/Firebase";
import { validateCarSaleDatos } from '../Components/Price/Validations'

// Functions
import { SaveCarSale, SaveMedia, SaveArchivo, ListCarSale, DeleteCarSale, EditCarSale } from "../Functions/Sales/Sales";
import { SignInAuth, LognInAuth, logout, ListUser, ListAllUsers, updateUserRole } from "../Functions/Authentication/Authentication"
import { GetHero, GetContact, editTituloContact } from "../Functions/HomeAdmin/HomeAdmin"

const Context = createContext();

export const useContextCar = () => {
    const context = useContext(Context);
    if (!context) throw new Error('There is no Context provider');
    return context;
};


export function ProviderContext({ children }) {
    const [CarAvailable, setAvailable] = useState(null);
    const [WhichRole, setWhichRole] = useState(null)
    const [user, setUser] = useState(null)

    const [LisCarNew, setLisCarNew] = useState([])
    const [LisCarUsed, setLisCarUsed] = useState([])
    const [ListCar, setListCar] = useState([])
    const [ListAllUser, setListAllUser] = useState([])

    const [locationR, setlocationR] = useState('')

    const [AutosVisible, setAutosVisible] = useState(false)
    const [AutosInVisible, setAutosInVisible] = useState(false)
    const [ContactoVisibles, setContactoVisibles] = useState(false)

    const [CarDatos, setCarDatos] = useState([])
    const [CarEdit, setCarEdit] = useState(null)

    const [TituloHero, setTituloHero] = useState('')
    const [DescripcionHero, setDescripcionHero] = useState('')
    const [SliderImg, setSliderImg] = useState([])

    //Add vehicle (Modales)
    const [isOpenCardDetails, setisOpenCardDetails] = useState(false)
    const [isOpenEngineDetails, setisOpenEngineDetails] = useState(false)
    const [isOpenDimension, setisOpenDimension] = useState(false)
    const [isOpenFeature, setisOpenFeature] = useState(false)
    const [isOpenImagen, setisOpenImagen] = useState(false)
    const [isOpenPrice, setisOpenPrice] = useState(false)

    useEffect(() => {
        const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

        });
        return () => unsubuscribe();
    }, [user]);

    useEffect(() => {
        if (user) {
            ListUser(user.uid, setWhichRole)
            ListCarSale(setLisCarNew, setLisCarUsed, setListCar)
            GetHero(setTituloHero, setDescripcionHero, setSliderImg)
            ListAllUsers(setListAllUser)
        }
    }, [user])



    useEffect(() => {
        ListCarSale(setLisCarNew, setLisCarUsed, setListCar)
    }, [])

    useEffect(() => {
        GetHero(setTituloHero, setDescripcionHero, setSliderImg)
    }, [])


    const handleRemove = (dato) => {
        const nuevaLista = CarDatos.filter(item => item !== dato);
        setCarDatos(nuevaLista)
    }

    const Formatnumber = (number) => {

        if (typeof number === 'string') {

            number = parseInt(number, 10);
        }

        if (!isNaN(number)) {
            return number.toLocaleString('en-US');
        }

        return '0';
    }

    const handleAnterior = () => {
        if (isOpenPrice === true) {
            setisOpenImagen(true)
            setisOpenPrice(false)
        } else if (isOpenImagen === true) {
            setisOpenFeature(true)
            setisOpenImagen(false)
        } else if (isOpenFeature === true) {
            setisOpenDimension(true)
            setisOpenFeature(false)
        } else if (isOpenDimension === true) {
            setisOpenEngineDetails(true)
            setisOpenDimension(false)
        } else if (isOpenEngineDetails === true) {
            setisOpenCardDetails(true)
            setisOpenEngineDetails(false)
        }
    }

    // const handleSiguiente = () => {
    //     if (isOpenCardDetails === true) {
    //         setisOpenEngineDetails(true)
    //         setisOpenCardDetails(false)
    //     }else if (isOpenEngineDetails === true) {
    //         setisOpenDimension(true)
    //         setisOpenEngineDetails(false)
    //     }else if (isOpenDimension === true) {
    //         setisOpenFeature(true)
    //         setisOpenDimension(false)
    //     }else if (isOpenFeature === true) {
    //         setisOpenImagen(true)
    //         setisOpenFeature(false)
    //     }else if (isOpenImagen === true) {
    //         setisOpenPrice(true)
    //         setisOpenImagen(false)
    //     }
    // }




    const handleSiguiente = (validateCarSaleDatos) => {
        if (isOpenCardDetails === true) {
            if (validateCarSaleDatos()) {
                setisOpenEngineDetails(true);
                setisOpenCardDetails(false);
            }
        } else if (isOpenEngineDetails === true) {
            if (validateCarSaleDatos()) {
                setisOpenDimension(true);
                setisOpenEngineDetails(false);
            }
        } else if (isOpenDimension === true) {
            if (validateCarSaleDatos()) {
                setisOpenFeature(true);
                setisOpenDimension(false);
            }
        } else if (isOpenFeature === true) {
            if (validateCarSaleDatos()) {
                setisOpenImagen(true);
                setisOpenFeature(false);
            }
        } else if (isOpenImagen === true) {
            if (validateCarSaleDatos()) {
                setisOpenPrice(true);
                setisOpenImagen(false);
            }
        }
    };

    const CarSaleDatos = {
        Sale: {
            IdCarSale: "",
            DetalleCoche: {
                Titulo: "",
                Condicion: "",
                TipoCuerpo: "",
                Marca: "",
                Modelo: "",
                Year: "",
                Capacidad: "",
                Color: "",
                Descripcion: ""
            },
            DetalleMotor: {
                TipoCombustimble: "",
                Kilometraje: "",
                Transmision: "",
                DriverTrain: "",
                CapacidadMotor: "",
                Power: "",
            },
            Dimension: {
                Longitud: "",
                Ancho: "",
                Altura: "",
                VolumenCarga: ""
            },

            Features: {
                Features: [],
                Otros: "No"
            },
            Precio: {
                Precio: 0
            },

            Multimedia: {
                Imagen: []
            },
        }
    }

    const updateCarDetails = (updatedDetails) => {
        CarSaleDatos.Sale.DetalleCoche = updatedDetails;

    }

    const updateEngineDetails = (updatedDetails) => {
        CarSaleDatos.Sale.DetalleMotor = updatedDetails;

    }

    const updateDimension = (updatedDetails) => {
        CarSaleDatos.Sale.Dimension = updatedDetails

    }


    const handleSale = (e) => {
        e.preventDefault();

        // Imprime la acción del evento
        console.log('Evento preventDefault ejecutado');

        // Imprime el estado actual de CarSaleDatos.Sale
        console.log('Datos de la venta del coche:', CarSaleDatos.Sale);

        // Verifica si los datos son válidos
        if (validateCarSaleDatos(CarSaleDatos.Sale)) {
            // Imprime un mensaje indicando que los datos son válidos
            console.log('Datos validados correctamente');

            // Guarda la venta del coche y muestra un mensaje de confirmación
            SaveCarSale(CarSaleDatos, user.uid);
            console.log('Datos guardados con éxito');

            alert("Guardado");
        } else {
            // Imprime un mensaje indicando que los datos no son válidos
            console.log('Datos incompletos o inválidos');

            alert('Por favor completa todos los campos.');
        }
    };


    const handleEdit = (e) => {


        e.preventDefault();

        // Imprime la acción del evento
        console.log('Evento preventDefault ejecutado');

        // Imprime el estado actual de CarSaleDatos.Sale
        console.log('Datos de la venta del coche:', CarSaleDatos.Sale);

        // Verifica si los datos son válidos
        if (validateCarSaleDatos(CarSaleDatos.Sale)) {
            // Imprime un mensaje indicando que los datos son válidos
            console.log('Datos validados correctamente');
            console.log(CarSaleDatos);
            // Guarda la venta del coche y muestra un mensaje de confirmación
            // EditCarSale(CarSaleDatos, CarEdit.IdCarSale);
            console.log('Datos guardados con éxito');

            alert("Guardado");
        } else {
            // Imprime un mensaje indicando que los datos no son válidos
            console.log('Datos incompletos o inválidos');

            alert('Por favor completa todos los campos.');
        }




    }


    return (
        <Context.Provider
            value={{
                user,
                CarAvailable,
                setAvailable,
                SaveCarSale,
                SaveMedia,
                SaveArchivo,
                WhichRole,
                setWhichRole,
                SignInAuth,
                LognInAuth,
                logout,
                ListUser,
                ListAllUsers,
                updateUserRole,
                setLisCarNew,
                setLisCarUsed,
                setListCar,
                ListCar,
                setListAllUser,
                locationR,
                setlocationR,
                AutosInVisible,
                setAutosInVisible,
                AutosVisible,
                setAutosVisible,
                ContactoVisibles,
                setContactoVisibles,
                CarDatos,
                setCarDatos,
                handleRemove,
                CarEdit,
                setCarEdit,
                DeleteCarSale,
                EditCarSale,
                Formatnumber,
                TituloHero,
                DescripcionHero,
                SliderImg,
                setTituloHero,
                setDescripcionHero, setSliderImg, GetHero,

                isOpenCardDetails, setisOpenCardDetails,
                isOpenEngineDetails, setisOpenEngineDetails,
                isOpenDimension, setisOpenDimension,
                isOpenFeature, setisOpenFeature,
                isOpenImagen, setisOpenImagen,
                isOpenPrice, setisOpenPrice,

                handleSiguiente, handleAnterior,
                CarSaleDatos, updateCarDetails, updateEngineDetails, updateDimension,
                handleSale,handleEdit




            }}
        >
            {children}
        </Context.Provider>
    );
}
