import { db, storage } from "../../firebase/firebase";
import { set, ref, get, update } from "firebase/database"
import { ref as storageref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"

export const GetHero = async (setTitleHero, setDescriptionHero, setSliderImg) => {
    const HeroRef = ref(db, 'Hero');

    try {
        const HeroSnashop = await get(HeroRef);

        if (HeroSnashop.exists()) {
            const HeroData = HeroSnashop.val();
            setTitleHero(HeroData.Title)
            setDescriptionHero(HeroData.Description)
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

export const editTitleHero = async (newTitle) => {
    const HeroRef = ref(db, 'Hero');
    try {
        await update(HeroRef, { Title: newTitle });
        console.log("Título actualizado");
    } catch (error) {
        console.error("Error al actualizar el título:", error);
    }
};

export const editDescriptionHero = async (newDescription) => {
    const HeroRef = ref(db, 'Hero');
    try {
        await update(HeroRef, { Description: newDescription});
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



export const GetContact = async (setTitleContact, setUbicationContact, setGmailContact, setPhoneContact, setTitletwoContact, setSocialnetworks) => {

    const ContactRef = ref(db, 'Contact');
    try {
        const ContactSnashop = await get(ContactRef);

        if (ContactSnashop.exists()) {
            const ContactData = ContactSnashop.val();
            // console.log(ContactData)

            setTitleContact(ContactData.TitleContact)
            setUbicationContact(ContactData.Ubication)
            setGmailContact(ContactData.Gmail)
            setPhoneContact(ContactData.Phone)
            setTitletwoContact(ContactData.Titletwo)
            setSocialnetworks(ContactData.SocialMedia)

        } else {
            console.log("No data available");

        }
    } catch (error) {
        console.error("Error:", error);

    }

}


export const editTitleContact = async (newTitleContact) => {
    const ContactRef = ref(db, 'Contact');
    try {
        await update(ContactRef, { TitleContact: newTitleContact });
        console.log("Título de Contacto Actualizado");
    } catch (error) {
        console.error("Error al actualizar el título de Contacto:", error);
    }
};


export const editUbicationContact = async (newUbicationContact) => {
    const ContactRef = ref(db, 'Contact');
    try {
        await update(ContactRef, { Ubication: newUbicationContact });
        console.log("Ubicacion de Contacto Actualizado");
    } catch (error) {
        console.error("Error al actualizar la Ubicacion de Contacto:", error);
    }
};

// SocialMedia: [
//     { name: "Facebook", UrlRedSocial: "", UrlImgRedSocial: "https://firebasestorage.googleapis.com/v0/b/cars-showroom-d3aa2.appspot.com/o/Contact%2Ffacebooktwo.png?alt=media&token=ce102840-491e-4e8c-9ac1-b614cce640a5" },
//     { name: "Instagram", UrlRedSocial: "", UrlImgRedSocial: "https://firebasestorage.googleapis.com/v0/b/cars-showroom-d3aa2.appspot.com/o/Contact%2Finstagramtwo.png?alt=media&token=7fe30ffa-ecdf-458c-8d77-f6bc8b1c8a70" },
//     { name: "Twitter", UrlRedSocial: "", UrlImgRedSocial: "https://firebasestorage.googleapis.com/v0/b/cars-showroom-d3aa2.appspot.com/o/Contact%2Ftwitter.png?alt=media&token=b65b134e-7424-415f-9131-b44119c0deb9" },
// ]

export const ImagenRedSocial = async (datos, index) => {
    const ContactRef = ref(db, 'Contact');
    try {

        const snapshot = await get(ContactRef);
        if (snapshot.exists()) {
            const currentData = snapshot.val();
            let socialMediaArray = currentData.SocialMedia || [];

            if (index >= 0 && index < socialMediaArray.length) {
               
                socialMediaArray[index] = datos;

                await update(ContactRef, { SocialMedia: socialMediaArray });
                console.log("Red social actualizada");
            } else {
                console.error("Índice fuera de rango");
            }
        } else {
            console.error("No se encontraron datos en Contact");
        }
    } catch (error) {
        console.error("Error al actualizar", error);
    }
};

export const uploadImageRedSocial = async (file) => {

    const storageRef = storageref(storage, `Contact/${file.name}`);
    try {

        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        return url;
    } catch (error) {
        console.error("Error al subir la imagen:", error);
        return null;
    }
};

export const AgregarRedSocial = async (nuevaRedSocial) => {
    const ContactRef = ref(db, 'Contact');
    try {
        const snapshot = await get(ContactRef);
        if (snapshot.exists()) {
            const currentData = snapshot.val();
            let socialMediaArray = currentData.SocialMedia || [];

            // Agregar la nueva red social al final del arreglo
            socialMediaArray.push(nuevaRedSocial);

            // Subir el arreglo actualizado de nuevo a Firebase
            await update(ContactRef, { SocialMedia: socialMediaArray });
            console.log("Nueva red social agregada" );
            console.log(nuevaRedSocial.Url)
        } else {
            console.error("No se encontraron datos en Contact");
        }
    } catch (error) {
        console.error("Error al agregar nueva red social", error);
    }
};

export const deleteSocialMedia = async (index) => {
    const ContactRef = ref(db, 'Contact');

    try {
        const snapshot = await get(ContactRef);
        if (snapshot.exists()) {
            const currentData = snapshot.val();
            const socialMediaArray = currentData.SocialMedia || [];

            if (index >= 0 && index < socialMediaArray.length) {
                const { UrlImgRedSocial } = socialMediaArray[index];

                // Eliminar la entrada de la base de datos
                socialMediaArray.splice(index, 1);
                await update(ContactRef, { SocialMedia: socialMediaArray });

                // Opcional: Eliminar la imagen del almacenamiento si hay una
                if (UrlImgRedSocial) {
                    const imageRef = storageref(storage, `Contact/${UrlImgRedSocial.split('/').pop()}`);
                    await deleteObject(imageRef);
                }

                console.log("Red social eliminada");
            } else {
                console.error("Índice fuera de rango");
            }
        } else {
            console.error("No se encontraron datos en Contact");
        }
    } catch (error) {
        console.error("Error al eliminar", error);
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


export const editTitletwoContact = async (newTitulotwoContact) => {
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


