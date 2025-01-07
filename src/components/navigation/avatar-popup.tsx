'use client'
import {usePopupAvatarStore} from "@/store/toggle-stores";
import {Dialog, Transition} from "@headlessui/react";
import {ChangeEvent, Fragment, useMemo, useRef, useState} from "react";
import ModalCloseIcon from "@/components/icons/ModalCloseIcon";
import {useDropzone} from 'react-dropzone'
import {useForm} from "react-hook-form";
import FormProvider from "@/uikit/FormProvider";
import AvatarEditor, { type Position } from 'react-avatar-editor'
import {Button} from "flowbite-react";
import {updateProfile} from "@/lib/api";

interface AvatarPopupProps {
}

type State = {
    position: Position
    scale: number
    rotate: number
    borderRadius: number
    preview?: {
        img: string
        rect: {
            x: number
            y: number
            width: number
            height: number
        }
        scale: number
        width: number
        height: number
        borderRadius: number
    }
    width: number
    height: number
    backgroundColor?: string
}

export function AvatarPopup({}: AvatarPopupProps) {
    const {isOpen, close} = usePopupAvatarStore();

    const editor = useRef<AvatarEditor>(null)

    const [state, setState] = useState<State>({
        position: { x: 0.5, y: 0.5 },
        scale: 1,
        rotate: 0,
        borderRadius: 0,
        preview: undefined,
        width: 200,
        height: 200,
        backgroundColor: undefined,
    })

    const [image, setImage] = useState<null | File>(null)

    const {getRootProps, getInputProps} = useDropzone({
        maxFiles: 1, multiple: false,
        onDrop: acceptedFiles1 => {
            setImage(acceptedFiles1[0])
        },
        accept: {'image/*': []}
    });

    const defaultValues: { name: string } = useMemo(() => ({
        name: ''
    }), []);

    const methods = useForm<{ name: string }>({
        defaultValues,
    });

    const {
        handleSubmit, reset,
        formState: {isSubmitting}, setValue
    } = methods;

    const onSubmit = (data: { name: string }) => {

    }

    const handleSave = () => {
        const canvas = editor.current?.getImageScaledToCanvas()

        if (canvas) {
            canvas.toBlob(async function (blob) {
                let formData = new FormData();
                formData.append('avatar', blob as Blob);

                updateProfile(formData).then(() => {
                    close()
                    window.location.reload()
                })
            })
        }

    }

    const handleScale = (e: ChangeEvent<HTMLInputElement>) => {
        const scale = parseFloat(e.target.value)
        setState({ ...state, scale })
    }

    const rotateScale = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setState({ ...state, rotate: parseFloat(e.target.value) })
    }

    const handleBorderRadius = (e: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, borderRadius: parseInt(e.target.value) })
    }

    const handlePositionChange = (position: Position) => {
        setState({ ...state, position })
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
                                    <div className="flex w-full gap-x-8">
                                        <AvatarEditor width={250}
                                                      height={350}
                                                      ref={editor}
                                                      scale={state.scale}
                                                      position={state.position}
                                                      onPositionChange={handlePositionChange}
                                                      rotate={state.rotate}
                                                      borderRadius={state.width / (50 / state.borderRadius)}
                                                      backgroundColor={state.backgroundColor}
                                                      image={image || ''}
                                        />
                                        <div className="flex flex-col gap-y-3 flex-1">
                                            <h3>Параметры</h3>
                                            <div className="flex flex-col gap-y-1">
                                                <span>Зум:{' '}</span>
                                                <input
                                                    name="scale" disabled={!image}
                                                    type="range"
                                                    onChange={handleScale}
                                                    min={'1'}
                                                    max="2"
                                                    step="0.01"
                                                    defaultValue="1"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-y-1">
                                                <span>Скругление:{' '}</span>
                                                <input
                                                    name="scale" disabled={!image}
                                                    type="range"
                                                    onChange={handleBorderRadius}
                                                    min="0"
                                                    max="50"
                                                    step="1"
                                                    defaultValue="0"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-y-1">
                                                <span>Вращение:{' '}</span>
                                                <input
                                                    name="rotation" disabled={!image}
                                                    type="range"
                                                    onChange={rotateScale}
                                                    min="0"
                                                    max="180"
                                                    step="1"
                                                    defaultValue="0"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {!image ?       <Button color="blue" {...getRootProps()}>Загрузить аватар</Button>
                                        : <Button color="blue" onClick={handleSave}>Сохранить</Button>
                                    }
                                </FormProvider>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
