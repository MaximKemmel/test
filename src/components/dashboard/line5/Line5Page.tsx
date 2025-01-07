import React, {useEffect, useMemo, useState} from 'react';
import Image from "next/image";
import ProgramBody from "@/components/dashboard/ProgramBody";
import {useAddress, useContract, useContractRead} from "@thirdweb-dev/react";
import {matrixLine5Abi} from "@/lib/abiLine5";
import {ethers} from "ethers";
import {useTranslations} from "next-intl";
import {CONFIG} from "@/lib/config";
import {useAuthStore} from "@/store/auth-store";
import {getL5, getPartnersForL5, getUserById} from "@/lib/api";
import {M3Type, Partners} from "@/lib/interfaces";
import DashboardRating from "@/components/dashboard/DashboardRating";
import {Breadcrumb, Pagination} from "flowbite-react";
import {useSeeAddressContext} from "@/providers/SeeAddressContext";

interface Line5PageProps {
    level?: string | null
}

const Line5Page = ({level}: Line5PageProps) => {

    const t = useTranslations('Dashboard')
    const {data: contractLine5} = useContract(CONFIG.contractLINE5, JSON.stringify(matrixLine5Abi.abi));
    const [price, setPrice] = useState('0')
    const [userId, setUserId] = useState<null | number>(null)
    const {userInfo} = useAuthStore();
    const [address, setAddress] = useState<undefined | string>()
    const myAddress = useAddress();
    const [breadcrumbs, setBreadcrumbs] = useState<{level: number, id: number}[]>([])
    const [l5, setL5] = useState<null | Partners>(null)
    const [l5Stats, setL5Stats] = useState<null | M3Type>(null)
    const [currentPage, setCurrentPage] = useState(1);
    const {seeAddress, seeUser} = useSeeAddressContext()

    const onPageChange = (page: number) => setCurrentPage(page);


    const totalPages = useMemo(() => {
        if (l5?.partnersCount) {
            return Math.ceil(Number(l5?.partnersCount) / 50)
        }
        return 1
    }, [l5])

    const onSetNewLevel = async (id: number) => {
        const parent = await getUserById(String(id))

        if (parent.result.username) {

            setCurrentPage(1)
            setBreadcrumbs(prev => {

                const max = Math.max(...prev.map(el => el.level)) || 0

                return [...prev, {id: Number(parent.result.userId), level: max + 1}]
            })
            setUserId(Number(parent.result.userId))
            setAddress(parent.result.username)
        }
    }

    const handleGoToBack = async (id: number, level: number) => {
        const parent = await getUserById(String(id))

        if (parent.result.username) {
            setCurrentPage(1)
            setBreadcrumbs(prev => {
                return [...prev.filter(el => el.level <= level)]
            })
            setUserId(Number(parent.result.userId))
            setAddress(parent.result.username)
        }
    }

    const {data: matrixLine5} = useContractRead(
        contractLine5,
        "getUsersLine5Matrix",
        [address, level]
    );

    const {data: levelPriceLine5} = useContractRead(
        contractLine5,
        "levelPriceLine5",
        [level]
    );

    const profit = useMemo(() => {

        const find = l5Stats?.profits.find(el => Number(el.level) === Number(level));

        if (find) {
            return find._sum.value
        }

        return 0
    }, [l5Stats, level]);

    useEffect(() => {
        if (!userId && userInfo) {
            setUserId(userInfo.currentUser?.userId as number)
            setBreadcrumbs([{id: userInfo.currentUser?.userId || 0, level: 1}])
        } else if (!userId && seeUser) {
            setUserId(seeUser?.userId as unknown as number)
            setBreadcrumbs([{id: Number(seeUser?.userId) || 0, level: 1}])
        }
    }, [userInfo, userId, seeUser])

    useEffect(() => {
        if (levelPriceLine5?._hex) {
            setPrice(Number(ethers.utils.formatUnits(levelPriceLine5?._hex)).toFixed(0))
        }
    }, [levelPriceLine5])


    useEffect(() => {
        (async function () {
            if (address) {
                getPartnersForL5(currentPage, 50, address as string, level as string).then(res => {
                    if (res!.success && res) {
                        setL5(res.user)
                    }
                })
                getL5(address as string).then(res => {
                    if (res!.success && res) {
                        setL5Stats(res.result)
                    }
                })

            }
        }())
    }, [address, myAddress, currentPage])


    useEffect(() => {
        if (!seeAddress && myAddress) {
            setAddress(myAddress)
        } else if (seeAddress) {
            setAddress(seeAddress)
        }
    }, [seeAddress, myAddress])

    console.log(breadcrumbs)

   return (
        <>
            <div className="flex items-center gap-5 flex-wrap relative h-[26px] mx-auto w-[90%]">
                <Breadcrumb aria-label="Default breadcrumb example">
                    <Breadcrumb.Item   >
                        <span className="text-white opacity-40 text-[16px]">Все уровни</span>
                    </Breadcrumb.Item>
                    {breadcrumbs.map(el => {
                        return <Breadcrumb.Item onClick={() => handleGoToBack(el.id, el.level)} className="cursor-pointer" key={el.id}>
                            <span className="text-white text-[16px]">ID <span>{el.id}</span></span>
                        </Breadcrumb.Item>
                    })}
                </Breadcrumb>
                <h4 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-32 underline">
                    ID {breadcrumbs[0]?.id}
                </h4>
            </div>
            <ProgramBody bodyClassName="!mt-0" className="!mt-[10px]">
                <div className="flex items-center justify-between ">
                    <p className="text-32 font-[550] xs:text-[20px] text-main-gold">{t('main.table2.item3')} {level}</p>
                    <h3 className="text-32 absolute xs:text-[20px] translate-x-[-50%] left-[50%] font-[550]">
                        ID {userId}
                    </h3>
                    <div className="flex items-center gap-x-[10px]">
                        <div className="h-[25px] w-[25px] bg-main-gold rounded-full xs:w-[24px] xs:h-[24px]"/>
                        <span className="text-32 font-[550] xs:text-[20px]">{price}</span>
                    </div>
                </div>
                <div className="my-[30px] flex flex-col xs:justify-center xs:gap-[20px] xs:flex-wrap xs:my-auto w-full">
                    <div className="flex  justify-center gap-4 flex-wrap">
                        {l5?.referrals.map((referral, idx) => {
                            return <DashboardRating partnersCount={referral.partnersCount} onClick={onSetNewLevel} red={false} key={idx} value={referral.username}/>
                        })}
                        {l5?.referrals && l5?.referrals.length < 6 ? Array(5 - (l5?.referrals.length || 0)).fill(null).map((referral, idx) => {
                            return <DashboardRating key={idx} empty/>
                        }) : null}
                    </div>
                </div>
                <div className="flex items-center justify-between mt-auto xs:mt-0 relative">
                    <div className=" items-center gap-x-[18px] flex">
                        <div className="flex gap-x-[10px] items-end cursor-pointer">
                            <Image width={28} height={22} src={'/images/group.svg'} alt={'group'}/>
                            <span className="text-main-gray-2 text-24 font-[300]">{matrixLine5?.[1]?.length}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-[10px] w-[108px] absolute  left-1/2 transform -translate-x-1/2">
                        <svg onClick={() => {
                            if (currentPage - 1 > 0) onPageChange(currentPage - 1)
                        }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4" fillRule="evenodd" clipRule="evenodd" d="M13.7657 2.90662C14.0781 3.22483 14.0781 3.74074 13.7657 4.05894L7.93137 10.0013L13.7657 15.9437C14.0781 16.2619 14.0781 16.7778 13.7657 17.096C13.4533 17.4142 12.9467 17.4142 12.6343 17.096L6.23431 10.5775C5.9219 10.2593 5.9219 9.74335 6.23431 9.42514L12.6343 2.90662C12.9467 2.58842 13.4533 2.58842 13.7657 2.90662Z" fill="#BCBCBC"/>
                        </svg>
                        <div className='h-[32px] flex items-center justify-center w-[50px] bg-[#FFFFFF08] rounded-[5px]'>
                            <span className="text-[#FFFFFF] text-20 opacity-40">{currentPage - 1}</span>
                        </div>
                        <svg onClick={() => {
                            if (currentPage + 1 < totalPages) {
                                onPageChange(currentPage + 1)
                            }
                        }} className="rotate-180" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4" fillRule="evenodd" clipRule="evenodd" d="M13.7657 2.90662C14.0781 3.22483 14.0781 3.74074 13.7657 4.05894L7.93137 10.0013L13.7657 15.9437C14.0781 16.2619 14.0781 16.7778 13.7657 17.096C13.4533 17.4142 12.9467 17.4142 12.6343 17.096L6.23431 10.5775C5.9219 10.2593 5.9219 9.74335 6.23431 9.42514L12.6343 2.90662C12.9467 2.58842 13.4533 2.58842 13.7657 2.90662Z" fill="#BCBCBC"/>
                        </svg>
                    </div>
                    <div className="text-24 text-main-gray-2 ">
                        {profit} BUSD
                    </div>
                </div>
            </ProgramBody>
        </>
    );
};

export default Line5Page;
