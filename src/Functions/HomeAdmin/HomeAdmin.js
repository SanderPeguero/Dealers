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



export const GetContact = async (setTitleContact, setUbicationContacts, setGmailContact, setPhoneContact, setTitletwoContact, setSocialnetworks,setBackgroundImage) => {

    const ContactRef = ref(db, 'Contact');
    try {
        const ContactSnashop = await get(ContactRef);

        if (ContactSnashop.exists()) {
            const ContactData = ContactSnashop.val();
            // console.log(ContactData)

            setTitleContact(ContactData.TitleContact)
            setUbicationContacts(ContactData.Ubicacion)
            setGmailContact(ContactData.Gmail)
            setPhoneContact(ContactData.Phone)
            setTitletwoContact(ContactData.Titletwo)
            setSocialnetworks(ContactData.SocialMedia)
            setBackgroundImage(ContactData.BackgroundImage)

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

export const BackImage = async (datos, index) => {
    const ContactRef = ref(db, 'Contact');
    try {

        const snapshot = await get(ContactRef);
        if (snapshot.exists()) {
            const currentData = snapshot.val();
            let BackgroundImageArray = currentData.BackgroundImage || [];

            if (index >= 0 && index < BackgroundImageArray.length) {
               
                BackgroundImageArray[index] = datos;

                await update(ContactRef, { BackgroundImage: BackgroundImageArray });
                console.log("Imagen de Fondo de Contacto actualizada");
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

export const uploadBackgroundImage = async (file) => {

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

export const AddNewBackgroundImage = async (NewBackground) => {
    const ContactRef = ref(db, 'Contact');
    try {
        const snapshot = await get(ContactRef);
        if (snapshot.exists()) {
            const currentData = snapshot.val();
            let BackgroundImageArray = currentData.BackgroundImage || [];

            // Agregar la nueva red social al final del arreglo
            BackgroundImageArray.push(NewBackground);

            // Subir el arreglo actualizado de nuevo a Firebase
            await update(ContactRef, { BackgroundImage: BackgroundImageArray });
            console.log("Nueva Imagen de Fondo de Contacto Agregada" );
            console.log(NewBackground.Url)
        } else {
            console.error("No se encontraron datos en Contact");
        }
    } catch (error) {
        console.error("Error al agregar nueva Imagen de Fondo de Contacto", error);
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

export const GetAbout = async (setFirstTitle, setParagraph, setDateButton, setFirstBackgroundImage, setServicesTitle, setSellnewcarIconServices,setSellusedcarIconServices, setSellmycarIconServices, setAchievementsText, setAchievementsImage   ) => {

    const AboutUsRef = ref(db, 'AboutUS');
    try {
        const AboutUsSnashop = await get(AboutUsRef);

        if (AboutUsSnashop.exists()) {
            const AboutUsData = AboutUsSnashop.val();
            // console.log(ContactData)

            setFirstTitle(AboutUsData.TitleOne)
            setParagraph(AboutUsData.FirstParagraph)
            setDateButton(AboutUsData.Date)
            setFirstBackgroundImage(AboutUsData.FirstBackground)
            setServicesTitle(AboutUsData.SecondTitle)
            setSellnewcarIconServices(AboutUsData.NewCarIcon)
            setSellusedcarIconServices(AboutUsData.UsedCarIcon)
            setSellmycarIconServices(AboutUsData.SellMyCarIcon)
            setAchievementsText(AboutUsData.Achievements)
            setAchievementsImage(AboutUsData.AchievementsImg)
        } else {
            console.log("No data available");

        }
    } catch (error) {
        console.error("Error:", error);

    }

}

export const editFirstTitle = async (NewTitle) => {
    const AboutUsRef = ref(db, 'AboutUS');
    try {
        await update(AboutUsRef, { TitleOne: NewTitle });
        console.log("Título actualizado");
    } catch (error) {
        console.error("Error al actualizar el título:", error);
    }
};

export const editParagraph = async (NewParagraph) => {
    const AboutUsRef = ref(db, 'AboutUS');
    try {
        await update(AboutUsRef, { FirstParagraph: NewParagraph });
        console.log("Parrafo actualizado");
    } catch (error) {
        console.error("Error al actualizar el Parrafo:", error);
    }
};
export const editDateButton = async (NewDateButton) => {
    const AboutUsRef = ref(db, 'AboutUS');
    try {
        await update(AboutUsRef, { Date: NewDateButton });
        console.log("Fecha actualizada");
    } catch (error) {
        console.error("Error al actualizar la Fecha:", error);
    }
};
export const editServicesTitle = async (NewServicesTitle) => {
    const AboutUsRef = ref(db, 'AboutUS');
    try {
        await update(AboutUsRef, { SecondTitle: NewServicesTitle });
        console.log("Titulo de Servicios actualizado");
    } catch (error) {
        console.error("Error al actualizar Titulo de Servicios:", error);
    }
};
export const editAchievementsText = async (NewAchievementsText) => {
    const AboutUsRef = ref(db, 'AboutUS');
    try {
        await update(AboutUsRef, { Achievements: NewAchievementsText });
        console.log("Parrafo de Logros actualizado");
    } catch (error) {
        console.error("Error al actualizar Parrafo de Logros:", error);
    }
};

export const FirstImageAbout = async (datos) => {
    const AboutUsRef = ref(db, 'AboutUS');
    try {

           update(AboutUsRef, { FirstBackground: datos });
           console.log("Imagen de Presentación actualizada");
            
    } catch (error) {
        console.error("Error al actualizar", error);
    }
};

export const uploadFirstImageAbout = async (file) => {

    const storageRef = storageref(storage, `AboutUS/${file.name}`);
    try {

        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        return url;
    } catch (error) {
        console.error("Error al subir la imagen:", error);
        return null;
    }
};
export const AddNewFirstImageAbout = async (NewFirstImageAbout) => {
    const AboutUsRef = ref(db, 'AboutUS');
    try {
            await update(AboutUsRef, { FirstBackground: NewFirstImageAbout });
            console.log("Nueva Imagen de Presentación Agregada" );
            console.log(NewFirstImageAbout.Url)

    } catch (error) {
        console.error("Error al agregar nueva Imagen de Presentación", error);
    }
};




export const AchievementsImg = async (datos) => {
    const AboutUsRef = ref(db, 'AboutUS');
    try {

           update(AboutUsRef, { AchievementsImg: datos });
           console.log("Imagen de Logros Actualizada");
            
    } catch (error) {
        console.error("Error al actualizar", error);
    }
};

export const uploadAchievementsImg = async (file) => {

    const storageRef = storageref(storage, `AboutUS/${file.name}`);
    try {

        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        return url;
    } catch (error) {
        console.error("Error al subir la imagen:", error);
        return null;
    }
};

export const AddAchievementsImg = async (NewAchievementsImg) => {
    const AboutUsRef = ref(db, 'AboutUS');
    try {
            await update(AboutUsRef, { AchievementsImg: NewAchievementsImg });
            console.log("Nueva Imagen de Logro Agregada" );
            console.log(NewAchievementsImg.Url)

    } catch (error) {
        console.error("Error al agregar nueva Imagen de Logro", error);
    }
};





