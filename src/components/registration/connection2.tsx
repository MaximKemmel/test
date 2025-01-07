'use client'

import {usePopupConnect, usePopupConnect2} from "@/store/toggle-stores"
import {Sprite} from "@/tags/sprite";
import {Dialog, Transition} from "@headlessui/react"
import {
    ConnectWallet,
    NATIVE_TOKEN_ADDRESS,
    useAddress,
    useBalance,
    useContract,
    useContractEvents,
    useContractWrite,
    useNetworkMismatch, useWallet
} from "@thirdweb-dev/react";
import Image from "next/image";
import {ChangeEvent, Fragment, useEffect, useMemo, useState} from "react"
import {matrixManagerAbi} from "@/lib/abi";
import {ethers} from "ethers";
import {useRouter, useSearchParams} from "next/navigation";
import {useAuthStore} from "@/store/auth-store";
import {useBoolean} from "usehooks-ts";
import {useLocale, useTranslations} from "next-intl";
import {loginApi} from "@/lib/api";
import {CONFIG} from "@/lib/config";

const contractAddress = CONFIG.contact_MATRIX_MANAGER
const contractAddressUSDT = CONFIG.contractUSDT
const contractAddressDT1 = CONFIG.contractDT1

type CourseItem = {
    binancecoin: {
        usd: number
    },
    'cryptorg-token': {
        usd: number
    },
    tether: {
        usd: number
    },
}

interface RegistrationPopupProps {
    referralAddress?: string;
    referralId?: string;
}


export function ConnectionPopup2({referralId, referralAddress}: RegistrationPopupProps) {
    const {isOpen, close} = usePopupConnect2();

    const searchParams = useSearchParams()
    const address = useAddress();
    const isMismatched = useNetworkMismatch();
    const {data: balance} = useBalance(NATIVE_TOKEN_ADDRESS);
    const {data: balanceUSDT} = useBalance(contractAddressUSDT);
    const {data: balanceDT1} = useBalance(contractAddressDT1);
    const [referrer, setReferrer] = useState(searchParams.get('referral_all') || '1')
    const t = useTranslations('Modals')

    const router = useRouter()
    const wallet = useWallet()
    const {auth} = useAuthStore();
    const locale = useLocale()


    const [valueCourse, setValueCourse] = useState<CourseItem>({
        binancecoin: {
            usd: 0
        },
        "cryptorg-token": {
            usd: 0
        },
        tether: {
            usd: 0
        }
    });

    const {data: contract} = useContract(contractAddress, JSON.stringify(matrixManagerAbi.abi));
    const {data: contractUSDT} = useContract(contractAddressUSDT);
    const {data: contractDP1} = useContract(contractAddressDT1);

    const [isApprovedUSDT, setIsApprovedUSDT] = useState(false)
    const [isApprovedDP1, setIsApprovedDP1] = useState(false)

    const {value: isLoadingApproveUSDT, setValue: setValueApproveUSDT} = useBoolean(true)
    const {value: isLoadingApproveDT1, setValue: setValueApproveDT1} = useBoolean(true)


    const {mutateAsync: registrationExt} = useContractWrite(
        contract,
        "registrationExt",
    );

    const {mutateAsync: approveUSDT} = useContractWrite(
        contractUSDT,
        "approve",
    );

    const {mutateAsync: allowanceUSDT} = useContractWrite(
        contractUSDT,
        "allowance",
    );

    const {mutateAsync: allowanceDP1} = useContractWrite(
        contractDP1,
        "allowance",
    );

    const {mutateAsync: approveDP1} = useContractWrite(
        contractDP1,
        "approve",
    );

    const courseDT1 = useMemo(() => {

        const ctgDollar = 20 / valueCourse['cryptorg-token'].usd

        return (ctgDollar).toFixed(0)
    }, [valueCourse]);

    const catchHandler = () => {
        setValueApproveUSDT(false)
        setValueApproveDT1(false)
        setIsApprovedDP1(false)
        setIsApprovedUSDT(false)
        window.location.reload()
    }

    useEffect(() => {

        const approveOptions = {
            args: [contractAddress, ethers.utils.parseUnits("1000", 18)],
            overrides: {
                gasLimit: 100000
            }
        }

        const allowanceOptions = {
            args: [address, contractAddress]
        }

        if (contractUSDT) {
            approveUSDT(approveOptions).then(
                () => approveDP1(approveOptions)
                    .then(() => allowanceUSDT(allowanceOptions).then(() => allowanceDP1(allowanceOptions).then(async () => {
                        setIsApprovedDP1(true)
                        setIsApprovedUSDT(true)
                        setValueApproveUSDT(false)
                        setValueApproveDT1(false)

                        const referral_all = referrer

                        let registration

                        if (referral_all !== '1') {
                            registration = await registrationExt({
                                args: [referral_all],
                            })
                        } else {
                            registration = await registrationExt({
                                args: [CONFIG.contractID1],
                            })
                        }

                        if (registration?.receipt && address && wallet) {
                            loginApi(address, wallet).then(res => {
                                if (res.status === 200) {
                                    auth()
                                    router.push(`/${locale}/1/dashboard`);
                                    close()
                                }
                            })
                        }
                    }).catch(catchHandler)
                    ).catch(catchHandler)).catch(catchHandler)).catch(catchHandler)
        }

    }, [contractUSDT]);

    useEffect(() => {
        if (referralAddress) {
            setReferrer(referralAddress)
        }
    }, [referralAddress]);

    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/simple/price?ids=binancecoin%2Ctether%2Ccryptorg-token&vs_currencies=usd", {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            cache: 'force-cache'
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (body: CourseItem) {
                setValueCourse(body);
            });
    }, [])

    return (
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
                        <div className="fixed inset-0 bg-black/25"/>
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
                                <Dialog.Panel
                                    className="w-full max-w-5xl space-y-8 transform overflow-hidden  bg-main-black py-6 xs:py-4 text-left align-middle shadow-xl transition-all">
                                    <div className="flex px-16 xs:px-[20px] justify-between items-center">
                                        <Image src={'/logo.svg'} alt="" className=" max-h-20 max-w-20" width={100}
                                               height={100}/>
                                        <div className="flex gap-5 items-center">
                                            <ConnectWallet
                                                theme={"dark"}
                                                btnTitle={"Подключить кошелек"}
                                                modalTitle={"Connect Wallet"}
                                                className=" !bg-transparent !text-main-gray-light/100"
                                                switchToActiveChain={true}
                                                modalSize={"wide"}
                                                welcomeScreen={{title: ""}}
                                                modalTitleIconUrl={""}
                                            />
                                            <Sprite onClick={close} name="close" className="w-6 h-6"/>
                                        </div>
                                    </div>
                                    <div className=" mx-auto space-y-[40px] pb-[50px] w-1/2 xs:w-full xs:px-[20px]">
                                        <div className="space-y-4">
                                            <p className="text-title">{t('register.title')} <span
                                                className=" text-main-yellow">100X-Booster</span></p>
                                            <div className="hr-color !h-2"/>
                                        </div>
                                        <div className="space-y-14">
                                            <div className="space-y-4">
                                                <p className="text-h4">{t('register.referral')}</p>
                                                <input value={referralId ? referralId : referrer} disabled
                                                       placeholder="1"
                                                       className=" bg-transparent outline-none border-b w-full border-white/20 placeholder:text-white pb-0.5"
                                                />
                                            </div>
                                            <div className=" space-y-6">
                                                <div className="flex gap-5 text-h4 items-center">
                                                    <Sprite name={address ? "confirmCircle" : "errorCircle"}
                                                            className="w-6 h-6"/>
                                                    {t('register.wallet')}
                                                </div>
                                                <div className="flex gap-5 text-h4 items-center">
                                                    <Sprite
                                                        name={!isMismatched && address ? "confirmCircle" : "errorCircle"}
                                                        className="w-6 h-6"/>
                                                    {t('register.network')}
                                                </div>
                                                <div className="flex gap-5 text-h4 items-center">
                                                    <Sprite
                                                        name={(!isMismatched && address && Number(balance?.displayValue) > 0.01) ? "confirmCircle" : "errorCircle"}
                                                        className="w-6 h-6"/>
                                                    <div className="flex flex-col">
                                                        <span>{t('register.balance')}</span>
                                                        <div>{Number(balance?.displayValue).toFixed(3)} BNB, {Number(balanceUSDT?.displayValue).toFixed(0)} USDT, {Number(balanceDT1?.displayValue).toFixed(0)} CTG</div>
                                                    </div>
                                                </div>
                                                {(isLoadingApproveUSDT || isLoadingApproveDT1) ?
                                                    <div className="flex gap-5 text-h4 items-center">
                                                        <div className="w-6 h-6 rounded-full bg-main-gold "/>
                                                        <span>{t('register.approveWait')}</span>
                                                    </div> : <div className="flex gap-5 text-h4 items-center">
                                                        <Sprite
                                                            name={isApprovedUSDT && isApprovedDP1 ? "confirmCircle" : "errorCircle"}
                                                            className="w-6 h-6"/>
                                                        <span>{t('register.approveConfirm')}</span>
                                                    </div>}
                                                <p className="text-small text-main-gray-light/100">
                                                    *Для регистрации необходимо иметь 20 USDT и {courseDT1} CTG (<span>20 USDT</span>),
                                                    а так же 0.01 BNB для оплаты комиссии
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
