'use client'
import React from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import clsx from "clsx";

interface StaticsSelectProps {
    className?: string
}

const StaticsSelect = ({className}: StaticsSelectProps) => {

    function uppercaseFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <Select defaultValue={'Все'} onValueChange={value => {
        }}>
            <SelectTrigger
                className={clsx('bg-transparent border-0 w-[54px] xs:w-auto p-0 text-[20px] xs:text-[16px] xs:text-white xs:h-auto uppercase text-[#BCBCBC]',
                    className)}>
                <SelectValue placeholder="Language"/>
            </SelectTrigger>
            <SelectContent>
                {
                    ['Все', 'Последние'].map(el => {
                        return <SelectItem value={el} key={el}>
                            {uppercaseFirstLetter(el)}
                        </SelectItem>
                    })
                }
            </SelectContent>
        </Select>
    );
};

export default StaticsSelect;
