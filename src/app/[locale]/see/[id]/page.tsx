'use client'
import {getUserById} from "@/lib/api";
import {Dashboard} from "@/components/pages/(profile)/dashboard";
import Header from "@/components/header";
import {Menu} from "@/components/navigation/menu";
import {RightMenu} from "@/components/navigation/right-menu";
import Image from "next/image";
import DashboardSee from "@/components/dashboard/DashboardSee";
import CheckAuthProvider from "@/providers/CheckAuthProvider";
import {useEffect, useState} from "react";

export default function DashboardPage({params}: { params: { id: string, locale: string } }) {

    const [seedUser, setSeedUser] = useState<any>({})

    useEffect(() => {
        getUserById(String(params.id)).then(res => setSeedUser(res))
    }, [])

    if (!seedUser.result) {
        return <div className="p-10">Загрузка...</div>
    }

    return <CheckAuthProvider>
        <Header seedUser={seedUser.result} lang={params.locale}/>
        <DashboardSee/>
        <div
            className='grid layout grid-cols-[minmax(150px,250px)_1fr_minmax(200px,375px)] gap-10 p-10 xs:p-[20px] xs:pt-[13px] xs:grid-cols-1'
        >
            <Menu seeUser={seedUser.result} className="xs:hidden"/>
            <Dashboard seeUser={seedUser.result} seeAddress={seedUser.result.username}/>
            <RightMenu seeUser={seedUser.result} className="xs:hidden"/>
        </div>
        <Image width={300} height={800} className='fixed top-1/2 -translate-y-1/2 -z-10 left-0' alt=''
               src={'/images/background.svg'}/>
        <Image width={300} height={800} className='fixed top-1/2 -translate-y-1/2 -z-10 right-0' alt=''
               src={'/images/right-background.svg'}/>
    </CheckAuthProvider>
}
