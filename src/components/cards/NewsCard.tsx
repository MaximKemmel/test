import React from 'react';
import {News} from "@/lib/interfaces";
import {formatDate} from "@/lib/date";

interface NewsCardProps {
    info: News
}

const NewsCard = ({info}: NewsCardProps) => {
    return (
        <div>
            <div className="flex flex-col">
                <div className="mt-[15px] w-3/5">
                    <p className="text-h3 text-main-yellow">{info.title}</p>
                    <p className="font-[300] max-h-[100px] text-ellipsis overflow-hidden">{info.content}</p>
                </div>
                <div className="flex my-[30px]  justify-between">
                    <p className="py-1 px-3 rounded-md border bg-main-black-card border-main-yellow">Категория</p>
                    {/*<p className="py-1 px-3 rounded-md border bg-main-black-card border-main-yellow">{info.category}</p>*/}
                    <p>{formatDate(info.createdAt, 'LLL')} <span className=" text-main-yellow">100X-Booster</span></p>
                </div>
            </div>
            <div className="hr-color-yellow "/>
        </div>
    );
};

export default NewsCard;
