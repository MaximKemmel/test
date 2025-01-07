import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Image from "next/image";
import clsx from "clsx";
import BasketIcon from "@/components/icons/BasketIcon";
import {useAddress, useContract, useContractRead, useContractWrite} from "@thirdweb-dev/react";
import {matrixLine5Abi} from "@/lib/abiLine5";
import {ethers} from "ethers";
import {matrixManagerAbi} from "@/lib/abi";
import {useTranslations} from "next-intl";
import {CONFIG} from "@/lib/config";
import TimerDashboard from "@/components/dashboard/TimerDashboard";
import {useSeeAddressContext} from "@/providers/SeeAddressContext";
import DashboardRating2 from "@/components/dashboard/DashboardRating2";

interface Line5Props {
    active?: boolean,
    level: string,
    setActive(): void
}

const contractAddress = CONFIG.contact_MATRIX_MANAGER

const Line5 = ({active, setActive, level}: Line5Props) => {

    const {data: contract} = useContract(contractAddress, JSON.stringify(matrixManagerAbi.abi));
    const {data: contractLine5} = useContract(CONFIG.contractLINE5, JSON.stringify(matrixLine5Abi.abi));
    const [address, setAddress] = useState<undefined | string>()
    const myAddress = useAddress();
    const [date, setDate] = useState<null | string>(null)
    const [price, setPrice] = useState('0')
    const t = useTranslations('Dashboard')
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

    const {data: matrixLine5} = useContractRead(
        contractLine5,
        "getUsersLine5Matrix",
        [address, level]
    );

    const {data: matrixLine5Active} = useContractRead(
        contractLine5,
        "getUsersActiveLine5Levels",
        [address, level]
    );

    const {data: levelPriceLine5} = useContractRead(
        contractLine5,
        "levelPriceLine5",
        [level]
    );

    const {mutateAsync: buyNewLevel} = useContractWrite(
        contract,
        "buyNewLevel",
    );

    const {data: matrixLine5ActiveLevelMinus1} = useContractRead(
        contractLine5,
        "getUsersActiveLine5Levels",
        [address, String(Number(level) - 1)]
    );

    const disabledBuy = useMemo(() => {
        return !matrixLine5ActiveLevelMinus1
    }, [matrixLine5ActiveLevelMinus1]);

    useEffect(() => {
        if (levelPriceLine5?._hex) {

            setPrice(Number(ethers.utils.formatUnits(levelPriceLine5?._hex)).toFixed(0))

        }
    }, [levelPriceLine5]);

    useEffect(() => {
        if (matrixLine5) {
            setDate(ethers.utils.formatUnits(matrixLine5[2]))
        }
    }, [matrixLine5]);

    useEffect(() => {
        if (!seeAddress && myAddress) {
            setAddress(myAddress)
        } else if (seeAddress) {
            setAddress(seeAddress)
        }
    }, [seeAddress, myAddress])

    const onBuyNewLevel = async () => {

        if (disabledBuy) {
            return alert(t('main.messages.newLevelError'))
        }

        let buyNewLevelConf = confirm(t('main.messages.newLevelConfirm'));

        if (buyNewLevelConf) {

            const approveOptions = {
                args: [contractAddress, ethers.utils.parseUnits(String(Number(price)), 18)],
                overrides: {
                    gasLimit: 100000,
                }
            }

            const allowanceOptions = {
                args: [address, contractAddress]
            }

            approveUSDT(approveOptions).then(
                () => approveDP1(approveOptions)
                    .then(() => allowanceUSDT(allowanceOptions).then(() => allowanceDP1(allowanceOptions).then(async () => {
                                buyNewLevel({
                                    args: ['1', level],
                                }).then(() => {
                                    alert('Уровень успешно приобретен')
                                })
                    }))))
        }
    }

    const onActive = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        e.preventDefault()
        if (matrixLine5Active) {
            setActive()
        } else {
            await onBuyNewLevel()
        }
    }

    if (seeAddress && !matrixLine5Active) {
        return <div></div>
    }

    return (
        <TimerDashboard price={price} level={level} address={address} active={matrixLine5Active} date={date}>
            <div onClick={onActive}
                 className={clsx("py-[25px] px-[15px] h-[194px] w-full xs:p-[20px] xs:h-[170px] relative cursor-pointer  rounded-[10px] bg-line5 border-yellow flex flex-col", active === true && 'bg-line5-active',
                     // (seeAddress && matrixLine5Active) && 'max-w-[50%] xs:max-w-full',
                     (disabledBuy && !matrixLine5Active) && 'bg-disabled')}>
                <div className="flex items-center justify-between">
                    <p className="text-24 !font-[550] text-main-gold">Lvl {level}</p>
                    <div className="flex items-center gap-x-[10px]">
                        <div className="h-[24px] w-[24px] bg-main-gold rounded-full"/>
                        <span className="text-24 !font-[550]">{price}</span>
                    </div>
                </div>
                {!matrixLine5Active ? <>
                    <button  className="mt-[37px] xs:mt-auto xs:mb-auto flex gap-x-[24px] xs:gap-x-[18px] xs:justify-center items-center cursor-pointer select-none">
                        <BasketIcon/>
                        <span className="text-20 text-main-gray-2 font-[300]">{t('main.activate')}</span>
                    </button>
                </> : matrixLine5Active ? <>
                    <div className="mt-[37px] xs:mt-auto flex justify-between xs:px-[20px]">
                        {matrixLine5?.[1]?.slice(0, 5)?.map((address: string, idx: number) => {
                            return <DashboardRating2 value={address} empty={false} key={idx}/>
                        })}
                        {matrixLine5?.[1]?.length < 6 ? Array(5 - Number(matrixLine5?.[1]?.length || 0)).fill(null)?.map((_: string, idx: number) => {
                            return <DashboardRating2 empty key={idx}/>
                        }) : <div></div>}
                    </div>
                    <div className="mt-auto items-center gap-x-[18px] flex">
                        <div className="flex gap-x-[10px] items-end cursor-pointer">
                            <Image width={28} height={22} src={'/images/group.svg'} alt={'group'}/>
                            <span className="text-main-gray-2 text-24 font-[300]">{matrixLine5[1]?.length}</span>
                        </div>
                    </div>
                </> : null}
                {matrixLine5?.[3] && matrixLine5Active ? <Image className="absolute bottom-[27px] right-[30px]" width={32} height={32}
                        src={'/images/freeze.svg'} alt={'refresh'}/> : null}

            </div>
        </TimerDashboard>
    );
};

export default Line5;
