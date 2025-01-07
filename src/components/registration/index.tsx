'use client'

import { usePopupConnect, usePopupRegistration } from "@/store/toggle-stores"
import { Sprite } from "@/tags/sprite";
import { Dialog, Transition } from "@headlessui/react"
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useState } from "react"
import {
    metamaskWallet,
    useConnect, useContract, useContractWrite,
} from "@thirdweb-dev/react";
import {matrixManagerAbi} from "@/lib/abi";
import {getUserById, loginApi} from "@/lib/api";
import {useAuthStore} from "@/store/auth-store";
import {useLocale, useTranslations} from "next-intl";
import {CONFIG} from "@/lib/config";


const contractAddress = CONFIG.contact_MATRIX_MANAGER

export default function RegistrationPopup() {
    const {isOpen,close} = usePopupRegistration();
    const {open} = usePopupConnect();
    const router = useRouter();
    const locale = useLocale()

    const connect = useConnect();
    const metamaskConfig = metamaskWallet();
    const {auth} = useAuthStore();
    const t = useTranslations('Modals')

    const searchParams = useSearchParams();

    const [idValue,setValue] = useState<string>(searchParams.get("referralID") || "");
    const {data: contract} = useContract(contractAddress, JSON.stringify(matrixManagerAbi.abi));

    const {mutateAsync: isUserExists} = useContractWrite(
        contract,
        "isUserExists",
    );

    const handleSeeUser = async (e: any) => {

        e.preventDefault()
        e.stopPropagation()

        const parent = await getUserById(String(idValue))

        if (parent.result) {
            close()
            router.push(`/${locale}/see/${parent.result.userId}`)
        } else {
            alert('Пользователь не найден!')
        }

    }

    const connectToWallet = async () => {

        const wallet = await connect(metamaskConfig);

        if (wallet) {

            const address = await wallet.getAddress()

            const exist = await isUserExists({
                args: [address]
            })

            if (!exist) {

                open()
                close()

            } else {

                loginApi(address, wallet).then(res => {
                    if (res.status === 200) {
                        auth()
                        router.push(`/${locale}/1/dashboard`);
                        close()
                    }
                })

            }
        }
    }

    return(
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={close}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-5xl space-y-8 transform overflow-hidden  bg-main-black py-6  text-left align-middle shadow-xl transition-all">
                            <div className="flex px-16 xs:px-8 justify-between items-center">
                                <Image src={'/logo.svg'} alt="" className=" max-h-20 max-w-20" width={100} height={100}/>
                                <Sprite onClick={close} name="close" className="w-6 h-6"/>
                            </div>
                            <div>
                                <div className="hr-color-yellow !h-2"/>
                                <div className="registration-back xs:overflow-x-scroll px-16 xs:px-8 gap-16 xs:gap-8 flex py-10 xs:py-5">
                                    <div className="flex flex-1 flex-col items-center text-center justify-between gap-24">
                                        <div className="space-y-12 ">
                                            <p className=" text-home-h3">{t('login.title')}</p>
                                            <p className=" font-normal">{t('login.description')}</p>
                                        </div>
                                        <button
                                            onClick={connectToWallet}
                                            className=" outline-none font-medium uppercase btn-back px-[120px] py-6"
                                        >
                                            {t('login.button')}
                                        </button>
                                    </div>
                                    <div className=" vert-hr-color"/>
                                    <form onSubmit={handleSeeUser} className="flex flex-1 flex-col items-center text-center justify-between gap-24">
                                        <div className="space-y-12 ">
                                            <p className=" text-home-h3">{t('login.input')}</p>
                                            <input
                                                value={idValue}
                                                onChange={(e)=>{setValue(e.target.value)}}
                                                placeholder="ID"
                                                type="number"
                                                className=" bg-transparent text-center outline-none border-b w-full placeholder:text-center border-white/20 placeholder:text-white pb-0.5"
                                            />
                                        </div>
                                        <button type="submit"

                                            className=" outline-none font-medium uppercase btn-back text-center  px-[104px] text-white py-6"
                                        >
                                            {t('login.see')}
                                        </button>
                                    </form>
                                </div>
                                <div className="hr-color-yellow !h-2"/>
                            </div>
                            {/*<div className=" text-center pb-5">*/}
                            {/*    <p>{t('login.bottomText')}</p>*/}
                            {/*    <Link href={'/'} className=" border-b border-main-yellow text-main-yellow">{t('login.bottomLink')}</Link>*/}
                            {/*</div>*/}

                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition>
        </>
    )
}
