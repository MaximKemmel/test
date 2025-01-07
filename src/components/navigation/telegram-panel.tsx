import React, {useEffect, useState} from 'react';
import {Sprite} from "@/tags/sprite";
import {usePopupTelegramStore} from "@/store/toggle-stores";
import {useTranslations} from "next-intl";
import {UserInfo} from "@/lib/interfaces";
import {useAuthStore} from "@/store/auth-store";

const TelegramPanel = ({ seeUser}: {
    seeUser?: UserInfo
}) => {

    const t = useTranslations('Dashboard')
    const {userInfo} = useAuthStore();

    const [telegram, setTelegram] = useState('Не задан')

    const {open} = usePopupTelegramStore();

    useEffect(() => {
        if (seeUser) {
            if (seeUser?.Profile?.telegramm) {
                const parse: {label: string, main: boolean}[] = JSON.parse(seeUser?.Profile?.telegramm as string);

                if (parse) {
                    const fnd = parse.find(el => el.main)
                    if (fnd) {
                        setTelegram(fnd?.label)
                    }
                }
            }
        } else {
            if (userInfo?.currentUser?.Profile?.telegramm) {
                const parse: {label: string, main: boolean}[] = JSON.parse(userInfo?.currentUser?.Profile?.telegramm as string);

                if (parse) {
                    const fnd = parse.find(el => el.main)
                    if (fnd) {
                        setTelegram(fnd?.label)
                    }
                }
            }
        }
    }, [userInfo, seeUser]);

    return (
        <div className='space-y-[15px] pl-[49px] pr-[49px]'>
            <p className='text-h4' dangerouslySetInnerHTML={{__html: t.raw('main.titleTelegram')}}/>
            <div
                className='flex px-5 py-2 right-panel-menu items-center  rounded-xl relative bg-main-black-card border-yellow justify-between'>
                <p className="right-panel-menu-value-2">{telegram}</p>
                <div className='flex gap-2 items-center'>
                    <Sprite
                        name='copy'
                        className='w-5 h-5'
                    />
                    <Sprite name='share' className='w-5 h-5'/>
                    {!seeUser ? <Sprite onClick={open} name='setting' className='cursor-pointer w-5 h-5 '/> : null}
                </div>
            </div>
        </div>
    );
};

export default TelegramPanel;