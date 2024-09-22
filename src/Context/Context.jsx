import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

// Functions
import {
    SaveCarSale, SaveMedia, SaveArchivo,
    ListCarSale, DeleteCarSale, EditCarSale, ListReservaCar, ReservaCar, GetReserva, DeleteReservation
} from "../Functions/Sales/Sales";
import { SignInAuth, LognInAuth, logout, ListUser, ListAllUsers, updateUserRole } from "../Functions/Authentication/Authentication"
import { GetHero, GetContact, editTitleContact, GetAbout } from "../Functions/HomeAdmin/HomeAdmin"


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
    const [Amount, setAmaount] = useState(null)
    const [LisCarNew, setLisCarNew] = useState([])
    const [LisCarUsed, setLisCarUsed] = useState([])
    const [ListCar, setListCar] = useState([])
    const [ListReservation, setListReservation] = useState([])
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
    const [BackgroundImage, setBackgroundImage] = useState([])

    const [CheckContact, setCheckContact] = useState(false)


    // Informacion de Sobre Nosotros
    const [FirstTitle, setFirstTitle] = useState('')
    const [Paragraph, setParagraph] = useState('')
    const [DateButton, setDateButton] = useState('')
    const [FirstBackgroundImage, setFirstBackgroundImage] = useState('')
    const [ServicesTitle, setServicesTitle] = useState('')
    const [SellnewcarIconServices, setSellnewcarIconServices] = useState("")
    const [SellusedcarIconServices, setSellusedcarIconServices] = useState("")
    const [SellmycarIconServices, setSellmycarIconServices] = useState("")
    const [AchievementsText, setAchievementsText] = useState("")
    const [AchievementsImage, setAchievementsImage] = useState("")
    const [CheckAbout, setCheckAbout] = useState("")


    //Filter
    const [SerchingCar, setSerchingCar] = useState([])
    const [isFilter, setisFilter] = useState(false)


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
            GetContact(setTitleContacts, setUbicationContacts, setGmailContact, setPhoneContact, setTitletwoContact, setSocialnetworks, setBackgroundImage)
            GetAbout (setFirstTitle, setParagraph, setDateButton, setFirstBackgroundImage, setServicesTitle, setSellnewcarIconServices,setSellusedcarIconServices, setSellmycarIconServices, setAchievementsText, setAchievementsImage )
            ListAllUsers(setListAllUser)
        }
    }, [user])

    useEffect(() => {
        ListCarSale(setLisCarNew, setLisCarUsed, setListCar)
    }, [])

    useEffect(() => {
        GetHero(setTitleHero, setDescriptionHero, setSliderImg)
        GetAbout (setFirstTitle, setParagraph, setDateButton, setFirstBackgroundImage, setServicesTitle, setSellnewcarIconServices,setSellusedcarIconServices, setSellmycarIconServices, setAchievementsText, setAchievementsImage )
        GetContact(setTitleContacts, setUbicationContacts, setGmailContact, setPhoneContact, setTitletwoContact, setSocialnetworks, setBackgroundImage)
        
    }, [])

    useEffect(() => {
        if (CheckContact === true) {
            GetContact(setTitleContacts, setUbicationContacts, setGmailContact, setPhoneContact, setTitletwoContact, setSocialnetworks, setBackgroundImage)
            setCheckContact(false)
        }

    }, [CheckContact])

    useEffect(() => {
        if (CheckAbout === true) {
            GetAbout (setFirstTitle, setParagraph, setDateButton, setFirstBackgroundImage, setServicesTitle, setSellnewcarIconServices,setSellusedcarIconServices, setSellmycarIconServices, setAchievementsText, setAchievementsImage )
            setCheckAbout(false)
        }

    }, [CheckAbout])
    

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

    const handleLast = () => {
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
        console.log("Boton next")
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

    const handleRefresh = () => {
        window.location.reload();
    }

    const filterCars = (ListCar, Options, normalizeString) => {

        const areAllOptionsEmpty = !Options.search.trim() &&
            !Options.YearDesde &&
            !Options.YearHasta &&
            !Options.brand &&
            !Options.model &&
            Options.rangoPrice[0] === 0 &&
            Options.rangoPrice[1] === 100000;

        if (areAllOptionsEmpty) {
            setSerchingCar(ListCar);
            return;
        }


        let filteredCars = ListCar.filter((car) => {
            const { Title, Brand, Model, Year } = car.Sale.CarDetails;
            const Price = car.Sale.Price.Price;

            const matchesSearch = Options.search.trim().length !== 0 ?
                normalizeString(Title).includes(normalizeString(Options.search)) : true;

            const matchesBrand = Options.brand ?
                normalizeString(Brand) === normalizeString(Options.brand) : true;

            const matchesModel = Options.model ?
                normalizeString(Model) === normalizeString(Options.model) : true;

            const matchesYear = (Options.YearDesde || Options.YearHasta) ?
                (Year >= (Options.YearDesde || Year) && Year <= (Options.YearHasta || Year)) : true;

            const matchesPrice = Options.rangoPrice.length === 2 ?
                (Price >= Options.rangoPrice[0] && Price <= Options.rangoPrice[1]) : true;

            return matchesSearch && matchesBrand && matchesModel && matchesYear && matchesPrice;
        });

        setSerchingCar(filteredCars);
    }



    const handleSearching = (Status, Options) => {

        const normalizeString = (str) => {
            return str.toLowerCase().trim().replace(/\s+/g, ' ');
        }

        if (Status === 'Todo') {

            filterCars(ListCar, Options, normalizeString)

        } else if (Status === 'Nuevo') {

            filterCars(LisCarNew, Options, normalizeString)

        } else if (Status === 'Usado') {
            filterCars(LisCarUsed, Options, normalizeString)
        }
    }

    return (
        <Context.Provider
            value={{
                user,
                setSliderImg,
                handleRefresh,
                CarAvailable,
                setAvailable,
                DeleteReservation,
                SaveCarSale,
                SaveMedia,
                SaveArchivo,
                WhichRole,
                setWhichRole,
                SignInAuth,
                LognInAuth,
                logout,
                ListUser,
                ListAllUser,
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
                ListReservation,
                setListReservation,
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
                setBackgroundImage,
                BackgroundImage,
                GetContact,
                setCheckContact,
                setchangeReserve,
                AchievementsImage, setAchievementsImage,
                AchievementsText, setAchievementsText,
                SellmycarIconServices, setSellmycarIconServices,
                SellusedcarIconServices, setSellusedcarIconServices,
                SellnewcarIconServices, setSellnewcarIconServices,
                ServicesTitle, setServicesTitle,
                FirstBackgroundImage, setFirstBackgroundImage,
                DateButton, setDateButton,
                Paragraph, setParagraph,
                FirstTitle, setFirstTitle,
                CheckAbout, setCheckAbout,
                setSerchingCar,
                setisFilter,
                isFilter,
                SerchingCar,
                handleSearching
            }}
        >
            {children}
        </Context.Provider>
    );

}