'use client'
import React, {ReactNode, useEffect, useState} from 'react';
import {getUserInfo} from "@/lib/api";
import dayjs, {Dayjs} from "dayjs";
import {TimerCountdown} from "@/components/dashboard/TimerCountdown";
import {usePopupTimerStore} from "@/store/toggle-stores";
import {Tooltip} from "flowbite-react";

interface TimerDashboardProps {
    children: ReactNode;
    active: boolean
    date: string | null
    level: string
    price: string
    address?: string
}

const TimerDashboard = ({children, active, date, level, address, price}: TimerDashboardProps) => {
    const [endDate, setEndDate] = useState<Dayjs | null>(null)
    const {open} = usePopupTimerStore();

    useEffect(() => {
        if (address && active) {
            if (date) {
                getUserInfo(address).then(res => {

                    let val = Number(date.toString().split('.')[1])

                    if (val.toString().length === 9) {
                        val = Number(`${val}0`)
                    }

                    const target = dayjs.unix(val)
                    setEndDate(target)
                })
            }
        }
    }, [address, active, date]);

    if (date === "0.0") {
        return <div className="flex h-full items-end">{children}</div>
    }

    if (!active) {
        return <div className="flex h-full items-end">{children}</div>
    }

    return (
        <div className="flex flex-col items-center gap-y-2">
            {Number(level) > 3 ? <div className="flex flex-col items-center gap-y-1">Бессрочный</div> :
                <Tooltip content={'Продлить'} placement="bottom">
                    <div onClick={() => open(level, price)} className="cursor-pointer flex flex-col items-center gap-y-1"><span>До заморозки:</span> {endDate ?
                        <TimerCountdown deadline={endDate.toString()}/> : null}</div>
                </Tooltip>}
            {children}
        </div>
    );
};

export default TimerDashboard;
