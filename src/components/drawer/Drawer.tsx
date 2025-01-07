import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Drawer as DrawerFlowbite} from 'flowbite'
import DrawerOpen from "@/components/drawer/DrawerOpen";
import {useBoolean} from "usehooks-ts";
import DrawerClose from "@/components/drawer/DrawerClose";
import {Menu} from "@/components/navigation/menu";
import {usePathname} from "next/navigation";
import {Sprite} from "@/tags/sprite";
import LanguageSelect from "@/components/header/language-select";
import Image from "next/image";
import {useAuthContext} from "@/providers/AuthContext";
import {useAddress, useDisconnect} from "@thirdweb-dev/react";
import {useLocale, useTranslations} from "next-intl";
import Link from "next/link";
import {UserInfo} from "@/lib/interfaces";
import {useAuthStore} from "@/store/auth-store";

const Drawer = ({className, seedUser}: {
    className?: string,
    seedUser?: UserInfo
}) => {
    const t = useTranslations('Dashboard')
    const locale = useLocale()
    let ref = useRef<any>(null)
    const pathname = usePathname()
    const {value, toggle, setFalse} = useBoolean(false)
    const {auth} = useAuthContext()
    const disconnect = useDisconnect();
    const myAddress = useAddress()
    const [address, setAddress] = useState<undefined | string>()
    const {userInfo} = useAuthStore();

    const isAuth = auth

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
    }, [locale]);

    const onLogout = async () => {
        if(isAuth) {
            await disconnect()
            window.location.href = `/ru/home`
        }
    }

    const handleCopy = async (e: any) => {
        if (userInfo?.currentUser?.userId || seedUser) {
            navigator?.clipboard?.writeText(`${window.location.origin}/ru/home?referral_all=${seedUser?.userId ? seedUser.userId :
                userInfo?.currentUser?.userId}`);
        }
        const target = e?.target;
        target.style.color = '#64D121';
        setTimeout(() => target.style.color = '', 1000);
    }

    useEffect(() => {
        const $targetEl = document.getElementById('drawer');

        const options = {
            placement: 'right',
            backdrop: false,
            bodyScrolling: false,
            edge: false,
            edgeOffset: '',
        };

        ref.current = new DrawerFlowbite($targetEl, options)
    }, [])

    useEffect(() => {
        if (!seedUser?.username && myAddress) {
            setAddress(myAddress)
        } else if (seedUser?.username) {
            setAddress(seedUser.username)
        }
    }, [seedUser, myAddress])

    useEffect(() => {
        if (ref?.current) {
            ref?.current.hide();
            setFalse()
        }
    }, [pathname]);

    return (
        <div>
            {value ? <DrawerClose onClick={() => {
                if (ref) {
                    ref?.current?.toggle()
                    toggle()
                }
            }}/> : <DrawerOpen onClick={() => {
                if (ref) {
                    ref?.current?.toggle()
                    toggle()
                }
            }}/>}
            <div id="drawer" style={{height: 'calc(100% - 90px)'}} data-drawer='false' className="overflow-y-auto fixed flex flex-col gap-y-[16px] top-[90px] bg-main-black-drawer right-0 z-40 h-screen pt-[15px] px-[27px] pb-[15px]
              transition-transform translate-x-full w-full items-start">
                <button onClick={handleCopy}
                    className="h-[36px] bg-main-black-2 rounded-[39px] inline-flex items-center justify-center px-[13px]">
                    {`${address?.slice(0, 10) || ''}...${address?.slice(-4) || ''}`}
                </button>
                <div className="px-[10px] space-y-[16px]">
                    <Menu className="hidden xs:flex  flex-col"/>
                    <div onClick={onLogout} className="flex gap-x-[10px] items-center">
                        <span className="text-[14px]  ">
                            Выход
                        </span>
                        <Sprite className="w-5 h-5" name="logout"/>
                    </div>
                </div>
                <hr className="text-main-gray-3 h-[1px] w-full"/>
                <div className="px-[10px] space-y-[16px]">
                    <LanguageSelect lang={'ru'}/>
                    <div className="mt-[22px] flex flex-wrap gap-[10px] items-center">
                        {info.map((social,index)=>(
                            <Link href="/#" key={index} className="w-[24px] h-[24px] flex justify-center items-center box-content bg-main-yellow text-center p-1 rounded-full">
                                <Image width={11.5} height={11.5} src={`/icons/${social.sprite}.svg`} alt={'social'}/>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Drawer;
