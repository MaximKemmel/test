import React, {useEffect, useMemo, useState} from 'react';
import Image from "next/image";
import ProgramBody from "@/components/dashboard/ProgramBody";
import {useAddress, useContract, useContractRead} from "@thirdweb-dev/react";
import {matrixLine5Abi} from "@/lib/abiLine5";
import {ethers} from "ethers";
import {useTranslations} from "next-intl";
import {CONFIG} from "@/lib/config";
import TreeRating from "@/components/dashboard/TreeRating";
import {useAuthStore} from "@/store/auth-store";
import {Mousewheel} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {getL5, getM3} from "@/lib/api";
import {matrixMB3Abi} from "@/lib/abiMB3";
import {M3Type} from "@/lib/interfaces";

interface Line5PageProps {
    level?: string | null
}

const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
}

export type TreeType = {
    id: number | null;
    size: number;
    children: TreeType[]
}

const DashboardPage = ({level}: Line5PageProps) => {

    const t = useTranslations('Dashboard')
    const {data: contractLine5} = useContract(CONFIG.contractLINE5, JSON.stringify(matrixLine5Abi.abi));
    const [price, setPrice] = useState('0')
    const {userInfo} = useAuthStore();
    const [address, setAddress] = useState<undefined | string>()
    const myAddress = useAddress();
    const [l5, setL5] = useState<null | M3Type>(null)


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

    const [treeArray, _] = useState([
        {
            id: getRandomInt(1000000), size: 80, children: [
                {
                    id: getRandomInt(1000000), size: 75, children: [
                        {
                            id: getRandomInt(1000000), size: 50, children: [
                                {id: getRandomInt(1000000), size: 26}, {id: getRandomInt(1000000), size: 26}
                            ]
                        }, {
                            id: getRandomInt(1000000), size: 50, children: [
                                {id: getRandomInt(1000000), size: 26}, {id: getRandomInt(1000000), size: 26}
                            ]
                        }
                    ]
                },
                {
                    id: getRandomInt(1000000), size: 75, children: [
                        {
                            id: getRandomInt(1000000), size: 50, children: [
                                {id: getRandomInt(1000000), size: 26}, {id: getRandomInt(1000000), size: 26}
                            ]
                        }, {
                            id: getRandomInt(1000000), size: 50, children: [
                                {id: getRandomInt(1000000), size: 26}, {id: getRandomInt(1000000), size: 26}, {id: getRandomInt(1000000), size: 26}
                            ]
                        }
                    ]
                }
            ]
        }, {
            id: getRandomInt(1000000), size: 80,
            children: [
                {
                    id: getRandomInt(1000000), size: 75, children: [
                        {
                            id: getRandomInt(1000000), size: 50, children: [
                                {id: getRandomInt(1000000), size: 26}, {id: getRandomInt(1000000), size: 26}
                            ]
                        },
                    ]
                },
                {
                    id: getRandomInt(1000000), size: 75, children: []
                },
            ]
        }, {
            id: getRandomInt(1000000), size: 80, children: [
                {
                    id: getRandomInt(1000000), size: 75, children: []
                }
            ]
        },
        {id: getRandomInt(1000000), size: 80, children: []},
        {
            id: null,
            size: 80,
            children: []
        }
    ])

    const profit = useMemo(() => {

        const find = l5?.profits.find(el => Number(el.level) === Number(level));

        if (find) {
            return find._sum.value
        }

        return 0
    }, [l5, level]);


    useEffect(() => {
        if (levelPriceLine5?._hex) {
            setPrice(Number(ethers.utils.formatUnits(levelPriceLine5?._hex)).toFixed(0))
        }
    }, [levelPriceLine5])

    useEffect(() => {
        (async function () {

            if (address) {

                getL5(address as string).then(res => {
                    if (res!.success && res) {
                        setL5(res.result)
                    }
                })
            }

        }())
    }, [address, myAddress])

    useEffect(() => {
        if (!address) {
            setAddress(myAddress)
        }
    }, [myAddress, address])

    return (
        <ProgramBody>
            <div className="flex items-center justify-between ">
                <p className="text-32 font-[550] xs:text-[20px] text-main-gold">{t('main.table2.item3')} {level}</p>
                <h3 className="text-32 absolute xs:text-[20px] translate-x-[-50%] left-[50%] font-[550]">
                    ID {userInfo?.currentUser?.id}
                </h3>
                <div className="flex items-center gap-x-[10px]">
                    <div className="h-[25px] w-[25px] bg-main-gold rounded-full xs:w-[24px] xs:h-[24px]"/>
                    <span className="text-32 font-[550] xs:text-[20px]">{price}</span>
                </div>
            </div>
            <div className="my-[30px] flex flex-col xs:justify-center xs:gap-[20px] xs:flex-wrap xs:my-auto w-full">
                <Swiper spaceBetween={10} slidesPerView={2} modules={[Mousewheel]} mousewheel={true}
                        className="flex items-center justify-center max-w-[920px]">
                    {
                        // @ts-ignore
                        treeArray.map((el: TreeType, idx: number) => {
                        return <SwiperSlide key={idx}><TreeRating tree={el} value={String(el.id)}
                                                                  empty={!el.id}/></SwiperSlide>
                    })}
                </Swiper>
            </div>
            <div className="flex items-center justify-between mt-auto xs:mt-0">
                <div className=" items-center gap-x-[18px] flex">
                    <div className="flex gap-x-[10px] items-end cursor-pointer">
                        <Image width={28} height={22} src={'/images/group.svg'} alt={'group'}/>
                        <span className="text-main-gray-2 text-24 font-[300]">{matrixLine5?.[1]?.length}</span>
                    </div>
                </div>
                <div className="text-24 text-main-gray-2 ">
                    {profit} USDT
                </div>
            </div>
        </ProgramBody>
    );
};

export default DashboardPage;
