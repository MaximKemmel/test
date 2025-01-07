import React, {Fragment} from 'react';
import {Sprite} from "@/tags/sprite";
import {Dropdown} from "flowbite-react";
import StaticsSelect from "@/components/header/statics";
import {useTranslations} from "next-intl";

const statisticToken = [
    {
        token: 'bnb',
        dateStart: "05.10.2022",
        priceStart: "30",
        peakPrice: "90",
        growth: "x3",
        currentPrice: "45"
    },
    {
        token: 'bnb',
        dateStart: "05.10.2022",
        priceStart: "30",
        peakPrice: "90",
        growth: "x3",
        currentPrice: "45"
    },
    {
        token: 'bnb',
        dateStart: "05.10.2022",
        priceStart: "30",
        peakPrice: "90",
        growth: "x3",
        currentPrice: "45"
    },
    {
        token: 'bnb',
        dateStart: "05.10.2022",
        priceStart: "30",
        peakPrice: "90",
        growth: "x3",
        currentPrice: "45"
    },
];

const MainTableDropdown = () => {

    const t = useTranslations('Dashboard')

    return <Dropdown label="" trigger="hover" dismissOnClick={false} placement="bottom-start"
                     renderTrigger={() => <div className="flex items-end ml-[12px]">
                         <Sprite name="dots"
                                 className=" cursor-pointer  box-content p-1  w-5 h-5 rounded-full  border-main-gray border flex flex-col "/>
                     </div>}
                     className="!bg-[#2C2C2C] !rounded-[10px] w-[583px] h-[231px] p-[30px] pr-[60px] main-table-dropdown">
        <Dropdown.Item className="p-0">

        </Dropdown.Item>
        <Dropdown.Item as="div" className="flex items-center justify-center p-0">
            <div className="max-w-[108px] text-[14px] text-main-gray-2">
                {t('main.dropdown.head1')}
            </div>
        </Dropdown.Item>
        <Dropdown.Item as="div" className="flex items-center justify-center p-0">
            <div className="max-w-[77px] text-[14px] text-main-gray-2">{t('main.dropdown.head2')}</div>
        </Dropdown.Item>
        <Dropdown.Item as="div" className="flex items-center p-0">
            <div className=" text-[16px] text-main-gray-2">{t('main.dropdown.val1')}</div>
        </Dropdown.Item>
        <Dropdown.Item as="div" className="flex items-center justify-center p-0">
            <div className=" text-[16px] text-white">Binance</div>
        </Dropdown.Item>
        <Dropdown.Item as="div" className="flex items-center justify-center p-0">
            <div className=" text-[16px] text-white">Binance</div>
        </Dropdown.Item>
        <Dropdown.Item as="div" className="flex items-center p-0">
            <div className=" text-[16px] text-main-gray-2">{t('main.dropdown.val2')} $</div>
        </Dropdown.Item>
        <Dropdown.Item as="div" className="flex items-center justify-center p-0">
            <div className=" text-[16px] text-white">3 456 873 789</div>
        </Dropdown.Item>
        <Dropdown.Item as="div" className="flex items-center justify-center p-0">
            <div className=" text-[16px] text-white">3 456 873 789</div>
        </Dropdown.Item>
        <Dropdown.Item as="div" className="flex p-0 text-left">
            <div className=" text-[16px] text-main-gray-2">{t('main.dropdown.val3')}</div>
        </Dropdown.Item>
        <Dropdown.Item as="div" className="flex items-center justify-center p-0">
            <div className=" text-[16px] text-white">345 876</div>
        </Dropdown.Item>
        <Dropdown.Item as="div" className="flex items-center justify-center p-0">
            <div className=" text-[16px] text-white">345 876</div>
        </Dropdown.Item>
    </Dropdown>
}


const MainTable = () => {

    const t = useTranslations('Dashboard')

    return (
        <div className="space-y-[40px]">
            <div className="flex items-center justify-between">
                <p className="text-h2">{t('main.table.title')}</p>
                <StaticsSelect className="!w-auto min-w-[62px]" />
            </div>
            <div
                className=" pl-4 text-h4 border pt-[103px] pb-[80px] space-y-[40px] border-main-yellow rounded-2xl bg-main-black-fields  text-center gap-y-8  program-table">
                <div className="w-full xs:overflow-x-scroll">
                    <div className="grid main-table pr-[10px] xs:min-w-[1400px] ">
                        <p className="text-main-gray-2">{t('main.table.item1')}</p>
                        <p className="text-main-gray-2">{t('main.table.item2')}</p>
                        <p className="text-main-gray-2">{t('main.table.item3')}</p>
                        <p className="text-main-gray-2">{t('main.table.item4')}</p>
                        <p className="text-main-gray-2">{t('main.table.item5')}</p>
                        <p className="text-main-gray-2">{t('main.table.item6')}</p>
                        <p className="text-main-gray-2"></p>
                        {statisticToken.map((statistic, index) => (
                            <Fragment key={statistic.currentPrice + index + statistic.growth}>
                                <p className="pt-[51px] pb-[3px] border-b uppercase border-main-gray-light flex justify-center items-end">{statistic.token}</p>
                                <p className="pt-[51px] pb-[3px] border-b border-main-gray-light flex justify-center items-end">{statistic.dateStart}</p>
                                <p className="pt-[51px] pb-[3px] border-b border-main-gray-light flex justify-center items-end">{statistic.priceStart}</p>
                                <p className="pt-[51px] pb-[3px] border-b border-main-gray-light flex justify-center items-end">{statistic.peakPrice}</p>
                                <p className="pt-[51px] pb-[3px] border-b border-main-gray-light flex justify-center items-end text-lime-500 text-h2">{statistic.growth}</p>
                                <p className="pt-[51px] pb-[3px] relative border-main-gray-light flex justify-center items-end border-b">
                                    {statistic.currentPrice}
                                </p>
                                <div className="flex items-end">
                                    <MainTableDropdown/>
                                </div>
                            </Fragment>
                        ))}
                    </div>
                </div>
                <div className=" text-main-gray-light/100  col-span-6 text-center">
                    <span className=" border-b cursor-pointer border-main-gray-light/100 pb-2">{t('main.more')}</span>
                </div>
            </div>

        </div>
    );
};

export default MainTable;
