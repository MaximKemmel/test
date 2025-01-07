import React, {useCallback, useEffect, useState} from 'react';
import {getUserById, getUserInfo} from "@/lib/api";
import clsx from "clsx";
import {useContract, useContractRead} from "@thirdweb-dev/react";
import {CONFIG} from "@/lib/config";
import {matrixMB6Abi} from "@/lib/abiMB6";
import M6RatingChild from "@/components/dashboard/m6/M6RatingChild";
import {Tooltip} from "flowbite-react";

interface M6Rating2Props {
    value?: any
    level?: null | string
    empty?: boolean
    small?: boolean
    child?: any[]
    onClick?(id: number): void
}

const M6Rating2 = ({value, empty, level, child, onClick}: M6Rating2Props) => {

    const [address, setAddress] = useState('')
    const [id, setId] = useState('1')

    const getChild = useCallback(
        () => {
            switch (child?.length) {
                case 1: {
                    return <>
                        {child[0] ?
                            <M6RatingChild small onClick={onClick} level={level}  value={child[0]}/>
                            : null}
                        {Array(1).fill(null).map((_, idx) => {
                            return <M6RatingChild key={idx} small empty/>
                        })}
                    </>
                }
                case 2: {
                    return <>
                        {child.map((el: number, idx: number) => {
                            if (el) {
                                return <M6RatingChild small onClick={onClick} level={level} key={idx} value={el}/>
                            }
                            return <M6RatingChild small level={level} key={idx} empty/>
                        })}
                    </>
                }
                default: {
                    return <>
                        {Array(2).fill(null).map((el, idx) => {
                                return <M6RatingChild small level={level} key={idx} empty/>
                            })}
                    </>
                }
            }
        },
        [child],
    );

    useEffect(() => {
        if (value) {
            getUserById(value.userId).then(res => {
                setId(String(res.result?.userId))
                setAddress(res.result.username)
            })
        }
    }, [value])

    return (
        <div>
            {empty ? <div className="flex flex-col items-center gap-y-[11px] " >
                <div className="h-[30px] w-[30px] self-center rounded-full outline outline-1 outline-main-gold "/>
                <div className="flex items-center gap-x-[40px]">
                    <div className="h-[30px] w-[30px] items-center rounded-full outline outline-1 outline-main-gold"/>
                    <div className="h-[30px] w-[30px] items-center rounded-full outline outline-1 outline-main-gold"/>
                </div>
            </div> : <div className="flex flex-col items-center gap-y-[11px] " >
                <Tooltip content={id} placement="bottom"><div
                          className={clsx(" rounded-full flex justify-center items-center",
                              'h-[30px] w-[30px] self-center rounded-full bg-main-gold')}/></Tooltip>
                <div className="flex items-center gap-x-[40px]">
                    {getChild()}
                </div>
            </div>  }

        </div>
    );
};

export default M6Rating2;
