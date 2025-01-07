'use client'
import useWebinarsStore from "@/store/webinars-store";
import WebinarCard from "@/store/WebinarCard";
import {useEffect} from "react";
import {useTranslations} from "next-intl";

export function Webinars() {

    const t = useTranslations('Dashboard')

    const {webinars, getWebinars } = useWebinarsStore()

    useEffect(() => {
        getWebinars()
    }, []);

    return(
        <main className="space-y-[40px]">
            <p className="text-h2">{t('webinars.title')}</p>
            <div className=" grid grid-cols-1 gap-10">
                {webinars?.length ? webinars.map((info,index)=>(
                    <WebinarCard info={info} key={index}/>
                )) : null}
            </div>
        </main>
    )
}
