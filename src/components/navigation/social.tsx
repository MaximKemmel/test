import Image from "next/image";
import React, {useMemo} from "react";
import {useTranslations} from "next-intl";

export function Social() {

    const t = useTranslations('Dashboard')

    const info = useMemo(() => {
        return [
            {
                sprite: "tg",
                text: t('main.links.item1')
            },
            {
                sprite: "tg",
                text: t('main.links.item2')
            },
            {
                sprite: "vk",
                text: t('main.links.item3')
            },{
                sprite: "Instagram",
                text: t('main.links.item4')
            },
            {
                sprite: "Twitter",
                text: t('main.links.item5')
            },{
                sprite: "Youtube",
                text: t('main.links.item6')
            },
        ]
    }, []);


    return(
        <div className="rounded-xl xs:hidden px-10 py-5 flex bg-main-black-card-before flex-col gap-[15px] items-center">
            <p className="text-h4">{t('main.subscription')}</p>
            {info.map((social,index)=>(
                <div key={social.sprite+index+social.text} className="cursor-pointer bg-main-black-card w-full relative border-yellow rounded-xl items-center flex justify-between px-5 py-2">
                    {social.text}
                    <div key={index} className="w-[20px] h-[20px] flex justify-center items-center box-content bg-main-yellow text-center p-1 rounded-full">
                        <Image width={11.5} height={11.5} src={`/icons/${social.sprite}.svg`} alt={'social'}/>
                    </div>
                </div>
            ))}
        </div>
    )
}
