import React from 'react';
import {Sprite} from "@/tags/sprite";
import {Target} from "@/lib/interfaces";
import {formatDate} from "@/lib/date";
import {useTranslations} from "next-intl";

interface TargetCardProps {
    target: Target
    onEdit: (val: number) => void
}

const TargetCard = ({target, onEdit}: TargetCardProps) => {

    const t = useTranslations('Dashboard')


    const onEditCard = () => {
        onEdit(target.id)
    }

    return (
        <div  className=" border space-y-[40px]  relative border-yellow rounded-xl py-[40px] px-[45px]">
            <div className="flex justify-between">
                <p className=" text-24 text-ellipsis overflow-hidden max-w-[85%] whitespace-nowrap">{target?.title}</p>
                {/*<Sprite name={target.status ? "verify":""} className="w-[24px] h-[24px]"/>*/}
                <Sprite name={"verify"} className="w-[24px] h-[24px]"/>
            </div>
            <div className="flex justify-between border-b border-main-yellow pb-2">
                <p>{t('targets.card.item1')}</p>
                <p>{target.demand}</p>
            </div>
            <div className="flex justify-between border-b border-main-yellow pb-2">
                <p>{t('targets.card.item2')}</p>
                <p>{formatDate(target.beginDate)}</p>
            </div>
            <div className="flex justify-between border-b border-main-yellow pb-2">
                <p>{t('targets.card.item3')}</p>
                <p>{formatDate(target.endDate)}</p>
            </div>
            <div className="flex mt-[7px] items-center gap-x-[20px] justify-center">
                <div onClick={onEditCard} className=" flex justify-center text-main-gray-2 cursor-pointer">
                    {t('main.edit')}
                </div>
                <div className=" flex justify-center text-main-gray-2 cursor-pointer">
                    {t('main.return')}
                </div>
                <div className=" flex justify-center text-main-gray-2 cursor-pointer">
                    {t('main.remove')}
                </div>
            </div>
        </div>
    );
};

export default TargetCard;
