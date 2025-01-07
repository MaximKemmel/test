"use client";

import AutomaticCard from "@/components/cards/AutomaticCard";
import { Promo } from "@/lib/interfaces";
import { unbounded } from "@/styles/fonts";
import { useTranslations } from "next-intl";

//TODO Тестовые данные (убрать карточки)
export function Automation() {
  const t = useTranslations("Dashboard");

  return (
    <main className="lg:space-y-[40px] space-y-[15px]">
      <div className="lg:space-y-[25px] space-y-[15px]">
        <p
          className={`${unbounded.className} bg-gradientDashboardText lg:text-[45px] text-2xl text-transparent bg-clip-text w-max`}
        >
          {t("automation.title")}
        </p>
        <p
          className="lg:text-[22px] text-base space-y-[5px]"
          dangerouslySetInnerHTML={{ __html: t.raw("automation.description") }}
        />
      </div>
      <div className="grid lg:gap-6 gap-[10px] lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        <AutomaticCard
          info={
            {
              createdAt: "01.01.2025",
              title: "Наименование ресурса",
              file: "",
              link: "http://100x-booster..",
              type: "VIDEO",
            } as Promo
          }
          key={1}
        />
        <AutomaticCard
          info={
            {
              createdAt: "01.01.2025",
              title: "Наименование ресурса",
              file: "",
              link: "http://100x-booster..",
              type: "VIDEO",
            } as Promo
          }
          key={2}
        />
      </div>
    </main>
  );
}
