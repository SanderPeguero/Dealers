import React from 'react'
import mainimage from "../../assets/img/mainimage.png"
import Aboutcaroneicon from "../../assets/img/Aboutcaroneicon.png"
import Aboutcartwoicon from "../../assets/img/Aboutcartwoicon.png"
import Aboutlabelicon from "../../assets/img/Aboutlabelicon.png"
import ThirdImage from "../../assets/img/ThirdImage.png"
import Testimonioone from "../../assets/img/Testimonioone.png"
import Teslalogo from "../../assets/img/Teslalogo.png"
import Audilogo from "../../assets/img/Audilogo.png"
import Fiatlogo from "../../assets/img/Fiatlogo.png"
import Hyundailogo from "../../assets/img/Hyundailogo.png"
import Peugeotlogo from "../../assets/img/Peugeotlogo.png"
import Volvologo from "../../assets/img/Volvologo.png"

function AboutUS() {
  return (
    <div className="py-14 mt-20 w-full  max-md:max-w-full bg-[#0B0C10] ">
        <section className=" w-full  md:pl-[150px] pr-3 pl-3 md:pr-[150px] lg:pl-[200px] lg:pr-[200px] xl:pl-[500px] xl:pr-[500px] max-md:max-w-full text-white ">
            <h1 className='text-white text-3xl text-center'>Sobre Nosotros</h1>
            <p className='mt-4 text-center'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto voluptatibus maiores
                 officiis quia mollitia. Dignissimos, fugit! Dolores odio harum voluptatum,
                architecto earum aperiam suscipit, praesentium, odit eveniet optio magni asperiores.
            </p>
            <div className='m-auto text-center'>
                <button className='mt-10 border border-sky-500 p-2'>June, 22 2024</button>
            </div>
            
        </section>
        <section className='mt-20 md:p-20  w-full'>
            <img className='md:w-full h-full' src={mainimage} alt="MainImage" />
        </section>
        <section className='text-white w-full mt-10 '>
            <h1 className='lg:text-5xl text-2xl md:text-4xl text-center'>Nuestros Servicios</h1>
            <div className='mt-11 p-2  md:p-10 md:flex justify-center gap-10 text-center'>
                <div className='border w-[80%] h-[140px] rounded-lg p-5 m-auto  lg:w-[300px] md:p-5 md:w-[250px]  border-sky-500 lg:p-12 items-center'>
                    <img className='items-center m-auto' src={Aboutcaroneicon} alt="CarIcon" />
                    <p>Comprar un auto nuevo</p>
                </div>
                <div className='border w-[80%] h-[140px] mt-10 rounded-lg p-5 m-auto md:mt-0 lg:w-[300px] md:p-5 md:w-[250px]   border-sky-500 lg:p-12 items-center'>
                    <img className='items-center m-auto' src={Aboutcartwoicon} alt="CarIcon" />
                    <p>Comprar un auto usado</p>
                </div>
                <div className='border w-[80%] h-[140px] mt-10 rounded-lg p-5 md:mt-0 m-auto lg:w-[300px]  md:p-5 md:w-[250px]  border-sky-500 lg:p-12 items-center'>
                    <img className='items-center m-auto' src={Aboutlabelicon} alt="LabelIcon" />
                    <p>Vender mi Auto</p>
                </div>
            </div>
        </section>
        <section className='text-white mt-14 md:flex lg:flex lg:justify-between m-5 p-5 md:ml-[5px] rounded-lg md:mr-[5px] lg:m-20 gap-3 bg-[#12232E]'>
            <div className='lg:w-[800px] xl:p-20 m-auto md:w-[600px]'>
                <p className='lg:p-5 md:p-2 text-center md:text-justify'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae tempora
                     dolorem enim a distinctio, aliquid delectus vitae
                     expedita facilis quibusdam corrupti obcaecati veniam? Quasi qui unde
                      ipsam exercitationem ullam beatae?
                </p>
                <div className='grid grid-cols-2 mt-5 md:mt-0 m-auto md:p-2 lg:pr-3 lg:pl-5 xl:p-10 xl:gap-2'>
                    <div>
                        <p className='xl:text-6xl lg:text-4xl md:text-[40px] text-[37px] '>150</p>
                        <hr className='border w-[80%] border-sky-500' />
                        <hr className='w-[50%] border border-sky-500  mt-2' />
                        <p className='xl:text-2xl'>Vehiculo en Stock</p>
                    </div>

                    <div>
                        <p className='xl:text-6xl lg:text-4xl md:text-[40px] text-[37px]'>40</p>
                        <hr className='border w-[80%] border-sky-500' />
                        <hr className='w-[50%] border border-sky-500  mt-2' />
                        <p className='xl:text-2xl'>Coches Vendidos</p>
                    </div>

                    <div>
                        <p className='xl:text-6xl lg:text-4xl md:text-[40px] text-[37px]'>38</p>
                        <hr className='border w-[80%] border-sky-500' />
                        <hr className='w-[50%] border border-sky-500  mt-2' />
                        <p className='xl:text-2xl'>Clientes Felices</p>
                    </div>

                    <div>
                        <p className='xl:text-6xl lg:text-4xl md:text-[40px] text-[37px]'>5</p>
                        <hr className='border w-[80%] border-sky-500' />
                        <hr className='w-[50%] border border-sky-500  mt-2' />
                        <p className='xl:text-2xl'>Premios</p>
                    </div>
                </div>
            </div>


            <div className='bg-white rounded-xl'>
                <img className='lg:w-full lg:h-full md:w-full md:h-full hidden md:flex  ' src={ThirdImage} alt="ThirdImage" />
            </div>
        </section>

        <section className='text-white'>
            <h1 className='text-center text-4xl m-4'>Testimonios</h1>
            <div className='flex gap-1 md:gap-10 overflow-x-scroll overflow-y-hidden'>
                <div className='flex lg:w-[90rem] w-[350px] md:w-[600px] p-2 m-auto bg-[#12232E]'>
                    <div className='m-auto'>
                        <img className='lg:w-[600px] md:w-[500px] w-[300px]  md:h-full'  src={Testimonioone} alt="Testimonioone" />
                    </div>
                    <div className='lg:w-[800px] md:w-[850px] w-[500px] px-2 md:px-7'>
                        <h2 className='text-sky-500 text-[14px]'>Omar Mango</h2>
                        <h3 className='text-sky-500 text-[12px]'>Customer</h3>
                        <p className='md:mt-5 text-justify md:text-[12px] lg:text-[14px] text-[9px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quas,
                            ipsam debitis nemo aperiam aliquam inventore quae mollitia
                            cum totam autem voluptatibus sapiente quaerat at architecto harum, incidunt dolores iste.
                        </p>
                    </div>
                </div>


                <div className='flex lg:w-[90rem] w-[350px] md:w-[600px] p-2 m-auto bg-[#12232E]'>
                    <div className='m-auto'>
                        <img className='lg:w-[600px] md:w-[500px] w-[300px]  md:h-full'  src={Testimonioone} alt="Testimonioone" />
                    </div>
                    <div className='lg:w-[800px] md:w-[850px] w-[500px] px-2 md:px-7'>
                        <h2 className='text-sky-500 text-[14px]'>Omar Mango</h2>
                        <h3 className='text-sky-500 text-[12px]'>Customer</h3>
                        <p className='md:mt-5 text-justify md:text-[12px] lg:text-[14px] text-[9px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quas,
                            ipsam debitis nemo aperiam aliquam inventore quae mollitia
                            cum totam autem voluptatibus sapiente quaerat at architecto harum, incidunt dolores iste.
                        </p>
                    </div>
                </div>


                <div className='flex lg:w-[90rem] w-[350px] md:w-[600px] p-2 m-auto bg-[#12232E]'>
                    <div className='m-auto'>
                        <img className='lg:w-[600px] md:w-[500px] w-[300px]  md:h-full'  src={Testimonioone} alt="Testimonioone" />
                    </div>
                    <div className='lg:w-[800px] md:w-[850px] w-[500px] px-2 md:px-7'>
                        <h2 className='text-sky-500 text-[14px]'>Omar Mango</h2>
                        <h3 className='text-sky-500 text-[12px]'>Customer</h3>
                        <p className='md:mt-5 text-justify md:text-[12px] lg:text-[14px] text-[9px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quas,
                            ipsam debitis nemo aperiam aliquam inventore quae mollitia
                            cum totam autem voluptatibus sapiente quaerat at architecto harum, incidunt dolores iste.
                        </p>
                    </div>
                </div>
            </div>
            
        </section>

        <section className='flex p-14 m-auto items-center gap-24 overflow-x-auto'>

                <img className='m-auto' src={Teslalogo} alt="Teslalogo" />

                <img className='m-auto' src={Audilogo} alt="Audilogo" />

  
                <img className='m-auto' src={Fiatlogo} alt="Fiatlogo" />
       
        
                <img className='m-auto' src={Hyundailogo} alt="Hyundailogo" />
            
            
                <img className='m-auto' src={Peugeotlogo} alt="Peugeotlogo" />
            
          
                <img className='m-auto' src={Volvologo} alt="Volvologo" />
            
        </section>
     
    </div>

  )
}

export default AboutUS