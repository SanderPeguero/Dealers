import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContextCar } from "../../Context/Context";
import { FaEdit } from "react-icons/fa";
import { editTitleHero, editDescriptionHero } from "../../Functions/HomeAdmin/HomeAdmin";

const Hero = () => {
    const { user, WhichRole, TitleHero, DescriptionHero, SliderImg, setTitleHero, setDescriptionHero, setSliderImg, GetHero } = useContextCar()

    const [opentwo, setOpenTwo] = useState(false);
    const [openone, setOpenOne] = useState(false);
    const [TitleHome, setTitleHome] = useState('Encuentra el coche de tus sueños')
    const [DescHome, setDescHome] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')


    const [EveryThing, setEveryThing] = useState(true)
    const [New, setNew] = useState(false)
    const [Used, setUsed] = useState(false)
   



    let count = 0
    const [current, setCurrent] = useState(0)
    useEffect(() => {
        
        Start()
    }, [])
    const Start = () => {
        setInterval(() => {
            next();
        }, 7000);
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

    const handleAll = () => {
        setEveryThing(true)
        setNew(false)
        setUsed(false)
    }

    const handleNew = () => {
        setEveryThing(false)
        setNew(true)
        setUsed(false)
    }

    const handleUsed = () => {
        setEveryThing(false)
        setNew(false)
        setUsed(true)
    }
    const [values, setValues] = useState([0, 3000000]);
    const min = 0;
    const max = 3000000;

    const handleEditTextHero = () => {
        const newTitle = prompt('Edit title home:', TitleHero);
        if (newTitle !== null) {
            editTitleHero(newTitle)
            GetHero(setTitleHero, setDescriptionHero, setSliderImg)
        }
    }

    const handleEditDesctHero = () => {
        const newDeesc = prompt('Edit decription home:', DescriptionHero);
        if (newDeesc !== null) {
            editDescriptionHero(newDeesc)
            GetHero(setTitleHero, setDescriptionHero, setSliderImg)
        }
    }

    const [isOpenEditImg, setisOpenEditImg] = useState(false)

    const handleOpenEditImage = () => {
        setisOpenEditImg(!isOpenEditImg)
    }

    return (
        <>
            <div className="flex flex-col items-center  bg-black px-16 pt-20 max-md:px-5 max-md:max-w-full">

                <div className="z-10 lg:mt-32 mb-0  overflow-hidden  md:mt-5 max-md:mb-2.5 max-md:max-w-full">
                    <div className={`w-full  -z-50 absolute right-0 top-0  `}>
                        <img className="w-screen h-[300px]  md:h-[500px] lg:h-[600px] xl:h-[950px]  bg-cover brightness-50 blur-[2px] contrast-125" src={SliderImg[current]} alt="" />
                    </div>
                    <div className="md:absolute z-50 top-0 md:right-0 md:left-0 md:px-12 ">

                        <div className="lg:text-5xl left-[20px]  md:text-4xl xl:p-20 font-semibold absolute top-20 lg:p-20 md:top-[9rem] text-white max-md:max-w-full max-md:text-4xl">
                            <h1 className="lg:text-5xl md:text-4xl md:-mt-[3rem] text-[1.2rem] xl:px-30 xl:text-6xl px-6">
                                <div className="flex flex-row text-[15px] md:text-[40px] items-center ">
                                    {TitleHero}

                                </div>
                            </h1>
                        </div>
                        <div className="md:text-2xl xl:p-20 left-[20px] absolute font-semibold md:top-[13rem] z-10 top-28 lg:p-20   text-white max-md:max-w-full">

                            <div className="flex flex-row  items-center">

                                <p className={`text-[0.7rem] md:-mt-[3.9rem] xl:-mt-5 md:text-[25px] px-6 xl:px-30 xl:text-4xl ${user ? WhichRole === 'admin' || WhichRole === 'Owner' ? 'w-1/2' : '' : 'w-[60%]'} `}>{formatText(DescriptionHero)}</p>

                            </div>

                        </div>
                        <div className="flex justify-center md:mt-[22rem]  gap-5 md:gap-5  mt-[1rem] xl:mt-[36rem] relative lg:gap-8 lg:mt-[28rem] opacity-45">
                            {SliderImg.map((SliderImg, e) => {
                                return (<button onClick={() => { setCurrent(e) }} key={`circle + ${e}`} className={` w-4 h-4 xl:w-8 xl:h-8 lg:w-6 lg:h-6 md:w-6 md:h-6  rounded-full  bg-cyan-900 ${e == current ? " bg-sky-500" : " bg-cyan-900"}`} ></button>)
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

    const words = (TextHero || '').split(' ');

    let formattedLines = [];

    let currentLine = '';

    words.forEach((words, index) => {

        currentLine += words;

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

