"use client";
import React from "react";
import { unbounded } from "@/styles/fonts";
import Image from "next/image";
import telegramRoundIcon from "/public/images/home/telegram-round.png";
import vkRoundIcon from "/public/images/home/vk-round.png";
import youtubeRoundIcon from "/public/images/home/youtube-round.png";
import { useTranslations } from "next-intl";

const Contacts = () => {
  const t = useTranslations("Home");

  return (
    <div className="xl:mt-25">
      <div className="container flex xl:flex-row flex-col xl:gap-0 gap-[20px] justify-between items-center xl:py-14 py-[15px]">
        <div className="flex flex-col items-center gap-4">
          <Image width={100} height={100} alt="" src={"/logo.svg"} />
          <p className={"text-sm font-normal"}>#1 blockchain networking</p>
        </div>
        <div className="flex flex-col gap-6 xl:items-left items-center">
          <p className={`${unbounded.className} text-2xl`}>{t("home.official_channels.title")}</p>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-6">
              <div className="flex flex-row gap-6 w-48 items-center">
                <Image src={telegramRoundIcon} alt={"social"} className={"w-9 h-9"} />
                <p className={"text-center text-base font-normal"}>{t("home.official_channels.tg_channel")}</p>
              </div>
              <div className="flex flex-row gap-6 w-48 items-center">
                <Image src={telegramRoundIcon} alt={"social"} className={"w-9 h-9"} />
                <p className={"text-center text-base font-normal"}>{t("home.official_channels.tg_chat")}</p>
              </div>
            </div>
            <div className="flex flex-row gap-6">
              <div className="flex flex-row gap-6 w-48 items-center">
                <Image src={vkRoundIcon} alt={"social"} className={"w-9 h-9"} />
                <p className={"text-center text-base font-normal"}>{t("home.official_channels.vk")}</p>
              </div>
              <div className="flex flex-row gap-6 w-48 items-center">
                <Image src={youtubeRoundIcon} alt={"social"} className={"w-9 h-9"} />
                <p className={"text-center text-base font-normal"}>{t("home.official_channels.youtube")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <p className={`${unbounded.className} text-2xl`}>{t("home.mailing.title")}</p>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-6 xl:w-48 w-auto items-center justify-center">
              <Image src={telegramRoundIcon} alt={"social"} className={"w-9 h-9"} />
              <p className={"text-center text-base font-normal"}>{t("home.mailing.tg_bot")}</p>
            </div>
            <p className={"text-xs font-normal xl:text-start text-center"} dangerouslySetInnerHTML={{ __html: t.raw("home.mailing.description") }}></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
