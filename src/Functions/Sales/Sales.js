import { dbFire, storage, db } from "../../firebase/firebase"
import { collection, addDoc, getDocs, onSnapshot,deleteDoc, doc, updateDoc } from "firebase/firestore"
import { ref as storageref, uploadBytes, getDownloadURL } from "firebase/storage"
import { ref as refDB, set, get, update  } from "firebase/database"

export const SaveCarSale = async (datos, userId) => {

    try {

        const docRef = await addDoc(collection(dbFire, "CarSale"), datos);

    } catch (error) {

    }
}

export const SaveMedia = (file, userId, LinkUrl, setLinkUrl) => {
    const storageRef = storageref(storage, `CarSaleMultimedia/${file.name}`)
    uploadBytes(storageRef, file).then((snapshot) => {

        getDownloadURL(storageRef)
            .then((url) => {

                setLinkUrl([...LinkUrl, url])
            })
            .catch((error) => {

            });
    }).catch((error) => {

    });
}


export const SaveArchivo = (file, userId, setLinkUrl) => {
    const storageRef = storageref(storage, `CarSaleArchivo/${userId}/${file}`)
    uploadBytes(storageRef, file).then((snapshot) => {

        getDownloadURL(storageRef)
            .then((url) => {

                setLinkUrl(url)
            })
            .catch((error) => {

            });
    }).catch((error) => {

    });
}

export const GetReserva = async (setName, setPhone, setEmail, setCarName, setPrice, setCondition, setYear, setColor) => {
    const ReservaRef = ref(dbFire, 'ReservationCar');

    try {
        const ReservaSnashop = await get(ReservaRef);

        if (ReservaSnashop.exists()) {
            const ReservaData = ReservaSnashop.val();
            setName(ReservaData.UserName)
            setPhone(ReservaData.Phone)
            setEmail(ReservaData.Email)
            setCarName(ReservaData.Car)
            setPrice(ReservaData.Price)
            setCondition(ReservaData.Condition)
            setYear(ReservaData.Year)
            setColor(ReservaData.Color)
        } else {
            console.log("No data available");
            return null;
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};


export const editReserve = async (reservaId, updateData) => {
    
    try {
        const docRef = doc(dbFire, 'ReservationCar', reservaId);
        await updateDoc(docRef, updateData);
        console.log("Reserva Actualizada");
    } catch (error) {
        console.error("Error al actualizar Reserva:", error);
    }
};

export const DeleteCarSale = async (carSaleId) => {
    try {
        const confirmDelete = window.confirm("¿Estás seguro que deseas eliminar este Auto?");

        if (confirmDelete) {
            const docRef = doc(dbFire, "CarSale", carSaleId);
            await deleteDoc(docRef);
        }

    } catch (error) {
        
    }
}


export const DeleteReservation = async (ReservationId) => {
    try {
        const confirmDelete = window.confirm("¿Estás seguro que deseas eliminar esta Reserva?");

        if (confirmDelete) {
            const docRef = doc(dbFire, "ReservationCar", ReservationId);
            await deleteDoc(docRef);
        }

    } catch (error) {
        console.log("Ha salido algo mal");
    }
}

export const EditCarSale = async (carSaleId, updatedData) => {
    try {
        const docRef = doc(dbFire, "CarSale", carSaleId);
        await updateDoc(docRef, updatedData);
    } catch (error) { }
}


export const ListCarSale = async (setLisCarNew, setLisCarUsed, setListCar) => {
    try {
        const ref = collection(dbFire, "CarSale");

        const unsubscribe = onSnapshot(ref, (querySnapshot) => {
            const newCars = [];
            const usedCars = [];
            const CarSale = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const IdCarSale = doc.id;
                data.IdCarSale = IdCarSale;

                if (data.Sale.DetalleCoche?.Condicion === "Nuevo") {
                    newCars.push(data);
                } else if (data.Sale.DetalleCoche?.Condicion === "Usado") {
                    usedCars.push(data);
                }
                CarSale.push(data);

            });
            localStorage.setItem("newCars", JSON.stringify(newCars))
            setLisCarNew(JSON.parse(localStorage.getItem("newCars")));

            localStorage.setItem("usedCars", JSON.stringify(usedCars))
            setLisCarUsed(JSON.parse(localStorage.getItem("usedCars")));

            localStorage.setItem("CarSale", JSON.stringify(CarSale))
            setListCar(JSON.parse(localStorage.getItem("CarSale")));

        });

        return unsubscribe;
    } catch (error) {

    }
}


export const ReservaCar = async(reservationData) => {

    try {

    //   await dbFire.collection('ReservationCar').add(reservationData);
 
    const docRef = await addDoc(collection(dbFire, "ReservationCar"),reservationData);

    //   alert('Reservation successfully saved!');
    } catch (error) {
         console.error("Error saving reservation: ", error);
    }   


  };

  export const ListReservaCar = async () => {
    const snapshot = await getDocs(collection(dbFire, 'ReservationCar'));
    const reservas = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    return reservas;
};

export const AddItemsCar = (data) => {

    // const data = {
    //     optionBodyType: [
    //         { value: "suv", label: "SUV" },
    //         { value: "coupe", label: "Coupé" },
    //         { value: "sedan", label: "Sedán" }
    //     ],
    //     optionsBrand: [
    //         { value: "toyota", label: "Toyota" },
    //         { value: "honda", label: "Honda" },
    //         { value: "ford", label: "Ford" }
    //     ],
    //     optionsModel: [
    //         { value: "corolla", label: "Corolla" },
    //         { value: "civic", label: "Civic" },
    //         { value: "mustang", label: "Mustang" }
    //     ],
    //     optionTypeFuel: [
    //         { value: "Gasolina", label: "Gasolina" },
    //         { value: "Diésel", label: "Diésel" },
    //         { value: "Biodiésel", label: "Biodiésel" },
    //         { value: "Gas natural", label: "Gas natural" },
    //         { value: "Electricidad", label: "Electricidad" },
    //         { value: "Etanol ", label: "Etanol " },
    //     ],
    //     optionTransmission: [
    //         { value: "Transmisión Automática", label: "Transmisión Automática" },
    //         { value: "Transmisión Manual", label: "Transmisión Manual" },
    //     ],
    //     optionTraction: [
    //         { value: "Tracción delantera", label: "Tracción delantera" },
    //         { value: "Tracción trasera", label: "Tracción trasera" },
    //         { value: "Todas las ruedas", label: "Todas las ruedas" },
    //         { value: "Tracción 4×4 conectable", label: "Tracción 4×4 conectable" },
    //     ]
    // }

    const dbRef = refDB(db, 'cars/options');

    set(dbRef, data)
        .then(() => {
            console.log("Datos guardados exitosamente");
        })
        .catch((error) => {
            console.error("Error al guardar los datos: ", error);
        });
}

// Función para agregar una nueva opción
export const addNewOption = async (category, newOption, brand = '') => {
    // Define la referencia a la base de datos dependiendo de la categoría
    const dbRef = refDB(db, `cars/options/${category}`);

    try {
        const snapshot = await get(dbRef);
        const existingData = snapshot.val() || {};

        // Verifica si la opción ya está en la base de datos
        const isOptionAlreadyExists = Object.values(existingData).some(option => option.name === newOption.name);

        if (isOptionAlreadyExists) {
            alert("La opción ya está registrada. Por favor, revisa antes de agregar una nueva.");
            return; // Salir de la función si la opción ya existe
        }

        // Si la opción no existe, procede a agregarla
        const existingKeys = Object.keys(existingData);
        const highestIndex = existingKeys.length > 0 ? Math.max(...existingKeys.map(Number)) : -1;
        const newIndex = highestIndex + 1;

        // Incluye la marca en el objeto de nueva opción si está disponible
        const optionWithBrand = { ...newOption, brand };

        const updateData = {
            [newIndex]: optionWithBrand
        };

        await update(dbRef, updateData);

        alert("Nueva opción agregada exitosamente.");
    } catch (error) {
        alert("Error al agregar la nueva opción: " + error.message);
    }
};


// Función para agregar un nuevo modelo
export const addNewModel = async (model, brand) => {
    const dbRef = refDB(db, `cars/options/optionsModel/${brand}`);

    try {
        const snapshot = await get(dbRef);
        const existingData = snapshot.val() || {};

        const isModelAlreadyExists = Object.values(existingData).some(existingModel => existingModel.name === model.name);

        if (isModelAlreadyExists) {
            alert("El modelo ya está registrado para esta marca.");
            return;
        }

        const existingKeys = Object.keys(existingData);
        const highestIndex = existingKeys.length > 0 ? Math.max(...existingKeys.map(Number)) : -1;
        const newIndex = highestIndex + 1;

        const updateData = {
            [newIndex]: model
        };

        await update(dbRef, updateData);

        alert("Nuevo modelo agregado exitosamente.");
    } catch (error) {
        alert("Error al agregar el nuevo modelo: " + error.message);
    }
};

// Función para obtener las marcas
export const fetchBrands = async () => {
    const dbRef = refDB(db, 'cars/options/optionsBrand'); // Ajusta la referencia según la estructura de tu base de datos

    try {
        const snapshot = await get(dbRef);
        const brandsData = snapshot.val() || {};

        return Object.keys(brandsData).map(key => ({
            value: key,
            label: brandsData[key].label
        }));
    } catch (error) {
        console.error("Error al obtener las marcas: ", error);
        throw error;
    }
};

export const GetItemsCarDetails = async (setoptionBodyType, setoptionsBrand, setoptionsModel) => {

    const dbRef = refDB(db, 'cars/options');

    try {

        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            console.log("Datos extraídos:", data);

            setoptionBodyType(data.optionBodyType)
            setoptionsBrand(data.optionsBrand)
            setoptionsModel(data.optionsModel)
            
          
        } else {
            console.log("No hay datos disponibles");
            return null;
        }
    } catch (error) {
        console.error("Error al obtener los datos: ", error);
        return null;
    }
};

export const GetItemsCarEngine = async (setoptionTypeFuel, setoptionTransmission, setoptionTraction) => {

    const dbRef = refDB(db, 'cars/options');

    try {

        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            console.log("Datos extraídos:", data)

            setoptionTypeFuel(data.optionTypeFuel)
            setoptionTransmission(data.optionTransmission)
            setoptionTraction(data.optionTraction)
          
        } else {
            console.log("No hay datos disponibles");
            return null;
        }
    } catch (error) {
        console.error("Error al obtener los datos: ", error);
        return null;
    }
};

