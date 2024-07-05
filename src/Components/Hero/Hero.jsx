import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContextCar } from "../../Context/Context";
import { FaEdit } from "react-icons/fa";
import EditIma from "./EditImgSlider";
import { editTituloHero, editDescripcionHero } from "../../Functions/HomeAdmin/HomeAdmin";

const Hero = () => {
    const { user, WhichRole, TituloHero, DescripcionHero, SliderImg, setTituloHero, setDescripcionHero, setSliderImg, GetHero } = useContextCar()

    const [opentwo, setOpenTwo] = useState(false);
    const [openone, setOpenOne] = useState(false);
    const [TitleHome, setTitleHome] = useState('Encuentra el coche de tus sueños')
    const [DescHome, setDescHome] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')


    const [Todos, setTodos] = useState(true)
    const [Nuevo, setNuevo] = useState(false)
    const [Usado, setUsado] = useState(false)
    const slider = [
        "src/assets/img/Heroimg.png",
        "src/assets/img/HeroImgtwo.jpg",
        "src/assets/img/HeroImgfive.jpg",
        "src/assets/img/HeroImgsix.jpg"
    ];



    let count = 0
    const [current, setCurrent] = useState(0)
    useEffect(() => {
        Start()
    }, [])
    const Start = () => {
        setInterval(() => {
            next();
        }, 5000);
    }
    const next = () => {
        count = (count + 1) % SliderImg.length
        setCurrent(count)
    }
    const before = () => {
        const e = SliderImg.length
        count = (current + e - 1) % e
        setCurrent(count)
    }

    const handleTodo = () => {
        setTodos(true)
        setNuevo(false)
        setUsado(false)
    }

    const handleNuevo = () => {
        setTodos(false)
        setNuevo(true)
        setUsado(false)
    }

    const handleUsado = () => {
        setTodos(false)
        setNuevo(false)
        setUsado(true)
    }
    const [values, setValues] = useState([0, 3000000]);
    const min = 0;
    const max = 3000000;

    const handleEditTextHero = () => {
        const newTitle = prompt('Edit title home:', TituloHero);
        if (newTitle !== null) {
            editTituloHero(newTitle)
            GetHero(setTituloHero, setDescripcionHero, setSliderImg)
        }
    }


    const handleEditDesctHero = () => {
        const newDeesc = prompt('Edit decription home:', DescripcionHero);
        if (newDeesc !== null) {
            editDescripcionHero(newDeesc)
            GetHero(setTituloHero, setDescripcionHero, setSliderImg)
        }
    }

    const [isOpenEditImg, setisOpenEditImg] = useState(false)

    const handleOpenEditImage = () => {
        setisOpenEditImg(!isOpenEditImg)
    }

    return (
        <>
            <EditIma isOpenEditImg={isOpenEditImg} setisOpenEditImg={setisOpenEditImg} images={SliderImg} />
            <div className="flex flex-col items-center  bg-black px-16 pt-20 w-full max-md:px-5 max-md:max-w-full bg-max-h-20">

                <div className="z-10 lg:mt-32 mb-0 w-full  overflow-hidden max-w-[1040px] md:mt-5 max-md:mb-2.5 max-md:max-w-full">
                    <div className={`w-full h-full -z-50 bg-black absolute right-0 top-0  `}>
                        <img className="w-full  bg-contain brightness-50 blur-[2px] contrast-125" src={SliderImg[current]} alt="" />
                    </div>
                    <div className="md:absolute z-50 top-0 md:right-0 md:left-0 md:px-12 ">

                        <div className="lg:text-5xl md:text-4xl xl:p-20 font-semibold absolute top-20 lg:p-20 md:top-[9rem] text-white max-md:max-w-full max-md:text-4xl">
                            <h1 className="lg:text-5xl md:text-4xl md:-mt-[3rem] text-[1.2rem] xl:px-30 xl:text-6xl px-6">
                                <div className="flex flex-row items-center ">
                                    {TituloHero}
                                    {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                                        <div className="px-3 py-2   text-xs leading-4">
                                            <button onClick={() => handleEditTextHero()} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                                <FaEdit size={14} className="text-yellow-400" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </h1>
                        </div>
                        <div className="md:text-2xl xl:p-20  absolute font-semibold md:top-[13rem] z-10 top-28 lg:p-20   text-white max-md:max-w-full">

                            <div className="flex flex-row items-center">

                                <p className={`text-[0.7rem] md:-mt-[3.9rem] xl:-mt-5 md:text-[25px] px-6 xl:px-30 xl:text-4xl ${user ? WhichRole === 'admin' || WhichRole === 'Owner' ? 'w-1/2' : '' : 'w-[60%]'} `}>{formatText(DescripcionHero)}</p>
                                {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                                    <div className="px-3 py-2   text-xs leading-4">
                                        <button onClick={() => handleEditDesctHero()} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-yellow-400 hover:text-white focus:outline-none">
                                            <FaEdit size={14} className="text-yellow-400" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            {user && (WhichRole === 'admin' || WhichRole === 'Owner') && (
                                <div className="px-3 py-2 ml-[20rem]  text-xs leading-4">
                                    {/* onClick={() => handleOpenEditImage()} */}
                                    <button onClick={() => handleOpenEditImage()} className="group relative flex items-center justify-center h-12 w-1/2 md:w-48 overflow-hidden rounded-xl text-lg font-bold text-white">
                                        <span className="mr-2">Edit images</span>
                                        <FaEdit size={14} className="text-yellow-400" />
                                        <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-center md:mt-[22rem] gap-5 md:gap-5 z-50 mt-[1rem] xl:mt-[36rem] lg:gap-8 lg:mt-[28rem] opacity-45">
                            {SliderImg.map((slider, e) => {
                                return (<button onClick={() => { setCurrent(e) }} key={`circle + ${e}`} className={` w-4 h-4 xl:w-8 xl:h-8 lg:w-6 lg:h-6 md:w-6 md:h-6 rounded-full z-50 bg-cyan-900 ${e == current ? " bg-sky-500" : " bg-cyan-900"}`} ></button>)
                            })}


                        </div>


                    </div>


                    
                </div>
            </div>

        </>
    );
}

export default Hero;

const formatText = (TextHero) => {

    const words = TextHero.split(' ');

    let formattedLines = [];

    let currentLine = '';

    words.forEach((word, index) => {

        currentLine += word;

        if (index < words.length - 1) {
            currentLine += ' ';
        }

        if ((index + 1) % 4 === 0 || index === words.length - 1) {

            formattedLines.push(currentLine);

            currentLine = '';
        }
    });

    return formattedLines.join('\n');
};

