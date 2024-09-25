import React from 'react'
import CarLogo from '../../assets/Footer/CarLogo.png'
import Facebook from '../../assets/Footer/Facebook.png'
import Instagram from '../../assets/Footer/instagram.png'
import Youtube from '../../assets/Footer/youtube.png'
import { useContextCar } from '../../Context/Context'
const Footer = () => {

    const { PhoneContact, GmailContact, UbicationContacts, Socialnetworks } = useContextCar()


    return (
        <footer className="bg-white text-black dark:bg-[#12232E] dark:text-white p-4 text-center">
            <div className=" container mx-auto">
                <div className='flex justify-center '>
                    <img className='' src={CarLogo} />
                </div>
                <div className='border border-gray-600 my-8'></div>
                <div className=' grid lg:grid-cols-3  justify-center   w-full'>
                    <div className=' grid lg:grid-cols-1 items-center w-full'>
                        <a href='#/AboutUS' className='mb-4  cursor-pointer' >
                            SOBRE NOSOTROS
                        </a>

                        <div className='mb-4 '>
                            CONTACTO
                        </div>
                    </div>

                    <div className=' grid lg:grid-cols-1 items-center w-full'>
                        <div className='mb-4 '>
                            {GmailContact}
                        </div>
                        <div className='mb-4  '>
                            {PhoneContact}
                        </div>
                    </div>
                    <div className='grid lg:grid-cols-1 w-full items-center'>
                        <div className='flex  items-center justify-center'>
                            <p className="line-clamp-3 w-[10rem]">
                                {UbicationContacts}</p>
                        </div>



                        <div className='mt-4 '>
                            <div className='flex flex-row items-center justify-center  '>
                               

                                {Socialnetworks.map((social, index) => (
                                    <div key={index} className="flex flex-col mr-4 ">
                                        <div className="">
                                            <a href={social?.UrlRedSocial} target="_blank" rel="noopener noreferrer"> 
                                                <img className="w-8 duration-200 rounded-full" src={social?.UrlImgRedSocial} alt="Facebook" /></a>
                                        </div>

                                    </div>
                                )
                                )}
                            </div>


                        </div>
                    </div>
                </div>


                <div className='border border-gray-600 my-8 '></div>
                <p className=''>&copy; 2021 Atom Dev Team. All Rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer