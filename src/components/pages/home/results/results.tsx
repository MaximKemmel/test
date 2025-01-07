"use client";
import { unbounded } from "@/styles/fonts";
import { HomeResultTable } from "./table-result";
import { HomeResultPay } from "./pay";
import { HomeResultStatic } from "./statistic";
import { useTranslations } from "next-intl";
import { useState } from "react";
import InviteButton from "@/components/button/InviteButton";

export default function HomeResults() {
  const t = useTranslations("Home");
  const [activeItem, setActiveItem] = useState(2);

  return (
    <div className="bg-gradientResults lg:p-24 py-[30px] px-[15px] lg:rounded-[50px] rounded-[15px] 4xl:w-[1560px] w-full place-self-center">
      <div className="lg:container">
        <div className="text-center lg:space-y-6 space-y-3">
          <div className="lg:space-y-6 space-y-3 text-black">
            <p className={`${unbounded.className} md:text-5xl text-[20px]`}>
              {t("home.results.title")}
            </p>
            <div
              className="md:text-xl sm:text-[18px] text-base font-normal space-y-6"
              dangerouslySetInnerHTML={{
                __html: t.raw("home.results.description"),
              }}
            />
          </div>
          <div className="hidden lg:flex flex-col gap-6">
            <HomeResultTable isShowed={true} isMob={false} />
            <HomeResultPay isShowed={true} isMob={false} />
            <HomeResultStatic isShowed={true} isMob={false} />
          </div>
          <div className="flex flex-col lg:hidden">
            <div className="flex justify-between w-full gap-[10px] text-black z-[6]">
              <div
                className={`${
                  unbounded.className
                } flex items-center justify-center w-1/3 md:h-[50px] h-[30px] md:text-[13px] text-[10px] rounded-t-[10px] cursor-pointer ${
                  activeItem === 2 ? "bg-[#FFFFFF]" : "bg-[#D9DBE1]"
                }`}
                onClick={() => setActiveItem(2)}
              >
                {t("home.results.usdt_result")}
              </div>
              <div
                className={`${
                  unbounded.className
                } flex items-center justify-center w-1/3 md:h-[50px] h-[30px]  md:text-[13px] text-[10px] rounded-t-[10px] cursor-pointer ${
                  activeItem === 1 ? "bg-[#FFFFFF]" : "bg-[#D9DBE1]"
                }`}
                onClick={() => setActiveItem(1)}
              >
                {t("home.results.payments")}
              </div>
              <div
                className={`${
                  unbounded.className
                } flex items-center justify-center w-1/3 md:h-[50px] h-[30px]  md:text-[13px] text-[10px] rounded-t-[10px] cursor-pointer ${
                  activeItem === 0 ? "bg-[#FFFFFF]" : "bg-[#D9DBE1]"
                }`}
                onClick={() => setActiveItem(0)}
              >
                {t("home.results.registrations")}
              </div>
            </div>
            <HomeResultTable isShowed={activeItem === 0} isMob={true} />
            <HomeResultPay isShowed={activeItem === 1} isMob={true} />
            <HomeResultStatic isShowed={activeItem === 2} isMob={true} />
            <div className="flex w-full justify-center mt-[10px]">
              <InviteButton join={t("home.btn.join")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
