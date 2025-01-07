import React, {useEffect, useState} from 'react';
import clsx from "clsx";
import Image from "next/image";
import {useTranslations} from "next-intl";
import {getTransactionsDashboard} from "@/lib/api";
import {useAddress} from "@thirdweb-dev/react";
import {Transaction} from "@/lib/interfaces";
import {formatDate} from "@/lib/date";
import {useSeeAddressContext} from "@/providers/SeeAddressContext";
import {openHash} from "@/lib/data";

const ProgramTable = ({activeProgram}: { activeProgram: number | null }) => {

    const [rows, setRows] = useState<Transaction[]>()
    const [count, setCount] = useState<number>(20)
    const [address, setAddress] = useState<undefined | string>()
    const myAddress = useAddress();
    const t = useTranslations('Dashboard')
    const {seeAddress} = useSeeAddressContext()

    useEffect(() => {
        if (address) {
            getTransactionsDashboard(address, activeProgram, count).then(res => {
                if (res) {
                    setRows(res.result)
                }
            })
        }
    }, [address, activeProgram, count])

    useEffect(() => {
        if (!seeAddress && myAddress) {
            setAddress(myAddress)
        } else if (seeAddress) {
            setAddress(seeAddress)
        }
    }, [seeAddress, myAddress])

    return (
        <div className="space-y-[40px] pl-[29px] pr-[35px] py-[44px] program-table border-yellow">
            <div className="w-full xs:overflow-x-scroll">
                <table
                    className="w-full xs:min-w-[800px] ">
                    <thead>
                    <tr>
                        <th align="left" className=" text-20 text-main-gray-2">{t('main.table2.item1')}</th>
                        <th className=" text-20 text-main-gray-2">{t('main.table2.item2')}</th>
                        <th className=" text-20 text-main-gray-2">ID</th>
                        <th className=" text-20 text-main-gray-2">{t('main.table2.item3')}</th>
                        <th className=" text-20 text-main-gray-2">{t('main.table2.item4')}</th>
                        <th className=" text-20 text-main-gray-2">USDT</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows?.length ? rows.map((statistic, index, array) => {

                        return (
                            <tr className={clsx('border-b', array.length - 1 === index && 'border-b-none')} key={index}>
                                <td className="    items-end uppercase border-main-gray-light flex justify-start ">
                                    <div className="w-[84px] mb-[8px] relative">
                                        {statistic.profitType === 'M6UPLINER' ? <div className="bg-[#10761A] w-[50px] h-[50px] rounded-full flex justify-center pt-[10px] ">
                                            <Image className="h-[25px]" unoptimized width={25} height={25} src={"/images/up.svg"} alt="up" />
                                        </div> : <Image unoptimized width={50} height={50}
                                                src={statistic.profitType === 'MISSED' ? '/images/upush.svg' :
                                                    statistic.profitType === 'OVERTAKE' ? '/images/obgon.svg' :
                                                        statistic.profitType === 'ADDITIONAL' ? '/images/dop.svg'
                                                            : statistic.profitType === 'REINVEST' ? '/images/reinvest.png' : '/images/avatar.png'}
                                                alt={'avatar'}/>}
                                        {statistic.receiver && (statistic.profitType === 'REINVEST' || statistic.profitType === 'M6UPLINER') ? <div
                                            className="absolute text-right top-0 right-0 text-main-home-green text-[12px] w-[50px] overflow-hidden whitespace-nowrap text-ellipsis">
                                            ID{statistic.receiver}
                                        </div> : null}
                                    </div>
                                </td>
                                <td className=" border-main-gray-light">
                                    <div className="flex items-end justify-center h-full mb-[4px] ">
                                    <span
                                        className="text-20 font-[550]">{formatDate(statistic.createdAt, 'DD.MM.YYYY HH:mm')}</span>
                                    </div>
                                </td>
                                <td className=" border-main-gray-light  ">
                                    <div className="h-full w-full flex justify-center items-end">
                                        <div
                                            className="py-[6px] px-[12px] bg-id inline-flex rounded-[10px] text-18 font-[550] mb-[8px]">
                                            ID {statistic.User.userId}
                                        </div>
                                    </div>
                                </td>
                                <td className=" border-main-gray-light ">
                                    <div
                                        className="h-full w-full text-20 font-[550] mb-[4px] flex justify-center items-end">
                                        {
                                            // @ts-ignore
                                            statistic.level || 'Нет'}
                                    </div>
                                </td>
                                <td className="  border-main-gray-light  ">
                                    <div className="h-full w-full  mb-[8px] flex justify-center items-end">
                                        <div className="flex items-end gap-x-[10px]">
                                        <span onClick={(e) => {
                                            navigator?.clipboard?.writeText(statistic.transactionHash);
                                            const target = e?.target as HTMLElement;
                                            target.style.color = '#64D121';
                                            setTimeout(() => target.style.color = '', 1000);
                                        }}
                                              className="text-20 font-[550]">{`${statistic.transactionHash?.slice(0, 6)}...${statistic.transactionHash?.slice(-4)}`}</span>
                                            <svg onClick={() => openHash(statistic.transactionHash)}
                                                 className="cursor-pointer" width="24" height="24" viewBox="0 0 24 24"
                                                 fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M2.5 20.5V10.5C2.5 9.9477 2.94771 9.5 3.5 9.5H9.5H13.5C14.0523 9.5 14.5 9.9477 14.5 10.5V14.5V20.5C14.5 21.0523 14.0523 21.5 13.5 21.5H3.5C2.94771 21.5 2.5 21.0523 2.5 20.5Z"
                                                    fill="#1C1B1E"/>
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                      d="M6.5 10.25C3.36192 10.25 3.25 10.3619 3.25 10.5V20.5C3.25 20.6381 3.36192 20.75 3.5 20.75H13.5C13.6381 20.75 13.75 20.6381 13.75 20.5V10.5C13.75 10.3619 13.6381 10.25 13.5 10.25H3.5ZM1.75 10.5C1.75 9.53348 2.53351 8.75 3.5 8.75H13.5C14.4665 8.75 15.25 9.53349 15.25 10.5V20.5C15.25 21.4665 14.4665 22.25 13.5 22.25H3.5C2.53351 22.25 1.75 21.4665 1.75 20.5V10.5Z"
                                                      fill="white"/>
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                      d="M10.5 3.25C10.3619 3.25 10.25 3.36192 10.25 3.5V8.5C10.25 8.63809 10.3619 8.75 10.5 8.75H13.5C14.4665 8.75 15.25 9.53349 15.25 10.5V13.5C15.25 13.6381 15.3619 13.75 15.5 13.75H20.5C20.6381 13.75 20.75 13.6381 20.75 13.5V3.5C20.75 3.36192 20.6381 3.25 20.5 3.25H10.5ZM8.75 3.5C8.75 2.53351 9.53348 1.75 10.5 1.75H20.5C21.4665 1.75 22.25 2.53351 22.25 3.5V13.5C22.25 14.4665 21.4665 15.25 20.5 15.25H15.5C14.5335 15.25 13.75 14.4665 13.75 13.5V10.5C13.75 10.3619 13.6381 10.25 13.5 10.25H10.5C9.53349 10.25 8.75 9.46651 8.75 8.5V3.5Z"
                                                      fill="white"/>
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                                <td className="  border-main-gray-light  ">
                                    <div
                                        className="w-full h-full mb-[4px] flex items-end justify-center text-20 text-main-green">
                                        {statistic.transitValue ? statistic.transitValue : statistic.value} USDT
                                    </div>
                                </td>
                            </tr>
                        )
                    }) : null}
                    </tbody>
                </table>
            </div>
            {rows?.length || 1 > 20 ? <div className="w-full">
                <div className=" text-main-gray-light/100  col-span-6 text-center"
                     onClick={() => setCount(prev => prev + 20)}>
                    <span
                        className=" border-b cursor-pointer border-main-gray-light/100 pb-[5px]">{t('main.more')}</span>
                </div>
            </div> : null}

        </div>
    )
        ;
};

export default ProgramTable;
