import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Image from "next/image";
import clsx from "clsx";
import BasketIcon from "@/components/icons/BasketIcon";
import {useAddress, useContract, useContractWrite} from "@thirdweb-dev/react";
import {ethers} from "ethers";
import {matrixManagerAbi} from "@/lib/abi";
import {useTranslations} from "next-intl";
import {CONFIG} from "@/lib/config";
import { getCycleMatrixM6, getM6} from "@/lib/api";
import M6Rating2 from "@/components/dashboard/m6/M6Rating2";
import {useSeeAddressContext} from "@/providers/SeeAddressContext";
import {useCounter} from "usehooks-ts";

interface M3Props {
    active?: boolean
    level: string
    setActive(): void
}

const contractAddress = CONFIG.contact_MATRIX_MANAGER

const M6 = ({active, setActive, level}: M3Props) => {

    const { count, increment } = useCounter(0)
    const t = useTranslations('Dashboard')
    const {data: contract} = useContract(contractAddress, JSON.stringify(matrixManagerAbi.abi));
    const [address, setAddress] = useState<undefined | string>()
    const myAddress = useAddress();
    const [matrix, setMatrix] = useState<{userId: number, place: number}[]>([])
    const [price, setPrice] = useState('0')
    const [freeze, setIsFreeze] = useState(false)

    const {seeAddress} = useSeeAddressContext()
    const {data: contractUSDT} = useContract(CONFIG.contractUSDT);
    const {data: contractDP1} = useContract(CONFIG.contractDT1);

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

    const [matrixMB6Active, setM6Active] = useState(false)

    const {mutateAsync: buyNewLevel} = useContractWrite(
        contract,
        "buyNewLevel",
    );

    const disabledBuy = useMemo(() => {
        return false
    }, []);


    const onBuyNewLevel = async () => {

        if (disabledBuy) {
            return alert(t('main.messages.newLevelError'))
        }

        let buyNewLevelConf = confirm(t('main.messages.newLevelConfirm'));

        if (buyNewLevelConf) {

            const approveOptions = {
                args: [contractAddress, ethers.utils.parseUnits(String(Number(price)), 18)]
            }

            const allowanceOptions = {
                args: [address, contractAddress]
            }

            approveUSDT(approveOptions).then(
                () => approveDP1(approveOptions)
                    .then(() => allowanceUSDT(allowanceOptions).then(() => allowanceDP1(allowanceOptions).then(async () => {
                        buyNewLevel({
                            args: ['3', level],
                        }).then(res => {
                            alert('Уровень успешно приобретен')
                            increment()
                        })
                    }))))
        }
    }

    const getRating = useCallback(
        () => {

            if (matrix?.length === 1) {
                return <>
                    {matrix.map((el:  {userId: number, place: number}, idx: number) => {
                            return <M6Rating2 child={idx === 0 ? [matrix.find(el => el.place === 2),
                                matrix.find(el => el.place === 4)
                            ] : [matrix.find(el => el.place === 3), matrix.find(el => el.place === 5)]}
                                              level={level} key={idx} value={el}/>
                        })}
                    <div className="flex flex-col gap-y-[7px] ">
                        <div
                            className="h-[30px] w-[30px] self-center rounded-full outline outline-1 outline-main-gold"/>
                        <div className="flex items-center gap-x-[30px]">
                            <div
                                className="h-[22px] w-[22px] items-center rounded-full outline outline-1 outline-main-gold"/>
                            <div
                                className="h-[22px] w-[22px] items-center rounded-full outline outline-1 outline-main-gold"/>
                        </div>
                    </div>
                </>

            }

            if (matrix?.length) {
                return [matrix.find(el => el.place === 0), matrix.find(el => el.place === 1)].map((el:  any, idx: number) => {
                    return <M6Rating2 empty={!el} child={idx === 0 ? [matrix.find(el => el.place === 2),
                        matrix.find(el => el.place === 4)
                    ] : [matrix.find(el => el.place === 3), matrix.find(el => el.place === 5)]}
                                      level={level} key={idx} value={el}/>
                })
            } else {
                return <>
                    <div className="flex flex-col gap-y-[7px] ">
                        <div
                            className="h-[30px] w-[30px] self-center rounded-full outline outline-1 outline-main-gold"/>
                        <div className="flex items-center gap-x-[30px]">
                            <div
                                className="h-[22px] w-[22px] items-center rounded-full outline outline-1 outline-main-gold"/>
                            <div
                                className="h-[22px] w-[22px] items-center rounded-full outline outline-1 outline-main-gold"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-[7px] ">
                        <div
                            className="h-[30px] w-[30px] self-center rounded-full outline outline-1 outline-main-gold"/>
                        <div className="flex items-center gap-x-[30px]">
                            <div
                                className="h-[22px] w-[22px] items-center rounded-full outline outline-1 outline-main-gold"/>
                            <div
                                className="h-[22px] w-[22px] items-center rounded-full outline outline-1 outline-main-gold"/>
                        </div>
                    </div>
                </>

            }
        },
        [matrix],
    );

    const [reinvestCount, setReinvestCount] = useState(0);

    const onActive = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        e.preventDefault()
        if (matrixMB6Active) {
            setActive()
        } else {
            await onBuyNewLevel()
        }
    }

    useEffect(() => {
        (async function () {

            if (address) {
                getM6(address as string).then(res => {
                    if (res!.success && res) {

                        const price = res.result.levelPrice[Number(level) - 1]
                        const reinvest = res.result.reinvests[Number(level) - 1]
                        const activeLevel = res.result.activeLevels[Number(level) - 1]
                        const frozenLevel = res.result.frozenLevels[Number(level) - 1]

                        setPrice(String(price))
                        setReinvestCount(reinvest)
                        setM6Active(activeLevel)
                        setIsFreeze(frozenLevel)
                    }
                })
            }

        }())
    }, [address, myAddress, count])

    useEffect(() => {
        if (!seeAddress && myAddress) {
            setAddress(myAddress)
        } else if (seeAddress) {
            setAddress(seeAddress)
        }
    }, [seeAddress, myAddress])

    useEffect(() => {
        if (level && address) {
            getCycleMatrixM6(String(reinvestCount), '3', level, address).then(res => {
                if (res && res.result)
                    setMatrix(res.result)
            })
        }
    }, [level, address, reinvestCount, count])

    if (seeAddress && !matrixMB6Active) {
        return <div></div>
    }

    return (
        <div onClick={onActive}
             className={clsx("py-[20px] px-[15px] relative xs:p-[20px] cursor-pointer h-[194px] rounded-[10px] bg-line5 border-yellow flex flex-col", active === true ? 'bg-line5-active xs:h-[170px]'
                     : 'xs:h-[210px]',
                 // (seeAddress && matrixMB6Active) && 'max-w-[50%] xs:max-w-full',
                 (disabledBuy && !matrixMB6Active) && 'bg-disabled')}>
            <div className="flex items-center justify-between">
                <p className="text-32 font-[550] xs:!text-[20px] text-main-gold">Lvl {level}</p>
                <div className="flex items-center gap-x-[10px]">
                    <div className="h-[25px] w-[25px] xs:h-[24px] xs:w-[24px] bg-main-gold rounded-full"/>
                    <span className="text-32 font-[550] xs:!text-[20px]">{price}</span>
                </div>
            </div>
            {!matrixMB6Active ? <>
                <div
                    className="mt-[37px] xs:mt-auto xs:mb-auto flex gap-x-[18px] justify-center items-center cursor-pointer select-none">
                    <BasketIcon/>
                    <span className="text-24 text-main-gray-2 font-[300]">{t('main.activate')}</span>
                </div>
            </> : matrixMB6Active ? <>
                <div className="mt-[17px] xs:mt-auto flex justify-around items-center xs:px-[20px]">
                    {getRating()}
                </div>
                <div className="mt-auto items-center gap-x-[18px] flex">
                    <div className="flex gap-x-[10px] items-end cursor-pointer">
                        <Image width={28} height={22} src={'/images/group.svg'} alt={'group'}/>
                        <span className="text-main-gray-2 text-24 font-[300]">{matrix?.length || 0}</span>
                    </div>
                    <div className="flex gap-x-[10px] items-center cursor-pointer ">
                        <Image width={20} height={22} src={'/images/refresh.svg'} alt={'refresh'}/>
                        <span className="text-main-gray-2 text-24 font-[300]">{reinvestCount}</span>
                    </div>
                </div>
                { freeze ?
                    <Image className="absolute bottom-[27px] right-[30px]" width={32} height={32}
                           src={'/images/freeze.svg'} alt={'refresh'}/> : null}
            </> : null}
        </div>
    );
};

export default M6;
