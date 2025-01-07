import React, {Fragment, memo, useCallback, useEffect, useMemo, useState} from 'react';
import Image from "next/image";
import ProgramBody from "@/components/dashboard/ProgramBody";
import {useAddress, useContract, useContractRead} from "@thirdweb-dev/react";
import {matrixMB6Abi} from "@/lib/abiMB6";
import {ethers} from "ethers";
import {useTranslations} from "next-intl";
import {CONFIG} from "@/lib/config";
import M6Rating from "@/components/dashboard/m6/M6Rating";
import {getCycleMatrix, getCycleMatrixM6, getM6, getUserById} from "@/lib/api";
import {M3Type} from "@/lib/interfaces";
import {useAuthStore} from "@/store/auth-store";
import {useSeeAddressContext} from "@/providers/SeeAddressContext";
import {Button} from "flowbite-react";
import {useBoolean} from "usehooks-ts";

interface M6PageProps {
    level?: null | string
}

const M6Page = ({level}: M6PageProps) => {

    const t = useTranslations('Dashboard')
    const [parentId, setParentId] = useState<null | number>(null)
    const {data: contractMB6} = useContract(CONFIG.contractM6, JSON.stringify(matrixMB6Abi.abi));
    const [address, setAddress] = useState<undefined | string>()
    const myAddress = useAddress();
    const [userId, setUserId] = useState<null | number>(null)
    const [firstUserId, setFirstUserId] = useState<null | number>(null)
    const [m6, setM6] = useState<null | M3Type>(null)
    const {userInfo} = useAuthStore();
    const [matrix, setMatrix] = useState<{userId: number, place: number}[]>([])
    const {seeAddress, seeUser} = useSeeAddressContext()
    const [reinvest, setReinvest] = useState(0)
    const {value: modeReinvest, setValue: setModeReinvest} = useBoolean(false)
    const [reinvestCount, setReinvestCount] = useState(0);
    const [price, setPrice] = useState('0')

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

    useEffect(() => {
        (async function () {

            if (address) {

                getM6(address as string).then(res => {
                    if (res!.success && res) {
                        setM6(res.result)
                        const price = res.result.levelPrice[Number(level) - 1]
                        const reinvest = res.result.reinvests[Number(level) - 1]

                        setPrice(String(price))
                        setReinvestCount(reinvest)
                    }
                })
            }

        }())
    }, [address])

    const handleDownReinvest = () => {
        if (level && address && reinvest > 0) {
            getCycleMatrixM6(String(reinvest - 1), '3', level, address).then(async res => {
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

            getCycleMatrixM6(String(reinvest + 1), '3', level, address).then(async res => {
                if (res && res!.result) {
                    setReinvest(prev => prev + 1)
                    setMatrix(res.result)
                }
            })
        }
    }

    useEffect(() => {
        if (reinvestCount) {
            setReinvest(reinvestCount)
        }
    }, [reinvestCount])

    const getRating = useCallback(
        () => {

            if (matrix?.length) {

                if (matrix?.length === 1) {
                    return <>
                        <M6Rating child={[matrix.find(el => el.place === 2), matrix.find(el => el.place === 4)]} onClick={onSetNewLevel}
                                   level={level} value={matrix[0]}/>
                        <M6Rating  empty/>
                    </>
                }

                return [matrix.find(el => el.place === 0), matrix.find(el => el.place === 1)].map((el: any, idx: number) => {
                    return <M6Rating empty={!el} child={idx === 0 ? [matrix.find(el => el.place === 2), matrix.find(el => el.place === 4)]
                        : [matrix.find(el => el.place === 3), matrix.find(el => el.place === 5)]}
                                     onClick={onSetNewLevel} level={level} key={idx} value={el}/>
                })
            } else {
                return <>
                    {Array(2).fill(null).map((_, idx) => {
                        return <M6Rating key={idx} empty/>
                    })}
                </>
            }

        },
        [matrix],
    );


    const profit = useMemo(() => {

        const find = m6?.profits.find(el => Number(el.level) === Number(level));

        if (find) {
            return find._sum.value
        }

        return 0
    }, [m6, level]);


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
    }, [userInfo, userId, seeUser])

    useEffect(() => {
        if (level && address) {
            getCycleMatrixM6(String(reinvestCount), '3', level, address).then(res => {
                if (res && res.result)
                    setMatrix(res.result)
            })
        }
    }, [level, address, reinvestCount])

    return (
        <div className="flex flex-col">
            {parentId ?
                <button onClick={handleGoToBack} className="self-center bg-main-yellow py-4 px-6 rounded-xl max-w-[50%]"
                >
                    Ваш upline (ID): {parentId}
                </button> : null}

            <ProgramBody className="xs:h-[500px]">
                <div className="flex items-center justify-between">
                    <p className="text-32  font-[550] xs:text-[20px] text-main-gold">{t('main.table2.item3')} {level}</p>
                    <h3 className="text-32 font-[550] xs:text-[20px] absolute translate-x-[-50%] left-[50%]">
                        ID {userId}
                    </h3>
                    <div className="flex items-center gap-x-[10px]">
                        <div className="h-[25px] w-[25px] bg-main-gold rounded-full xs:w-[24px] xs:h-[24px]"/>
                        <span className="text-32 xs:text-[20px] font-[550]">{price}</span>
                    </div>
                </div>
                <div
                    className="mt-[28px] xs:flex-col flex justify-center gap-x-[114px] xs:my-auto xs:gap-x-0 xs:gap-y-[10px]">
                    {getRating()}
                </div>
                <div className="flex items-center justify-between mt-auto">
                    <div className=" items-center gap-x-[18px] flex">
                        <div className="flex gap-x-[10px] items-end cursor-pointer">
                            <Image width={28} height={22} src={'/images/group.svg'} alt={'group'}/>
                            <span className="text-main-gray-2 text-24 font-[300]">{matrix?.length || 0}</span>
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
            </ProgramBody>
        </div>
    );
};

export default memo(M6Page);
