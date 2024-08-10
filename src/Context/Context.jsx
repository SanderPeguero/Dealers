import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

// Functions
import {
    SaveCarSale, SaveMedia, SaveArchivo,
    ListCarSale, DeleteCarSale, EditCarSale, ListReservaCar, ReservaCar, GetReserva
} from "../Functions/Sales/Sales";
import { SignInAuth, LognInAuth, logout, ListUser, ListAllUsers, updateUserRole } from "../Functions/Authentication/Authentication"
import { GetHero, GetContact, editTitleContact } from "../Functions/HomeAdmin/HomeAdmin"

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
    const [ContactVisible, setContactVisible] = useState(false)

    const [CarDatos, setCarDatos] = useState([])
    const [CarEdit, setCarEdit] = useState(null)

    const [Name, setName] = useState('')
    const [Phone, setPhone] = useState('')
    const [Email, setEmail] = useState('')
    const [CarName, setCarName] = useState('')
    const [Price, setPrice] = useState('')
    const [color, setColor] = useState('')
    const [year, setYear] = useState('')
    const [condition, setCondition] = useState('')

    const [TitleHero, setTitleHero] = useState('')
    const [DescriptionHero, setDescriptionHero] = useState('')
    const [SliderImg, setSliderImg] = useState([])

    //Add vehicle (Modales)
    const [isOpenCardDetails, setisOpenCardDetails] = useState(false)
    const [isOpenEngineDetails, setisOpenEngineDetails] = useState(false)
    const [isOpenDimension, setisOpenDimension] = useState(false)
    const [isOpenFeature, setisOpenFeature] = useState(false)
    const [isOpenImage, setisOpenImage] = useState(false)
    const [isOpenPrice, setisOpenPrice] = useState(false)
    const [changeReserve, setchangeReserve] = useState(false)


    // Informacion de Contacto
    const [TitleContacts, setTitleContacts] = useState('')
    const [UbicationContacts, setUbicationContacts] = useState('')
    const [GmailContact, setGmailContact] = useState('')
    const [PhoneContact, setPhoneContact] = useState('')
    const [TitletwoContact, setTitletwoContact] = useState('')
    const [Socialnetworks, setSocialnetworks] = useState([])
    
    const [CheckContact, setCheckContact] = useState(false)
  
    //Socialnetworks




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
            GetHero(setTitleHero, setDescriptionHero, setSliderImg)
            GetContact(setTitleContacts, setUbicationContacts, setGmailContact, setPhoneContact, setTitletwoContact, setSocialnetworks)
            ListAllUsers(setListAllUser)
        }
    }, [user])

    useEffect(() => {
        ListCarSale(setLisCarNew, setLisCarUsed, setListCar)
    }, [])

    useEffect(() => {
        GetHero(setTitleHero, setDescriptionHero, setSliderImg)
        GetContact(setTitleContacts, setUbicationContacts, setGmailContact, setPhoneContact, setTitletwoContact, setSocialnetworks)
    }, [])

    useEffect(() => {
        if (CheckContact === true) {
             GetContact(setTitleContacts, setUbicationContacts, setGmailContact, setPhoneContact, setTitletwoContact, setSocialnetworks)
             setCheckContact(false)
        }
       
    }, [CheckContact])
    

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

    const handleLast= () => {
        if (isOpenPrice === true) {
            setisOpenImage(true)
            setisOpenPrice(false)
        } else if (isOpenImage === true) {
            setisOpenFeature(true)
            setisOpenImage(false)
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

    const handleNext = (validateCarSaleDatos) => {
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
                setisOpenImage(true);
                setisOpenFeature(false);
            }
        } else if (isOpenImage === true) {
            if (validateCarSaleDatos()) {
                setisOpenPrice(true);
                setisOpenImage(false);
            }
        }
    };



    const [ReservaCarList, setReservaCarList] = useState([]);

    useEffect(() => {
        const loadReservaCar = async () => {
            const reservas = await ListReservaCar();
            setReservaCarList(reservas);
        };
        loadReservaCar();
    }, []);

    useEffect(() => {
        if (changeReserve === true) {
            const loadReservaCar = async () => {
                const reservas = await ListReservaCar();
                setReservaCarList(reservas);
            };
            loadReservaCar();
        }
    }, [changeReserve])




    const handleRefresh = () =>{
        window.location.reload();
    }

    return (
        <Context.Provider
            value={{
                user,
                setSliderImg,
                handleRefresh,
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
                ContactVisible,
                setContactVisible,
                CarDatos,
                setCarDatos,
                handleRemove,
                CarEdit,
                setCarEdit,
                DeleteCarSale,

                EditCarSale,

                Formatnumber,
                TitleHero,
                DescriptionHero,
                SliderImg,
                setTitleHero,
                setDescriptionHero, setSliderImg, GetHero,
                isOpenCardDetails, setisOpenCardDetails,
                isOpenEngineDetails, setisOpenEngineDetails,
                isOpenDimension, setisOpenDimension,
                isOpenFeature, setisOpenFeature,
                isOpenImage, setisOpenImage,
                isOpenPrice, setisOpenPrice,
                handleNext, handleLast,
                setName,
                setPhone,
                setEmail,
                setCarName,
                setPrice, GetReserva,
                ListCarSale,
                setLisCarNew,
                setLisCarUsed,
                setListCar,
                setCondition, setYear, setColor,
                ReservaCar,
                ReservaCarList,
                Name,
                Phone,
                Email,
                condition,
                year,
                color,
                CarName,
                Price,
                ListReservaCar,
                setReservaCarList,
                ListCarSale, setLisCarNew, setLisCarUsed, setListCar,

                editTitleContact,
                TitleContacts, setTitleContacts,
                UbicationContacts, setUbicationContacts,
                GmailContact, setGmailContact,
                PhoneContact, setPhoneContact,
                TitletwoContact, setTitletwoContact,
                GetContact,
                Socialnetworks, setSocialnetworks,
                GetContact,
                setCheckContact,
                setchangeReserve



            }}
        >
            {children}
        </Context.Provider>
    );

}