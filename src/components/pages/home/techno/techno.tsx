"use client";
import { unbounded } from "@/styles/fonts";
import Image from "next/image";
import SliderAdaptive from "@/components/pages/home/techno/slider-adaptive";
import { useTranslations } from "next-intl";
import autonomyBackground from "/public/images/home/techno/autonomy.png";
import conditionsBackground from "/public/images/home/techno/conditions.png";
import transparencyBackground from "/public/images/home/techno/transparency.png";
import decentralizationBackground from "/public/images/home/techno/decentralization.png";
import fullAutomationBackground from "/public/images/home/techno/full_automation.png";
import everythingOnlineBackground from "/public/images/home/techno/everything_online.png";
import { useState } from "react";

export default function HomeTechno() {
  const t = useTranslations("Home");

  const data = [
    {
      name: t("home.techno.autonomy.title"),
      desc: t.raw("home.techno.autonomy.desc"),
      image: autonomyBackground,
    },
    {
      name: t("home.techno.conditions.title"),
      desc: t("home.techno.conditions.desc"),
      image: conditionsBackground,
    },
    {
      name: t("home.techno.transparency.title"),
      desc: t("home.techno.transparency.desc"),
      image: transparencyBackground,
    },
    {
      name: t("home.techno.decentralization.title"),
      desc: t.raw("home.techno.decentralization.desc"),
      image: decentralizationBackground,
    },
    {
      name: t("home.techno.full_automation.title"),
      desc: t("home.techno.full_automation.desc"),
      image: fullAutomationBackground,
    },
    {
      name: t("home.techno.everything_online.title"),
      desc: t("home.techno.everything_online.desc"),
      image: everythingOnlineBackground,
    },
  ];

  const [expandedStatuses, setExpandedStatuses] = useState([false, false, false, false, false, false]);

  return (
    <div className="lg:container text-center lg:space-y-12 space-y-6">
      <p className={`${unbounded.className} md:text-5xl text-[20px]`}>{t("home.techno.title")}</p>
      <p
        className="md:text-xl sm:text-[18px] text-base font-normal space-y-6"
        dangerouslySetInnerHTML={{ __html: t.raw("home.techno.description") }}
      ></p>
      <div className="grid gap-6 lg:grid-cols-3 grid-cols-1">
        {data.map((el, index) => (
          <div
            key={el.desc + index + el.name}
            onClick={
              () => {
                const tmpStatuses = expandedStatuses.map((status, tmpIndex) => {
                  if (tmpIndex === index) {
                    return !status;
                  } else {
                    return status;
                  }
                });
                setExpandedStatuses(tmpStatuses);
              }
            }
            className="flex flex-col justify-center lg:h-[360px] h-auto gap-6 items-start text-left p-[30px] lg:rounded-3xl rounded-[35px] border-2 border-main-yellow-3 relative overflow-hidden cursor-pointer"
          >
            <p className={`text-home-h3 ${unbounded.className} font-normal`}>{el.name}</p>
            <p className={`${expandedStatuses[index] ? "" : "lg:block hidden"} font-normal`} dangerouslySetInnerHTML={{ __html: el.desc }} />
            <Image
              src={el.image}
              alt={el.name}
              placeholder="blur"
              fill
              sizes="101%"
              style={{
                objectFit: "cover",
                zIndex: -1,
                objectPosition: "center",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
