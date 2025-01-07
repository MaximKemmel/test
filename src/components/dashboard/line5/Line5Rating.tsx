import React, {useEffect, useState} from 'react';
import {getUserById, getUserInfo} from "@/lib/api";
import clsx from "clsx";
import Image from "next/image";

interface Line5RatingProps {
    value?: string
    size?: 'l5' | 'm3' | 'm6',
    empty?: boolean
    reinvest?: boolean
    onClick?(id: number): void
}

const Line5Rating = ({value, empty, onClick, reinvest = false, size = 'l5'}: Line5RatingProps) => {

    const [id, setId] = useState('1')

    useEffect(() => {
        if (value) {
            getUserById(value).then(res => {
                setId(String(res.result?.userId))
            })
        }
    }, [value])

    return (
        <div className="relative">
            {empty ? <div
                className={clsx(" bg-main-gray-2 rounded-full border-solid border-[5px] border-[#FF1F00] flex justify-center items-center",
                size === 'l5' && 'h-[80px] w-[80px] xs:h-[75px] xs:w-[75px]', size === 'm3' && 'h-[120px] w-[120px] xs:h-[75px] xs:w-[75px]')}>
            </div> : <div onClick={() => {
                if (onClick) {
                    onClick(Number(id))
                }
            }}
                className={clsx("bg-white rounded-full border-solid border-[5px] border-[#171ED6] flex justify-center items-center",
                    size === 'l5' && 'h-[80px] w-[80px] xs:h-[75px] xs:w-[75px]', size === 'm3' && 'h-[120px] w-[120px] xs:h-[75px] xs:w-[75px]')}>
                <span className="text-20 !font-[550] text-[#191919]">{id}</span>
            </div> }
            {reinvest ? <div className="absolute top-[-20px] right-[-20px]">
                <Image width={40} height={40} src={'/images/reinvest.png'} className="z-[999]" alt={'avatar'}/>
            </div> : null}
        </div>
    );
};

export default Line5Rating;
