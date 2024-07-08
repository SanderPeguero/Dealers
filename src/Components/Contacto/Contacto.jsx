

import Facebook from "../../assets/Footer/Facebook.png"
import instagram from "../../assets/Footer/instagram.png"
import youtube from "../../assets/Footer/youtube.png"

import SFMImage from "../../assets/img/SFMImage.jpg"
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

// const mapStyles = {
//     height: '300px',
//     width: '100%',
// };
// const defaultCenter = {
//     lat: 37.7749,
//     lng: -122.4194,
// };
const Contacto = () => {
    
    return (
        // style={{backgroundImage: `url( ${Dealer})`}}  
        <div style={{backgroundImage: `url( ${SFMImage})`}}   className=" bg-fixed flex bg-[#12232E] overflow-hidden relative flex-col justify-center items-center px-16 py-1 mt-20 w-full min-h-[768px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
            
            <div className="bg-transparent relative w-full max-w-[1226px] max-md:max-w-full">
                <h1 className="text-3xl text-white font-bold"> Contáctanos</h1>
                <hr />
                <div className="bg-transparent mt-6 brightness-105 z-50  gap-5 max-md:flex-col max-md:gap-0">
                    {/* <LoadScript googleMapsApiKey="AIzaSyCQuMGa2ltQrJMrqUYJUaS48CYZcgfPNO8">
                        <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter} />
                    </LoadScript> */}
                    <div className=" mt-10 m-auto md:flex justify-center gap-28 ">
                        <div className=" brightness-110 text-white text-center font-bold"> 
                            <h2 className=" text-2xl font-bold">Encuéntranos</h2>
                            <div className='f'>
                                #12 Av. Antonio G., <br />
                                San Frac., Duarte, <br />
                                31000,
                                Rep. Domicana
                            </div>
                            <div className='mb-4 '>
                                SERVICIO AL CLIENTE
                            </div>
                            <div className='mb-4'>
                                info@car.com
                            </div>
                            <div className='mb-4'>
                                588-865-3730
                            </div>
                        </div>
                        <div>
                            <h2 className=" text-white text-2xl font-bold text-center " >Siguenos en nuestras Redes Sociales</h2>
                            <div className=" flex m-auto mt-20 items-center justify-between w-full">
                                <div className="hover:rotate-[360deg] hover:scale-125 hover:transition-all transition-all">
                                    <a href="#"><img className="w-16 duration-200" src={Facebook} alt="Facebook" /></a>
                                </div>
                                <div className="hover:rotate-[360deg] hover:scale-125 hover:transition-all transition-all"> 
                                    <a href="#"><img className="w-16" src={instagram} alt="Instagram" /></a>
                                </div>
                                <div className="hover:rotate-[360deg] hover:scale-125 hover:transition-all transition-all">
                                    <a href="#"><img className=" w-16" src={youtube} alt="Twitter" /></a>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

        
        </div>
    );

}
export default Contacto;
