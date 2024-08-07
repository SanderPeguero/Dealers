import { db, storage } from "../../firebase/firebase";
import { set, ref, get, update } from "firebase/database"
import { ref as storageref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"

export const GetHero = async (setTituloHero, setDescripcionHero, setSliderImg,setTituloContact, setUbicacionContact, setGmailContact, setPhoneContact, setTitulotwoContact) => {
    const HeroRef = ref(db, 'Hero');

    try {
        const HeroSnashop = await get(HeroRef);

        if (HeroSnashop.exists()) {
            const HeroData = HeroSnashop.val();
            setTituloHero(HeroData.Titulo)
            setDescripcionHero(HeroData.Descripcion)
            let image = [
                HeroData.Slider1, 
                HeroData.Slider2, 
                HeroData.Slider3, 
                HeroData.Slider4
            ]
            setSliderImg(image);
        } else {
            console.log("No data available");
            return null;
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

export const editTituloHero = async (newTitulo) => {
    const HeroRef = ref(db, 'Hero');
    try {
        await update(HeroRef, { Titulo: newTitulo });
        console.log("Título actualizado");
    } catch (error) {
        console.error("Error al actualizar el título:", error);
    }
};

export const editDescripcionHero = async (newDescripcion) => {
    const HeroRef = ref(db, 'Hero');
    try {
        await update(HeroRef, { Descripcion: newDescripcion });
        console.log("Descripción actualizada");
    } catch (error) {
        console.error("Error al actualizar la descripción:", error);
    }
};

export const editSliderImage = async (imageKey, newImage) => {
    const HeroRef = ref(db, `Hero`);
    try {
        await update(HeroRef, { [imageKey]: newImage });
        console.log(`${imageKey} actualizada`);
    } catch (error) {
        console.error(`Error al actualizar ${imageKey}:`, error);
    }
};

export const uploadImage = async (file) => {

    const storageRef = storageref(storage, `SliderHero/${file.name}`);
    try {

        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        return url;
    } catch (error) {
        console.error("Error al subir la imagen:", error);
        return null;
    }
};

export const deleteImage = async (imagePath) => {
    console.log(imagePath)
    const storageRef = storageref(storage, imagePath);
    try {
        await deleteObject(storageRef);
        console.log("Imagen eliminada exitosamente");
    } catch (error) {
        console.error("Error al eliminar la imagen:", error);
    }
};

export const deleteImageURL = async (imageKey) => {
    console.log(imageKey)
    const HeroRef = ref(db, 'Hero');
    try {
        await update(HeroRef, { [imageKey]: null });
        console.log(`${imageKey} URL eliminada de la base de datos`);
    } catch (error) {
        console.error(`Error al eliminar la URL de ${imageKey}:`, error);
    }
};



export const GetContact = async (setTituloContact, setUbicacionContact, setGmailContact, setPhoneContact, setTitulotwoContact) => {

    const ContactRef = ref(db, 'Contact');
    try {
        const ContactSnashop = await get(ContactRef);

        if (ContactSnashop.exists()) {
            const ContactData = ContactSnashop.val();
           
            setTituloContact(ContactData.TituloContacto)
            setUbicacionContact(ContactData.Ubicacion)
             setGmailContact(ContactData.Gmail)
             setPhoneContact(ContactData.Phone)
             setTitulotwoContact(ContactData.TituloDos)

        } else {
            console.log("No data available");

        }
    } catch (error) {
        console.error("Error:", error);

    }

}


    export const editTituloContact = async (newTituloContact) => {
        const ContactRef = ref(db, 'Contact');
        try {
            await update(ContactRef, { TituloContacto: newTituloContact });
            console.log("Título de Contacto Actualizado");
        } catch (error) {
            console.error("Error al actualizar el título de Contacto:", error);
        }
    };


    export const editUbicacionContact = async (newUbicacionContact) => {
        const ContactRef = ref(db, 'Contact');
        try {
            await update(ContactRef, { Ubicacion: newUbicacionContact });
            console.log("Ubicacion de Contacto Actualizado");
        } catch (error) {
            console.error("Error al actualizar la Ubicacion de Contacto:", error);
        }
    };

    export const editGmailContact = async (newGmailContact) => {
        const ContactRef = ref(db, 'Contact');
        try {
            await update(ContactRef, { Gmail: newGmailContact });
            console.log("Gmail de Contacto Actualizado");
        } catch (error) {
            console.error("Error al actualizar el Gmail de Contacto:", error);
        }
    };

    export const editPhoneContact = async (newPhoneContact) => {
        const ContactRef = ref(db, 'Contact');
        try {
            await update(ContactRef, { Phone: newPhoneContact });
            console.log("Telefono de Contacto Actualizado");
        } catch (error) {
            console.error("Error al actualizar el Telefono de Contacto:", error);
        }
    };


    export const editTitulotwoContact = async (newTitulotwoContact) => {
        const ContactRef = ref(db, 'Contact');
        try {
            await update(ContactRef, { TituloDos: newTitulotwoContact });
            console.log("Titulo de Redes Sociales de Contacto Actualizado");
        } catch (error) {
            console.error("Error al actualizar el Titulo de Redes de Contacto:", error);
        }
    };

    export const updateSocialMediaLinks = async (socialLinks) => {
        const socialMediaRef = ref(db, 'SocialMediaLinks'); // Ruta en la base de datos
    
        try {
            await update(socialMediaRef, socialLinks);
            console.log("Enlaces de redes sociales actualizados");
        } catch (error) {
            console.error("Error al actualizar los enlaces de redes sociales:", error);
        }
    };


