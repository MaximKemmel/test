'use client'
import {usePopupTelegramStore} from "@/store/toggle-stores";
import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useEffect, useMemo} from "react";
import ModalCloseIcon from "@/components/icons/ModalCloseIcon";
import {useFieldArray, useForm} from "react-hook-form";
import FormProvider from "@/uikit/FormProvider";
import {Button, FloatingLabel, Tooltip} from "flowbite-react";
import {Sprite} from "@/tags/sprite";
import {updateProfile} from "@/lib/api";
import {useAuthStore} from "@/store/auth-store";

interface TelegramPopupProps {
}

type TelegramPopup = {
    telegramm: { label: string, main: boolean }[]
}

export function TelegramPopup({}: TelegramPopupProps) {
    const {isOpen, close} = usePopupTelegramStore();
    const {userInfo, setProfile} = useAuthStore();

    const defaultValues: TelegramPopup = useMemo(() => ({
        telegramm: []
    }), []);

    const methods = useForm<TelegramPopup>({
        defaultValues,
    });

    const {
        handleSubmit, control,
        formState: {isSubmitting}, setValue, register
    } = methods;

    const {fields, append, update, remove} = useFieldArray({
        control,
        name: "telegramm",
    });

    const onChangeActive = (index: number, id: string) => {
        fields.map((el) => {

            const idx = fields.findIndex(child => child.id === el.id)

            update(idx, {label: el.label, main: false})
        })

        const idx = fields.findIndex(child => String(child.id) === String(id))
        const item = fields[index]

        // @ts-ignore
        update(idx, {label: item?.label, main: !fields[index]?.main || true})
    }

    const onSubmit = (data: TelegramPopup) => {

        let formData = new FormData();
        formData.append('telegramm', JSON.stringify(data?.telegramm));

        updateProfile(formData).then((res) => {
            close()
            window.location.reload()
        })
    }

    useEffect(() => {
        if (userInfo?.currentUser?.Profile?.telegramm && !fields.length) {
            const parse: {
                label: string,
                main: boolean
            }[] = JSON.parse(userInfo?.currentUser?.Profile?.telegramm as string);

            if (parse) {
                append(parse)
            } else {
                append({label: '', main: true})
            }
        }
    }, [userInfo?.currentUser])

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
                                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}
                                              className="flex flex-col items-center gap-y-3">
                                    <div className="flex flex-col  gap-y-8 w-full">
                                        <div className="grid  gap-3">
                                            {fields?.length ? fields.map((field, index) => (
                                                <div
                                                    className="grid items-center grid-cols-[5fr_1fr] gap-x-2 justify-between"
                                                    key={index}>
                                                    <FloatingLabel className="flex-1 "
                                                                   variant="standard" {...register(`telegramm.${index}.label`)}
                                                                   label="Никнейм"/>
                                                    <div className="w-full flex justify-center gap-x-5">
                                                        <div>
                                                            <Sprite onClick={() => remove(index)} name="close"
                                                                    className="w-6 h-6"/>
                                                        </div>
                                                        {/*<Sprite name={address ? "confirmCircle" : "errorCircle"}*/}
                                                        {!field.main ? <Tooltip content={'Сделать по умолчанию'} placement="bottom"><Sprite
                                                            name={"confirmCircle"}
                                                            onClick={() => onChangeActive(index, field.id)}
                                                            className="w-6 h-6 cursor-pointer"/></Tooltip> : null}
                                                    </div>
                                                </div>
                                            )) : <p>Список пуст</p>}
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                            <Button onClick={() => {
                                                if (fields.length === 0) {
                                                    append({label: '', main: true})
                                                } else {
                                                    append({label: '', main: false})
                                                }
                                            }} type="button">Добавить телеграм</Button>
                                            <Button disabled={!fields?.length} color="blue" type="submit">Сохранить</Button>
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
