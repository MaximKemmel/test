import React, {memo} from 'react';
import {Sprite} from "@/tags/sprite";
import clsx from "clsx";

interface InfoCardProps {
    className: string
    classNameTitle?: string
    infos: {
        name: string; count: number | string; increased: number;
    }
}

const InfoCard = ({className, classNameTitle = '', infos}: InfoCardProps) => {
    return (
        <div
            className={clsx(" p-[20px] relative h-[121px] xs:!p-[10px] xs:h-[107px] border-yellow rounded-xl flex flex-col bg-[#1F1F1F]", className)}
        >
            <div
                className={clsx("text-[20px] h-[20px] flex-1 text-ellipsis overflow-hidden" +
                    " xs:text-[18px]  text-[#BCBCBC] whitespace-nowrap xs:whitespace-normal leading-none", classNameTitle)}>{infos.name}</div>
            <div className="flex flex-col gap-y-[5px] mt-auto flex-1 xs:mt-0 items-center">
                <p className="text-2xl xs:text-[18px] !font-[550] xs:mt-auto">{infos.count}</p>
                {infos.increased ? <div className="flex items-end gap-1 ">
                    <Sprite name="topArrow" className="w-4 h-4"/>
                    <div
                        className="text-[16px] self-end leading-none font-[550] text-main-green">{infos.increased}</div>
                </div> : null}
            </div>
        </div>
    );
};

export default memo(InfoCard);
