import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import Image from "next/image";
import clsx from "clsx";
import BasketIcon from "@/components/icons/BasketIcon";
import {useAddress, useContract, useContractRead, useContractWrite} from "@thirdweb-dev/react";
import {matrixMB3Abi} from "@/lib/abiMB3";
import {ethers} from "ethers";
import {matrixManagerAbi} from "@/lib/abi";
import {useTranslations} from "next-intl";
import {CONFIG} from "@/lib/config";
import {M3Type} from "@/lib/interfaces";
import {useSeeAddressContext} from "@/providers/SeeAddressContext";
import DashboardRating2 from "@/components/dashboard/DashboardRating2";
import {getCycleMatrixM6, getM3} from "@/lib/api";
import {useCounter} from "usehooks-ts";

interface M3Props {
    active?: boolean
    level: string
    setActive(): void
    m3: null | M3Type
}

const contractAddress = CONFIG.contact_MATRIX_MANAGER

const M3 = ({active, level, setActive, m3}: M3Props) => {

    const { count, increment } = useCounter(0)
    const {data: contract} = useContract(contractAddress, JSON.stringify(matrixManagerAbi.abi));
    const [address, setAddress] = useState<undefined | string>()
    const myAddress = useAddress();
    const t = useTranslations('Dashboard')

    const [matrix, setMatrix] = useState<{userId: number, place: number}[]>([])
    const [price, setPrice] = useState('0')
    const [freeze, setIsFreeze] = useState(false)
    const [reinvestCount, setReinvestCount] = useState(0);
    const [matrixM3Active, setM3Active] = useState(false)

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

    const {mutateAsync: buyNewLevel} = useContractWrite(
        contract,
        "buyNewLevel",
    )

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
                            args: ['2', level],
                        }).then(res => {
                            alert('Уровень успешно приобретен')
                            increment()
                        })
                    }))))
        }
    }

    useEffect(() => {
        if (!seeAddress && myAddress) {
            setAddress(myAddress)
        } else if (seeAddress) {
            setAddress(seeAddress)
        }
    }, [seeAddress, myAddress])

    useEffect(() => {
        if (level && address) {
            getCycleMatrixM6(String(reinvestCount), '2', level, address).then(res => {
                if (res && res.result) {
                    setMatrix(res.result)
                }
            })
        }
    }, [level, address, reinvestCount, count])

    useEffect(() => {
        (async function () {

            if (address) {
                getM3(address as string).then(res => {
                    if (res!.success && res) {

                        const price = res.result.levelPrice[Number(level) - 1]
                        const reinvest = res.result.reinvests[Number(level) - 1]
                        const activeLevel = res.result.activeLevels[Number(level) - 1]
                        const frozenLevel = res.result.frozenLevels[Number(level) - 1]

                        setPrice(String(price))
                        setReinvestCount(reinvest)
                        setM3Active(activeLevel)
                        setIsFreeze(frozenLevel)
                    }
                })
            }

        }())
    }, [address, myAddress, count])

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

    const onActive = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        e.preventDefault()
        if (matrixM3Active) {
            setActive()
        } else {
            await onBuyNewLevel()
        }
    }

    if (seeAddress && !matrixM3Active) {
        return <div></div>
    }

    return (
        <div onClick={onActive}
            className={clsx("py-[20px] px-[15px] relative xs:justify-between  cursor-pointer h-[194px] xs:p-[20px] xs:h-[170px] rounded-[10px] bg-line5 border-yellow flex flex-col",
                active === true && 'bg-line5-active',
                // (seeAddress && matrixMB3Active) && 'max-w-[50%] xs:max-w-full',
                (disabledBuy && !matrixM3Active) && 'bg-disabled')}>
            <div className="flex items-center justify-between">
                <p className="text-32 font-[550] xs:!text-[20px] text-main-gold">Lvl {level}</p>
                <div className="flex items-center gap-x-[10px]">
                    <div className="h-[25px] w-[25px] xs:h-[24px] xs:w-[24px] bg-main-gold rounded-full"/>
                    <span className="text-32 !font-[550] xs:!text-[20px]">{price}</span>
                </div>
            </div>
            {!matrixM3Active ? <>
                <div className="mt-[37px] xs:mt-auto xs:mb-auto  flex gap-x-[18px] justify-center items-center cursor-pointer select-none">
                    <BasketIcon/>
                    <span className="text-24 text-main-gray-2 font-[300]">{t('main.activate')}</span>
                </div>
            </> : matrixM3Active ?  <>
                <div className="mt-[33px]  xs:mt-0 flex justify-center gap-x-[26px] ">
                    {matrix?.map((value, idx: number) => {
                        return <DashboardRating2 size="m3" value={String(value.userId)} empty={false} key={idx}/>
                    })}
                    {Array(3 - Number(matrix.length || 0)).fill(null)?.map((_: string, idx: number) => {
                        return <DashboardRating2 size="m3" empty key={idx}/>
                    })}
                </div>
                <div className="mt-auto xs:mt-0 items-center gap-x-[18px] flex">
                    <div className="flex gap-x-[10px] items-end cursor-pointer">
                        <Image width={28} height={22} src={'/images/group.svg'} alt={'group'}/>
                        <span className="text-main-gray-2 text-24 font-[300]">{groupCount}</span>
                    </div>
                    <div className="flex gap-x-[10px] items-center cursor-pointer ">
                        <Image width={20} height={22} src={'/images/refresh.svg'} alt={'refresh'}/>
                        <span className="text-main-gray-2 text-24 font-[300]">{reinvestCount}</span>
                    </div>
                </div>
                {freeze ? <Image className="absolute bottom-[27px] right-[30px]" width={32} height={32}
                                                                src={'/images/freeze.svg'} alt={'refresh'}/> : null}
            </> : null}
        </div>
    );
};

export default memo(M3);
