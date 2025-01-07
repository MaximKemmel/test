'use client'

import { Sprite } from "@/tags/sprite"
import { Tab } from "@headlessui/react"
import clsx from "clsx"
import AutomaticCard from "@/components/cards/AutomaticCard";
import usePromoStore from "@/store/promo-store";
import {useEffect, useMemo} from "react";
import {PromoProvider, usePromoContext} from "@/providers/PromoContext";
import {useTranslations} from "next-intl";

export function Promo() {

    const t = useTranslations('Dashboard')

    const tabs = useMemo(() => {
        return {
            [t('promo.tabs.item1')]: <Banners/>,
            [t('promo.tabs.item2')]: <Presentation/>,
            [t('promo.tabs.item3')]: <Videos/>
        }
    }, []);

    const {getPromos, promos} = usePromoStore()

    useEffect(() => {
        getPromos()
    }, [])

    return(
        <main className="space-y-[40px]">
            <div className="space-y-[20px]">
                <p className="text-h2">{t('promo.title')}</p>
                <p className=" font-light text-h4">{t('promo.description')}</p>
            </div>
            <PromoProvider value={{promos}}>
                <Tab.Group>
                    <Tab.List className={' text-h3 flex gap-8'}>
                        {Object.keys(tabs).map((tab,index)=>(
                            <Tab
                                className={({ selected }) =>clsx(
                                    selected && "text-main-yellow border-b border-main-yellow",
                                    "pb-1"
                                )}
                                key={tab+index+tab}
                            >
                                {tab}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels>
                        {Object.values(tabs).map((tab,index)=>(
                            <Tab.Panel key={Object.keys(tabs)[index]+index}>{tab}</Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </PromoProvider>
        </main>
    )
}

function Banners() {

    const {promos} = usePromoContext()

    return(
        <div className="grid gap-[43px] grid-cols-2 xs:grid-cols-1">
            {promos.filter(el => el.type === 'BANNER').map((info,index)=>(
                <AutomaticCard info={info} key={index}/>
            ))}
        </div>
    )
}

function Presentation() {

    const {promos} = usePromoContext()

    return(
        <div className="grid gap-10 grid-cols-1 xs:grid-cols-1">
            {promos.filter(el => el.type === 'PRESENTATION').map((present,index)=>(
            <div key={index} className="flex items-center p-5 border border-main-yellow rounded-xl bg-main-black-card justify-between">
                <div className="flex items-center gap-[15.6px]">
                    <Sprite name="pdf" className="w-8 h-8"/>
                    <div className="flex flex-col gap-y-[2px]">
                        <p className="text-h4">{present.title}</p>
                        <p className="text-sm opacity-40">(PDF, 1.7 МБ)</p>
                    </div>
                </div>
                <div className="flex gap-5">
                    <Sprite name="download" className="w-8 h-8"/>
                    <Sprite name="copy" className="w-8 h-8"/>
                </div>
            </div>
            ))}
        </div>
    )
}

function Videos() {

    const {promos} = usePromoContext()

    return(
        <div className="grid gap-[43px] grid-cols-2 xs:grid-cols-1">
            {promos.filter(el => el.type === 'VIDEO').map((info,index)=>(
                <AutomaticCard info={info} key={index}/>
            ))}
        </div>
    )
}
