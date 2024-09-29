import React, { useEffect, useState } from "react";
import { useContextCar } from "../../Context/Context";
import { FaEdit } from "react-icons/fa";
import { editTitleHero, editDescriptionHero } from "../../Functions/HomeAdmin/HomeAdmin";

const Hero = () => {
    const {
        user,
        WhichRole,
        TitleHero,
        DescriptionHero,
        SliderImg,
        setTitleHero,
        setDescriptionHero,
        setSliderImg,
        GetHero,
    } = useContextCar();

    const [current, setCurrent] = useState(0);
    const [isOpenEditImg, setIsOpenEditImg] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % SliderImg.length);
        }, 7000);
        return () => clearInterval(interval)
    }, [SliderImg.length]);

    const handleEditTextHero = () => {
        const newTitle = prompt('Edit title home:', TitleHero);
        if (newTitle !== null) {
            editTitleHero(newTitle);
            GetHero(setTitleHero, setDescriptionHero, setSliderImg);
        }
    };

    const handleEditDesctHero = () => {
        const newDesc = prompt('Edit description home:', DescriptionHero);
        if (newDesc !== null) {
            editDescriptionHero(newDesc);
            GetHero(setTitleHero, setDescriptionHero, setSliderImg);
        }
    };

    const formatText = (text) => {
        if (!text) return "";
        const words = text.split(' ');
        return words.reduce((acc, word, index) => {
            if ((index + 1) % 4 === 0 || index === words.length - 1) {
                acc += `${word}\n`;
            } else {
                acc += `${word} `;
            }
            return acc;
        }, "");
    };

    return (
        <>
            <div className="flex flex-col items-center w-full  -mt-20   ">

                <div className="z-10 w-full  overflow-hidden bg-[#0B0C10] ">
                    <div className="w-full h-full bg-cover">
                        <img className="w-full h-full bg-cover brightness-50 blur-[2px] contrast-125" src={SliderImg[current]} alt="" />
                    </div>
                    <div className="w-full bg-[#0B0C10] ">

                        <div className="flex justify-center  gap-5 md:gap-5   relative lg:gap-8  opacity-45">
                            {SliderImg.map((SliderImg, e) => {
                                return (<button onClick={() => { setCurrent(e) }} key={`circle + ${e}`} className={` w-4 h-4 xl:w-8 xl:h-8 lg:w-6 lg:h-6 md:w-6 md:h-6 -mt-16 rounded-full  bg-cyan-900 ${e == current ? " bg-sky-500" : " bg-cyan-900"}`} ></button>)
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

