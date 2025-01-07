import {useLocale, useTranslations} from "next-intl";
import Link from "next/link";
import React from "react";
import {UserInfo} from "@/lib/interfaces";

export function TargetProgress({
    className="",
    progress,
    hasTarget = true,
    seeUser
}:{
    className?:string;
    progress: string;
    hasTarget?: boolean;
    seeUser?: UserInfo
}) {

    const t = useTranslations('Dashboard')

    const locale = useLocale()

    return(
        <div className={`  ${className}`}>
            {hasTarget ? <>
                <p className="text-h4 text-left">{t('main.targetTitle')}</p>
                <div className="flex w-full mt-[15px] justify-end items-center px-[10px] bg-main-black-progress rounded-full relative py-0.5">
                    <div
                        style={{
                            width:progress,
                            background: `linear-gradient(44deg, rgba(240, 181, 54, 0.12) -16.28%, #F0B536 84.18%)`
                        }}
                        className="absolute left-0 rounded-full h-full"
                    />
                    <p className="relative font-[550] text-[8px]">{progress}</p>
                </div>
            </> : <>
                <p className="text-h4">{t('main.targetNull')}</p>
            </>}
            {!seeUser ? <Link href={`/${locale}/1/targets`} className="mt-2">
                <img alt="trace" className="cursor-pointer " src="/images/trace.png" />
            </Link> : null}
        </div>
    )
}
