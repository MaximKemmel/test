import React, { useEffect, useState} from 'react';
import {getUserById, getUserInfo} from "@/lib/api";
import clsx from "clsx";
import {Tooltip} from "flowbite-react";

interface M6RatingChildProps {
    value?: any
    level?: null | string
    empty?: boolean
    small?: boolean
    onClick?(id: number): void
}

const M6RatingChild = ({value, empty, onClick, small}: M6RatingChildProps) => {

    const [id, setId] = useState('1')

    useEffect(() => {
        if (value) {
            getUserById(value.userId).then(res => {
                setId(String(res.result?.userId))
            })
        }
    }, [value])

    return (
        <>
            {empty ? <div className={clsx(" items-center rounded-full outline outline-1 outline-main-gold", small ? 'h-[30px] w-[30px]' :
                'h-[60px] w-[60px]')}/>
                :
                <Tooltip content={id} placement="bottom"><div onClick={() => {
                    if (onClick) {
                        onClick(Number(id))
                    }
                }}
                     className={clsx(" border-[#171ED6] flex justify-center items-center",
                         "items-center rounded-full", small ? 'h-[30px] w-[30px] outline outline-1 outline-main-gold bg-main-gold' :
                             'h-[60px] w-[60px] bg-white rounded-full border-solid border-[2.5px]')}>
                    {!small ? <span className="text-20 !font-[550] text-[#191919]">{id}</span> : null}
                </div></Tooltip>
            }
        </>
    );
};

export default M6RatingChild;
