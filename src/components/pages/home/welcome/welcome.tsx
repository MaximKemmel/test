"use client";
import { unbounded } from "@/styles/fonts";
import HomeButton from "@/components/button/HomeButton";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { check } from "@/lib/api";
import background from "/public/images/home/welcome-back.png";
import Image from "next/image";

export default function HomeWelcome() {
  const t = useTranslations("Home");
  const [userCount, setUserCount] = useState(0);
  const [profitTotal, setProfitTotal] = useState(0);

  useEffect(() => {
    check().then((res) => {
      if (res) {
        setUserCount(res.result.userCount);
        setProfitTotal(res.result.profits.profitTotal);
      }
    });
  }, []);

  return (
    <div className="relative">
      <div className="container flex md:gap-14 gap-[16px] flex-col items-center justify-center text-center">
        <div className="flex flex-col gap-4">
          <h1
            className={`${unbounded.className} text-4xl text-[#CB9E31] md:text-[80px] mx-auto md:leading-[80px]`}
          >
            {t("home.welcome.title")}
          </h1>
          <p className={`${unbounded.className} text-[22px] md:text-[45px]`}>
            {t("home.welcome.subtitle")}
          </p>
        </div>
        <p
          className="text-lg md:text-[25px]"
          dangerouslySetInnerHTML={{
            __html: t.raw("home.welcome.description"),
          }} 
        ></p>
        <div className="flex md:gap-20 gap-[8px] md:pt-7 items-center justify-center w-full">
          <div className="space-y-2.5 md:w-1/5 w-1/2">
            <p className={`${unbounded.className} md:text-[45px] text-lg`}>
              {userCount}
            </p>
            <p className="md:text-base text-xs font-normal">{t("home.welcome.users")}</p>
          </div>
          <hr className={"rotate-0 rotate-90 border-[#CB9E31] md:w-[65px] w-[50px]"} />
          <div className="space-y-2.5 md:w-1/5 w-1/2">
            <p className={`${unbounded.className} md:text-[45px] text-lg`}>
              {profitTotal} $
            </p>
            <p className="md:text-base text-xs font-normal">{t("home.welcome.total_result")}</p>
          </div>
        </div>
        <HomeButton register={t("home.btn.register")} />
      </div>
      <Image
        className="md:mt-[100px] mt-[10px] md:object-bottom object-top"
        src={background}
        alt={"background"}
        placeholder="blur"
        fill
        sizes="100vw"
        style={{
          objectFit: "contain",
          zIndex: -1,
        }}
      />
    </div>
  );
}
