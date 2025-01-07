import React, {useEffect, useState} from 'react';
import {getUserInfo} from "@/lib/api";
import clsx from "clsx";
import {Tooltip} from "flowbite-react";

interface DashboardRatingProps {
    value?: string
    size?: 'l5' | 'm3' | 'm6',
    empty?: boolean
    partnersCount?: number
    red?: boolean
    onClick?(id: number): void
}

const DashboardRating = ({value, empty, partnersCount, onClick, red = false, size = 'l5'}: DashboardRatingProps) => {

    const [id, setId] = useState('1')

    useEffect(() => {
        if (value) {
            getUserInfo(value).then(res => {
                setId(String(res.result?.userId))
            })
        }
    }, [value])

    return (
        <Tooltip content={empty ? 'Свободное место' : id} placement="bottom">
            {empty ? <div
                className={clsx(" bg-main-gray-2 rounded-full border-solid border-[2.5px] border-[#FF1F00] flex justify-center items-center",
                    size === 'l5' && 'h-[40px] w-[40px] xs:h-[75px] xs:w-[75px]', size === 'm3' && 'h-[120px] w-[120px] xs:h-[75px] xs:w-[75px]')}>
            </div> :
                <div className="flex flex-col gap-y-2 items-center">
                    <div onClick={() => {
                        if (onClick) {
                            onClick(Number(id))
                        }
                    }}
                         className={clsx("bg-white rounded-full border-solid border-[2.5px]  flex justify-center items-center",
                             'h-[40px] w-[40px] xs:h-[75px] xs:w-[75px]', red ? 'border-[#FF1F00]' : 'border-[#171ED6]')}>
                        <span className="text-20 !font-[550] text-[#191919] max-w-[95%] text-ellipsis overflow-hidden">{id}</span>
                    </div>
                    <span>{partnersCount}</span>
                </div>}

        </Tooltip>
    );
};

export default DashboardRating;
