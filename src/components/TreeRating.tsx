import React, {useEffect, useState} from 'react';
import {getUserInfo} from "@/lib/api";
import {TreeType} from "@/components/dashboard/DashboardPage";
import TreeElement from "@/components/dashboard/TreeElement";

interface Line5RatingProps {
    value?: string
    empty?: boolean
    tree?: TreeType
}

const Line5Rating = ({value, empty, tree}: Line5RatingProps) => {

    const [id, setId] = useState('1')
    const [threeRow, setThreeRow] = useState<TreeType[]>([])

    useEffect(() => {
        setThreeRow(prev => {

            return [...prev]
        })
    }, [tree])

    return (
        <div className="flex flex-col justify-around items-center  w-full">
            {empty ? <div
                className="h-[80px] w-[80px] xs:h-[75px] xs:w-[75px] bg-main-gray-2 rounded-full border-solid border-[2.5px] border-[#FF1F00] flex justify-center items-center">
            </div> : <div
                className="h-[80px] w-[80px] xs:h-[75px] xs:w-[75px] bg-white rounded-full border-solid border-[2.5px] border-[#171ED6] flex justify-center items-center">
                <span className="text-[16px] !font-[550] text-[#191919]">{value}</span>
            </div> }
            <TreeElement tree={tree!.children || []}/>
        </div>
    );
};

export default Line5Rating;