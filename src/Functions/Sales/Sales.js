import { dbFire, storage } from "../../firebase/firebase"
import { collection, addDoc, getDocs, onSnapshot,deleteDoc, doc, updateDoc } from "firebase/firestore"
import { ref as storageref, uploadBytes, getDownloadURL } from "firebase/storage"

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
