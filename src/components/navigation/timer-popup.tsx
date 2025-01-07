'use client'
import {usePopupTelegramStore, usePopupTimerStore} from "@/store/toggle-stores";
import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useEffect, useMemo} from "react";
import ModalCloseIcon from "@/components/icons/ModalCloseIcon";
import {useController, useFieldArray, useForm, useWatch} from "react-hook-form";
import FormProvider from "@/uikit/FormProvider";
import {Button, FloatingLabel, Label, Select} from "flowbite-react";
import {Sprite} from "@/tags/sprite";
import {updateProfile} from "@/lib/api";
import {useAuthStore} from "@/store/auth-store";
import {useAddress, useContract, useContractWrite} from "@thirdweb-dev/react";
import {matrixManagerAbi} from "@/lib/abi";
import {CONFIG} from "@/lib/config";
import {ethers} from "ethers";

interface TimerPopupProps {
}

type TimerPopup = {
    period: string | undefined
}

export function TimerPopup({}: TimerPopupProps) {
    const {isOpen, close, level, price} = usePopupTimerStore();
    const address = useAddress()
    const {data: contract} = useContract(CONFIG.contact_MATRIX_MANAGER, JSON.stringify(matrixManagerAbi.abi));
    const {data: contractUSDT} = useContract(CONFIG.contractUSDT);
    const {data: contractDP1} = useContract(CONFIG.contractDT1);

    const defaultValues: TimerPopup = useMemo(() => ({
        period: '1'
    }), []);

    const methods = useForm<TimerPopup>({
        defaultValues,
    });

    const {mutateAsync: activatePeriodFor} = useContractWrite(
        contract,
        "activatePeriodFor",
    );

    const {
        handleSubmit, control,
        formState: {isSubmitting}, setValue, register
    } = methods;

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

    const period = useController({control, name: 'period'})

    const onSubmit = (data: TimerPopup) => {
        let buyTimer = confirm('Продлить срок заморозки?');

        if (buyTimer) {

            const approveOptions = {
                args: [CONFIG.contact_MATRIX_MANAGER, ethers.utils.parseUnits(String(Number(price)), 18)],
                overrides: {
                    gasLimit: 100000,
                }
            }

            const allowanceOptions = {
                args: [address, CONFIG.contact_MATRIX_MANAGER]
            }

            Promise.all([approveUSDT(approveOptions), approveDP1(approveOptions)]).then(() => {
                Promise.all([allowanceUSDT(allowanceOptions), allowanceDP1(allowanceOptions)]).then(() => {
                    activatePeriodFor({
                        args: [address, data.period, level],
                        overrides: {
                            gasLimit: 1200000
                        }
                    }).then(() => {
                        alert('Срок обновлён')
                        close()
                    })
                })
            })

        }

    }

    return (
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
                    <div className="fixed inset-0 bg-black/50"/>
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
                                className="relative w-full rounded-[10px] max-w-3xl transform overflow-hidden  bg-main-black px-20 xs:px-7 py-14 xs:py-7 text-left align-middle shadow-xl transition-all">
                                <ModalCloseIcon onClick={close}/>
                                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-y-3">
                                    <div className="flex flex-col  gap-y-4 w-full">
                                        <div className="max-w-md">
                                            <div className="mb-2 block">
                                                <Label htmlFor="periods" value="Выбрать период" />
                                            </div>
                                            <Select id="periods" required
                                                // @ts-ignore
                                                    value={period.field.value} onChange={period.field.onChange}>
                                                <option value="1">45 дней</option>
                                                <option value="2">90 дней</option>
                                                <option value="3">135 дней</option>
                                                <option value="4">180 дней</option>
                                            </Select>
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                            <Button color="blue" type="submit">Отправить</Button>
                                        </div>
                                        </div>
                                </FormProvider>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
