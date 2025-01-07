'use client'
import {useEffect} from "react"
import useNewStore from "@/store/news-store";
import NewsCard from "@/components/cards/NewsCard";
import {useTranslations} from "next-intl";

export function News() {

    const t = useTranslations('Dashboard')
    const {getNews, news} = useNewStore()

    useEffect(() => {
        getNews()
    }, [])

    return(
        <main className="space-y-[40px]">
            <p className="text-h2">{t('news.title')} <span className=" text-main-yellow ml-[15px] xs:ml-[5px]">{news?.length || 0}</span></p>
            <div className=' hr-color !h-2 '/>
            <div className="grid gap-[30px] grid-cols-1">
                {news.map((info,index)=>(
                    <NewsCard key={index} info={info}/>
                ))}
            </div>
        </main>
    )
}
