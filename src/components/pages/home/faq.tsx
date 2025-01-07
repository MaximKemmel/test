import React from 'react';
import { spartan } from '@/styles/fonts';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {useTranslations} from "next-intl";


const Faq =  () => {

    const t = useTranslations('Home');

    const data = Array(7).fill(null).map((_, idx) => {
        return {
            name: t(`home.faq.accordion.${idx}.name`),
            list: Array(5).fill(null).map((_2, idxChild) => t(`home.faq.accordion.${idx}.list.${idxChild}`))
        }
    });

    return (
        <div className="space-y-9">
            <div className="flex flex-col gap-5 justify-center items-center">
                <h2 className={`${spartan.className} md:text-5xl text-2xl text-center`}>{t('home.faq.title')}</h2>
                <span className="w-1/2 md:block hidden hr-color !h-2.5"/>
            </div>
            <Accordion type="single" collapsible>
                {data.map((el: any, index: number) => (
                    <AccordionItem value={`item-${index}`} key={el.name}>
                        <AccordionTrigger className={'py-4 text-left'}>{el.name}</AccordionTrigger>
                        <AccordionContent>
                            <ul className={'flex flex-col gap-4 text-base font-normal pl-10 list-disc list-image-[url(/images/home/Arrow.png)] marker:'}>
                                {el.list.map((el: string) =>
                                    <li key={el}>{el}</li>
                                )}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default Faq;
