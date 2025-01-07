import React, {useEffect, useState} from 'react';
import {getUserById, getUserInfo} from "@/lib/api";
import clsx from "clsx";
import {Tooltip} from "flowbite-react";

interface DashboardRating2Props {
    value?: string
    empty?: boolean
    size?: 'l5' | 'm3'
}

const DashboardRating2 = ({value, empty, size = 'l5'}: DashboardRating2Props) => {

    const [id, setId] = useState('1')

    useEffect(() => {
        if (value) {
            getUserById(value).then(res => {
                setId(String(res.result?.userId))
            })
        }
    }, [value])

    return (
        <>
            {empty ? <div className={clsx(" rounded-full outline-1 outline outline-main-gold", size === 'l5' ?
                'h-[28px] w-[28px]' : 'h-[40px] w-[40px] xs:h-[35px] xs:w-[35px]')}/> :
                <Tooltip content={id} placement="bottom">
                    <div className={clsx("h-[28px] w-[28px] rounded-full bg-main-gold", size === 'l5' ?
                        'h-[28px] w-[28px]' : 'h-[40px] w-[40px] xs:h-[35px] xs:w-[35px]')}/>
                </Tooltip>}
            </>
    );
};

export default DashboardRating2;
