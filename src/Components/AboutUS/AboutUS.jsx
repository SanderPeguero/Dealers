
import React, { useEffect, useState } from "react";
import mainimage from "../../assets/img/mainimage.png"
import Aboutcaroneicon from "../../assets/img/Aboutcaroneicon.png"
import Aboutcartwoicon from "../../assets/img/Aboutcartwoicon.png"
import Aboutlabelicon from "../../assets/img/Aboutlabelicon.png"
import ThirdImage from "../../assets/img/ThirdImage.png"
import Testimonioone from "../../assets/img/Testimonioone.png"
import Teslalogo from "../../assets/img/Teslalogo.png"
import { FaEdit } from "react-icons/fa";
import Audilogo from "../../assets/img/Audilogo.png"
import Fiatlogo from "../../assets/img/Fiatlogo.png"
import Hyundailogo from "../../assets/img/Hyundailogo.png"
import Peugeotlogo from "../../assets/img/Peugeotlogo.png"
import Volvologo from "../../assets/img/Volvologo.png"
import { useContextCar } from "../../Context/Context";
import AddPresentationImage from "./AddPresentationImage";
import AddAchievementsModal from "./AddAchievementsModal";
import { editFirstTitle, editParagraph, editDateButton, editServicesTitle, editAchievementsText } from "../../Functions/HomeAdmin/HomeAdmin";
function AboutUS() {
    const [openPresentationModal, setOpenPresentationModal]= useState (false)
    const [openAchievementsModal, setopenAchievementsModal]= useState (false)
    const HandleOpenModal =()=>{
        setOpenPresentationModal(true)
    }
    const HandleCloseModal =()=>{
        setOpenPresentationModal(false)
    }
    const HandleOpenAchievementsModal =()=>{
        setopenAchievementsModal(true)
    }
    const HandleCloseAchievementsModal =()=>{
        setopenAchievementsModal(false)
    }
    const { user, WhichRole, GetAbout, AchievementsImage, setAchievementsImage,AchievementsText, setAchievementsText,SellmycarIconServices, setSellmycarIconServices,SellusedcarIconServices, setSellusedcarIconServices,SellnewcarIconServices, setSellnewcarIconServices,ServicesTitle, setServicesTitle,FirstBackgroundImage, setFirstBackgroundImage,DateButton, setDateButton,Paragraph, setParagraph,FirstTitle, setFirstTitle, } = useContextCar()
        const handleEditFirstTitle = () => {
            const NewTitle = prompt('Editar Titulo', FirstTitle);
            if (NewTitle !== null) {
                editFirstTitle(NewTitle)
                GetAbout(setFirstTitle, setParagraph, setDateButton, setServicesTitle, setAchievementsText)
            }
        }

        const handleEditParagraph = () => {
            const NewParagraph = prompt('Editar Parrafo', Paragraph);
            if (NewParagraph !== null) {
                editParagraph(NewParagraph)
                GetAbout(setFirstTitle, setParagraph, setDateButton, setServicesTitle, setAchievementsText)
            }
        }

        const handleEditDateButton = () => {
            const NewDate = prompt('Editar Parrafo', DateButton);
            if (NewDate !== null) {
                editDateButton(NewDate)
                GetAbout(setFirstTitle, setParagraph, setDateButton, setServicesTitle, setAchievementsText)
            }
        }
        const handleEditServicesTitle = () => {
            const NewServicesTitle = prompt('Editar Titulo de Servicios', ServicesTitle);
            if (NewServicesTitle !== null) {
                editServicesTitle(NewServicesTitle)
                GetAbout(setFirstTitle, setParagraph, setDateButton, setServicesTitle, setAchievementsText)
            }
        }
        const handleEditAchievementsText = () => {
            const NewAchievementsText = prompt('Editar Parrafo de Logros', AchievementsText);
            if (NewAchievementsText !== null) {
                editAchievementsText(NewAchievementsText)
                GetAbout(setFirstTitle, setParagraph, setDateButton, setServicesTitle, setAchievementsText)
            }
        }
        const [selectedImageUrl, setSelectedImageUrl] = useState('');
        const handleImageSelected = (imageUrl) => {
            setSelectedImageUrl(imageUrl);
          };
  return (
    <div className="py-14 mt-20 w-full  max-md:max-w-full bg-[#0B0C10] ">
        <section className=" w-full  md:pl-[150px] pr-3 pl-3 md:pr-[150px] lg:pl-[200px] lg:pr-[200px] xl:pl-[500px] xl:pr-[500px] max-md:max-w-full text-white ">
            <div className="flex justify-center">
                <h1 className='text-white text-3xl text-center'>{FirstTitle}</h1>
                <div>
                    {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                        <div className="px-3 py-2 text-xs">
                            <button onClick={() => handleEditFirstTitle()}  className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                <FaEdit size={14} className="text-yellow-400" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-center">
                <p className='mt-4 text-center '>{Paragraph}
                </p>
                <div>
                    {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                        <div className="px-3 py-2 text-xs">
                            <button onClick={() => handleEditParagraph()}  className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                <FaEdit size={14} className="text-yellow-400" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
            
            <div className='m-auto text-center'>
                <div className="flex justify-center">
                     <button className='mt-10 border rounded-lg border-sky-500 p-2'>{DateButton}</button>
                     {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                        <div className="px-3 py-2 text-xs">
                            <button onClick={() => handleEditDateButton()}  className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                <FaEdit size={14} className="text-yellow-400" />
                            </button>
                        </div>
                    )}
                </div>
               

            </div>
            
        </section>
        <section className=' md:p-20  w-full'>
            <div>
                {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                    <div className="px-3 py-2 flex justify-center   text-xs leading-4">
                        <button onClick={HandleOpenModal} className=" flex px-6    py-2 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                            <FaEdit size={14} className="text-yellow-400 " />
                            <div className="mx-2 text-yellow-500">Editar Imagen</div>
                        </button>
                        <AddPresentationImage onImageSelected={handleImageSelected}  openPresentationModal={openPresentationModal} HandleCloseModal={HandleCloseModal} />
                        
                    </div>
                )}
                <img src={FirstBackgroundImage?.UrlPresentationImage} className='md:w-full md:h-[900px] w-full h-full rounded-xl'  alt="MainImage" />
                
            </div>
            
            
            
        </section>
        <section className='text-white w-full mt-10 '>
            <div className="flex justify-center">
                <h1 className='lg:text-5xl text-2xl md:text-4xl text-center'>{ServicesTitle}</h1>
                {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                        <div className="px-3 py-2 text-xs">
                            <button onClick={() => handleEditServicesTitle()}  className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                <FaEdit size={14} className="text-yellow-400" />
                            </button>
                        </div>
                    )}
            </div>
            
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
                <div className="flex flex-col-reverse">
                    <p className='lg:p-5 md:p-2 text-center md:text-justify'>{AchievementsText}</p>
                    {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                        <div className="px-3 py-2 text-xs">
                            <button onClick={() => handleEditAchievementsText()}  className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                <FaEdit size={14} className="text-yellow-400" />
                            </button>
                        </div>
                    )}
                </div>
                
                <div className='grid grid-cols-2 mt-5 md:mt-0 m-auto md:p-2 lg:pr-3 lg:pl-5 xl:p-10 xl:gap-2'>
                    <div>
                        <p className='xl:text-6xl lg:text-4xl md:text-[40px] text-[37px] '>150</p>
                        <hr className='border w-[80%] border-sky-500' />
                        <hr className='w-[50%] border border-sky-500  mt-2' />
                        <p className='xl:text-2xl'>Coches Disponibles</p>
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


            <div className='flex flex-col-reverse rounded-xl'>
                <img className='lg:w-full lg:h-full rounded-xl md:w-full md:h-full hidden md:flex  ' src={AchievementsImage?.UrlAchievementsImg} alt="ThirdImage" />
                <div>
                    {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                        <div className="flex justify-center px-3 py-2 text-xs">
                            <button onClick={() => HandleOpenAchievementsModal()}  className="px-6 flex py-3 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                <FaEdit size={14} className="text-yellow-400" />
                                <div className="mx-2 text-yellow-500">Editar Imagen</div>
                            </button>
                            <AddAchievementsModal openAchievementsModal={openAchievementsModal} HandleCloseAchievementsModal={HandleCloseAchievementsModal}/>
                        </div>
                    )}
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