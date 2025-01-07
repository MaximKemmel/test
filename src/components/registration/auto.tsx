'use client'
import {usePopupAuto, usePopupConnect, usePopupConnect2} from "@/store/toggle-stores"
import { Sprite } from "@/tags/sprite";
import { Dialog, Transition } from "@headlessui/react"
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {ChangeEvent, Fragment, useState} from "react"
import {
    metamaskWallet,
    useConnect, useContract, useContractWrite, WalletInstance
} from "@thirdweb-dev/react";
import {matrixManagerAbi} from "@/lib/abi";
import {getUserByAddress, getUserById, loginApi} from "@/lib/api";
import {useAuthStore} from "@/store/auth-store";
import {CONFIG} from "@/lib/config";
import {useLocale, useTranslations} from "next-intl";
import {ConnectionPopup2} from "@/components/registration/connection2";

const contractAddress = CONFIG.contact_MATRIX_MANAGER

export default function AutoPopup() {
    const {isOpen,close} = usePopupAuto();
    const router = useRouter();
    const locale = useLocale()

    const connect = useConnect();
    const metamaskConfig = metamaskWallet();
    const {auth} = useAuthStore();
    const {isOpen: isOpenConnect, open: openConnect} = usePopupConnect2();

    const searchParams = useSearchParams();
    const [referrer, setReferrer] = useState(searchParams.get('referral_all') || '1')
    const t = useTranslations('Modals')

    const [referralConnectionAddress, setReferralConnectionAddress] = useState('')
    const [referralConnectionId, setReferralConnectionId] = useState('')

    const {data: contract} = useContract(contractAddress, JSON.stringify(matrixManagerAbi.abi));

    const {mutateAsync: isUserExists} = useContractWrite(
        contract,
        "isUserExists",
    );

    const registration = async (address: string, wallet: WalletInstance, referrerLink: string, userId: string) => {

        return new Promise((resolve, reject) => {
            setReferralConnectionAddress(referrerLink)
            setReferralConnectionId(userId)
            close()
            openConnect()
            resolve(true)
        })
    }

    const connectToWallet = async (e: any) => {

        e.preventDefault()

        const wallet = await connect(metamaskConfig);

        if (wallet) {

            const address = await wallet.getAddress()

            const exist = await isUserExists({
                args: [address]
            })

            if (!exist) {

                if (referrer !== '1') {
                    if (referrer.length > 8) {
                        getUserByAddress(referrer).then((res) => {
                            if (res.success) {
                                return registration(address, wallet, referrer, res.result?.userId)
                            } else {
                                throw 'Пользователь не найден'
                            }
                        }).catch((res) => {
                            alert('Ошибка при регистрации')
                        })

                    } else {
                        getUserById(referrer).then((res) => {
                            return registration(address, wallet, res.result.username, res.result?.userId)
                        }).catch((res) => {
                            alert('Пользователь не найден')
                        })
                    }
                } else {
                    return registration(address, wallet, CONFIG.contractID1, '1')
                }

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

    const onChangeReferrer = (e: ChangeEvent<HTMLInputElement>) => {
        setReferrer(e.target.value)
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
                                    <form onSubmit={connectToWallet} className="flex flex-1 flex-col items-center text-center justify-between gap-[70px] xs:gap-[40px]">
                                        <div className="space-y-12 ">
                                            <p className=" text-home-h2">{t('auto.title')}</p>
                                            <div className="space-y-[36px] max-w-[388px] mx-auto">
                                                <p className=" font-normal">{t('auto.referral')}</p>
                                                <input value={referrer} onChange={onChangeReferrer}
                                                       placeholder="1" type=""
                                                       className=" bg-transparent text-center outline-none border-b w-full border-white/20 placeholder:text-white pb-0.5"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className=" outline-none font-medium uppercase btn-back px-[140px] py-9 xs:px-0 xs:py-[27px] xs:w-full"
                                        >
                                            {t('auto.button')}
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
            {isOpenConnect && referralConnectionAddress && referralConnectionId ?
                <ConnectionPopup2 referralAddress={referralConnectionAddress} referralId={referralConnectionId}/> : null}
        </>
    )
}
