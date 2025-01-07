import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import Image from "next/image";
import ProgramBody from "@/components/dashboard/ProgramBody";
import {useAddress, useContract, useContractRead} from "@thirdweb-dev/react";
import {matrixMB3Abi} from "@/lib/abiMB3";
import {ethers} from "ethers";
import {useTranslations} from "next-intl";
import {CONFIG} from "@/lib/config";
import Line5Rating from "@/components/dashboard/line5/Line5Rating";
import {useAuthStore} from "@/store/auth-store";
import {M3Type} from "@/lib/interfaces";
import {getCycleMatrix, getCycleMatrixM6, getM3, getUserById} from "@/lib/api";
import {useSeeAddressContext} from "@/providers/SeeAddressContext";
import {Button} from "flowbite-react";
import {CycleTransform} from "@/lib/utils";
import {useBoolean} from "usehooks-ts";

interface M3PageProps {
    level?: null | string
}

const M3Page = ({level}: M3PageProps) => {

    const t = useTranslations('Dashboard')
    const [parentId, setParentId] = useState<null | number>(null)
    const [userId, setUserId] = useState<null | number>(null)
    const [firstUserId, setFirstUserId] = useState<null | number>(null)
    const [address, setAddress] = useState<undefined | string>()
    const myAddress = useAddress();
    const [reinvestCount, setReinvestCount] = useState(0);
    const [price, setPrice] = useState('0')
    const [freeze, setIsFreeze] = useState(false)
    const {userInfo} = useAuthStore();
    const [m3, setM3] = useState<null | M3Type>(null)
    const {seeAddress, seeUser} = useSeeAddressContext()
    const [matrix, setMatrix] = useState<{ userId: number, place: number }[]>([])
    const [reinvest, setReinvest] = useState(0)
    const {value: modeReinvest, setValue: setModeReinvest} = useBoolean(false)

    const onSetNewLevel = async (id: number) => {
        const parent = await getUserById(String(id))

        if (parent.result.username) {
            setModeReinvest(false)
            setParentId(userId)
            setReinvest(reinvestCount)
            setUserId(Number(parent.result.userId))
            setAddress(parent.result.username)
        }
    }

    const handleGoToBack = async () => {
        const parent = await getUserById(String(firstUserId))

        if (parent.result.username) {
            setModeReinvest(false)
            setParentId(null)
            setUserId(Number(parent.result.userId))
            setAddress(parent.result.username)
        }
    }


    const getRating = useCallback(
        () => {

            if (matrix?.length > 2) {
                return matrix.slice(0, 3).sort((a, b) => {
                    return a.place - b.place;
                }).map((el: { userId: number, place: number }, idx: number) => {
                    return <Line5Rating reinvest={idx === 2 && modeReinvest} onClick={onSetNewLevel} size="m3" key={idx}
                                        value={String(el.userId)}/>
                })
            }

            switch (matrix?.length) {
                case 1: {
                    return <>
                        {matrix.sort((a, b) => {
                            return a.place - b.place;
                        }).map((el: { userId: number, place: number }, idx: React.Key | null | undefined) => {
                            return <Line5Rating onClick={onSetNewLevel} size="m3" key={idx} value={String(el.userId)}/>
                        })}
                        {Array(2).fill(null).map((_, idx) => {
                            return <Line5Rating size="m3" key={idx} empty/>
                        })}
                    </>
                }
                case 2: {
                    return <>
                        {matrix.sort((a, b) => {
                            return a.place - b.place;
                        }).map((el: { userId: number, place: number }, idx: React.Key | null | undefined) => {
                            return <Line5Rating onClick={onSetNewLevel} size="m3" key={idx} value={String(el.userId)}/>
                        })}
                        {Array(1).fill(null).map((_, idx) => {
                            return <Line5Rating size="m3" key={idx} empty/>
                        })}
                    </>
                }
                case 3: {
                    return <>
                        {matrix.sort((a, b) => {
                            return a.place - b.place;
                        }).slice(0, 3).map((el: {
                            userId: number,
                            place: number
                        }, idx: React.Key | null | undefined) => {
                            return <Line5Rating reinvest={idx === 2 && modeReinvest} onClick={onSetNewLevel} size="m3"
                                                key={idx} value={String(el.userId)}/>
                        })}
                    </>
                }
                default: {
                    return <>
                        {Array(3).fill(null).map((_, idx) => {
                            return <Line5Rating size="m3" key={idx} empty/>
                        })}
                    </>
                }
            }
        },
        [matrix, modeReinvest],
    );

    const profit = useMemo(() => {

        const find = m3?.profits.find(el => Number(el.level) === Number(level));

        if (find) {
            return find._sum.value
        }

        return 0
    }, [m3, level]);

    const handleDownReinvest = () => {
        if (level && address && reinvest > 0) {
            getCycleMatrix(String(reinvest - 1), '2', level, address).then(async res => {
                if (res && res!.result) {
                    setModeReinvest(true)
                    setReinvest(prev => prev - 1)
                    setMatrix(res.result)
                }
            })
        }
    }

    const handleUpReinvest = () => {
        if (level && address && (reinvest + 1 <= reinvestCount)) {
            if (reinvestCount === reinvest + 1) {
                setModeReinvest(false)
            }

            getCycleMatrix(String(reinvest + 1), '2', level, address).then(async res => {
                if (res && res!.result) {
                    setReinvest(prev => prev + 1)
                    setMatrix(res.result)
                }
            })
        }
    }

    const groupCount = useMemo(() => {

        if (reinvestCount > 0) {
            let all = (reinvestCount + 1) * 3

            switch (matrix?.length) {
                case 0: {
                    all = all - 3
                    break;
                }
                case 1: {
                    all = all - 2
                    break
                }
                case 2: {
                    all = all - 1
                    break
                }
            }

            return all
        }

        return matrix?.length || 0
    }, [matrix, reinvestCount])

    useEffect(() => {
        if (level && address) {
            getCycleMatrix(String(reinvestCount), '2', level, address).then(res => {
                if (res && res.result) {
                    setMatrix(res.result)
                }
            })
        }
    }, [level, address, reinvestCount])

    useEffect(() => {
        (async function () {

            if (address) {
                getM3(address as string).then(res => {
                    if (res!.success && res) {
                        setM3(res.result)
                        const price = res.result.levelPrice[Number(level) - 1]
                        const reinvest = res.result.reinvests[Number(level) - 1]
                        const frozenLevel = res.result.frozenLevels[Number(level) - 1]

                        setPrice(String(price))
                        setReinvestCount(reinvest)
                        setIsFreeze(frozenLevel)
                    }
                })
            }

        }())
    }, [address, myAddress]);


    useEffect(() => {
        if (reinvestCount) {
            setReinvest(reinvestCount)
        }
    }, [reinvestCount]);

    useEffect(() => {
        if (seeAddress && !address) {
            setAddress(seeAddress)
        } else if (!address) {
            setAddress(myAddress)
        }
    }, [myAddress, address, seeAddress]);


    useEffect(() => {
        if (!userId && userInfo) {
            setUserId(userInfo.currentUser?.userId as number)
            setFirstUserId(userInfo.currentUser?.userId as number)
        } else if (!userId && seeUser) {
            setUserId(seeUser?.userId as unknown as number)
            setFirstUserId(seeUser?.userId as unknown as number)
        }
    }, [userInfo, userId])

    return (
        <div className="flex flex-col">
            {parentId ?
                <button onClick={handleGoToBack} className="self-center bg-main-yellow py-4 px-6 rounded-xl max-w-[50%]"
                >
                    Ваш upline (ID): {parentId}
                </button> : null}
            <ProgramBody bodyClassName="!pb-0 !relative">
                <div className="flex items-center justify-between">
                    <p className="text-32  font-[550] xs:text-[20px] text-main-gold">{t('main.table2.item3')} {level}</p>
                    <h3 className="text-32 font-[550] xs:text-[20px] absolute translate-x-[-50%] left-[50%]">
                        ID {userId}
                    </h3>
                    <div className="flex items-center gap-x-[10px]">
                        <div className="h-[25px] w-[25px] bg-main-gold rounded-full"/>
                        <span className="text-32 xs:text-[20px] font-[550]">{price}</span>
                    </div>
                </div>
                <div className="mt-[35px] xs:mt-auto xs:mb-auto xs:justify-between flex justify-around xs:gap-x-0">
                    {getRating()}
                </div>
                <div className="flex items-center justify-between mt-auto xs:mt-0">
                    <div className=" items-center gap-x-[18px] flex">
                        <div className="flex gap-x-[10px] items-end cursor-pointer">
                            <Image width={28} height={22} src={'/images/group.svg'} alt={'group'}/>
                            <span className="text-main-gray-2 text-24 font-[300]">{groupCount}</span>
                        </div>
                        <div className="flex gap-x-[10px] items-center cursor-pointer ">
                            <Image width={20} height={22} src={'/images/refresh.svg'} alt={'refresh'}/>
                            <span className="text-main-gray-2 text-24 font-[300]">{reinvestCount}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-[10px] w-[108px] absolute  left-1/2 transform -translate-x-1/2">
                        <svg onClick={handleDownReinvest} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4" fillRule="evenodd" clipRule="evenodd" d="M13.7657 2.90662C14.0781 3.22483 14.0781 3.74074 13.7657 4.05894L7.93137 10.0013L13.7657 15.9437C14.0781 16.2619 14.0781 16.7778 13.7657 17.096C13.4533 17.4142 12.9467 17.4142 12.6343 17.096L6.23431 10.5775C5.9219 10.2593 5.9219 9.74335 6.23431 9.42514L12.6343 2.90662C12.9467 2.58842 13.4533 2.58842 13.7657 2.90662Z" fill="#BCBCBC"/>
                        </svg>
                        <div className='h-[32px] flex items-center justify-center w-[50px] bg-[#FFFFFF08] rounded-[5px]'>
                            <span className="text-[#FFFFFF] text-20 opacity-40">{reinvest}</span>
                        </div>
                        <svg  onClick={handleUpReinvest} className="rotate-180" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4" fillRule="evenodd" clipRule="evenodd" d="M13.7657 2.90662C14.0781 3.22483 14.0781 3.74074 13.7657 4.05894L7.93137 10.0013L13.7657 15.9437C14.0781 16.2619 14.0781 16.7778 13.7657 17.096C13.4533 17.4142 12.9467 17.4142 12.6343 17.096L6.23431 10.5775C5.9219 10.2593 5.9219 9.74335 6.23431 9.42514L12.6343 2.90662C12.9467 2.58842 13.4533 2.58842 13.7657 2.90662Z" fill="#BCBCBC"/>
                        </svg>
                    </div>
                    <div className="text-24 text-main-gray-2 ">
                        {profit} BUSD
                    </div>
                </div>
                {freeze ? <Image className="absolute bottom-[15px] right-[15px]" width={32} height={32}
                                 src={'/images/freeze.svg'} alt={'refresh'}/> : null}
            </ProgramBody>
        </div>
    );
};

export default memo(M3Page);
