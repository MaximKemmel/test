'use client'

import {useMemo} from "react";
import {useForm} from "react-hook-form";
import FormProvider from "@/uikit/FormProvider";
import TextArea from "@/uikit/form/TextArea";
import {useTranslations} from "next-intl";

export function Messages() {

    const t = useTranslations('Dashboard')

    const defaultValues: { message: string } = useMemo(() => ({
       message: ''
    }), []);

    const methods = useForm<{ message: string }>({
        defaultValues,
    });

    const {
        handleSubmit, watch,
        setValue, control, reset
    } = methods;

    const onSubmit = (data: {message: string}) => {
        console.log(data)
    }

    return(
        <main className="space-y-[40px]">
            <p className="text-h2">{t('messages.title')}</p>
            <div className=' hr-color !h-2 '/>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="grid gap-[30px] grid-cols-1">
                <TextArea placeholder={t('messages.placeholder')} name={'message'}/>
                <button type="submit"
                        className="bg-main-yellow py-4 px-6 rounded-xl border-2 xs:max-w-[50%] border-main-yellow max-w-[20%]"
                >
                    {t('main.send')}
                </button>
            </FormProvider>
        </main>
    )
}
