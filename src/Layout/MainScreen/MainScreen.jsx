import React , {useState, useRef, useEffect} from "react"
import Navbar from "../NavBar/NavBar"
import Hero from '../../Components/Hero/Hero'
import Recomendado from "../../Components/Recomendado/Recomendado"
// import Testimonio from '../../Components/Testimono/Testimonio'
// import Contacto from '../../Components/Contacto/Contacto'
import { useContextCar } from "../../Context/Context"


const MainScreen = () => {

    const { user, WhichRole, AutosVisible,setAutosVisible, AutosInVisible,setAutosInVisible,
        ContactoVisibles, setContactoVisibles} = useContextCar()

    const AutosRef = useRef(null);
    const ContactoRef = useRef(null);

    useEffect(() => {
        if (AutosVisible === true && AutosRef.current) {
            AutosRef.current.scrollIntoView({ behavior: 'smooth' });
            setAutosVisible(false)
        }
    }, [AutosVisible]);

    useEffect(() => {
        if (ContactoVisibles === true && ContactoRef.current) {
            console.log("Scroll automatico")
            ContactoRef.current.scrollIntoView({ behavior: 'smooth' });
            setContactoVisibles(false)
        }
    }, [ContactoVisibles]);


    return (

        <div className="bg-black">
            <Navbar background={'dark:bg-[#12232E]'} />
            <Hero />
            <div ref={AutosRef} >
                <Recomendado/>
            </div>
            
        
        

            <div ref={ContactoRef}>
                {/* <Contacto /> */}
            </div>
            

        </div>
    )
}

export default MainScreen