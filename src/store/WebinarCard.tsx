import React from 'react';
import {Webinars} from "@/lib/interfaces";
import {formatDate} from "@/lib/date";
import {useTranslations} from "next-intl";

interface WebinarCardProps {
    info: Webinars
}

const WebinarCard = ({info}: WebinarCardProps) => {

    const t = useTranslations('Dashboard')

    return (
        <div
            className=" gap-10 py-[40px] grid grid-cols-[190px_1fr] px-[45px] pr-[126px] bg-main-black-card  relative border-yellow rounded-[10px] xs:flex-col xs:px-[20px]"
        >
            <div className="space-y-[35px]">
                <div className="flex justify-between flex-wrap gap-y-2">
                    <p className="text-20 text-ellipsis whitespace-nowrap">{formatDate(info.beginAt, 'D MMMM')}</p>
                    <p className="text-20 text-main-gray-2">{formatDate(info.beginAt, 'dddd')}</p>
                </div>
                <p className=" whitespace-nowrap text-20">{t('webinars.start')} {formatDate(info.beginAt, 'HH:mm')} ({t('webinars.zone')})</p>
            </div>
            <div className="">
                <p className=" text-h3 !leading-none">{info.title}</p>
                <p className="mt-[15px] !font-[300] max-h-[165px] text-ellipsis overflow-hidden">{info.content}</p>
                <span className="mt-[35px] inline-block text-h4 border-b pb-1 text-main-gray-light/100 border-main-gray-light/100">{t('main.details')}</span>
            </div>
        </div>
    );
};

export default WebinarCard;
