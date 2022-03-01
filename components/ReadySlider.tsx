import React, { useState } from 'react';
import Image from 'next/image';
import Slider from '@mui/material/Slider';

interface ReadySliderProps {
    setShowSlider: (showSlider: boolean) => void,
}

function valuetext(value: any) {
return `${value}°C`;
}

const marks = [
    {
      value: 10,
      label: 'Beginner',
    },
    {
      value: 90,
      label: 'Grand Master',
    },
];

export default function ReadySlider({setShowSlider}: ReadySliderProps) {
    const [level, setLevel] = useState<number>(0);
    return (
        <div className="flex text-center justify-center items-center absolute top-0 bottom-0 left-0 right-0 bg-white z-1 p-6">
        <div>
          <div className="flex text-2xl justify-center">
            <Image width={30} height={30} alt="logo" src={"/chess-strategy.png"}/>
            <div className="ml-2">ASYNC CHESS COACH</div>
          </div>

          <div className="mt-20 mb-10 text-4xl font-semibold">
            HOW GOOD AT CHESS ARE YOU READY TO BE?
          </div>
          
            <Slider
                aria-label="Temperature"
                defaultValue={50}
                getAriaValueText={valuetext}
                color="secondary"
                marks={marks}
                onChange={(_, v) => setLevel(v as number)}
            />

          <div className="flex py-2 mt-5 bg-gradient-to-b from-slate-300 to-slate-400 justify-center items-center rounded-lg">
            <div className="px-4 justify-center text-2xl flex-1">{level >= 90 ? 'YES' : 'NO'}</div>
            <button className="px-2 border-l text-lg text-center grow-[2]" onClick={() => {
                if (level >= 90) {
                    (window as any).gtag('event', 'past_slider', {"send_to": process.env.NEXT_PUBLIC_GA});
                    document.body.style.overflow = 'unset';
                    localStorage.setItem('seenReadySlider', "true");
                    setShowSlider(false);
                }
            }}>{level >= 90 ? "I'm ready to become the best" : "I'm not ready for massive ELO gains"}</button>
          </div>
        </div>
      </div>
    )
}