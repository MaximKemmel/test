"use client";
import { Sprite } from "@/tags/sprite";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Social } from "./social";
import { TargetProgress } from "../pages/(profile)/targets/progress";
import Avatar from "@/components/navigation/avatar";
import clsx from "clsx";
import { useAddress } from "@thirdweb-dev/react";
import { useAuthStore } from "@/store/auth-store";
import { useLocale, useTranslations } from "next-intl";
import { UserInfo } from "@/lib/interfaces";
import useTargetStore from "@/store/targets-store";
import { calcPercentage } from "@/lib/api";
import TelegramPanel from "@/components/navigation/telegram-panel";

export function RightMenu({ className, seeUser }: { className?: string; seeUser?: UserInfo }) {
  const locale = useLocale();
  const t = useTranslations("Dashboard");

  const { getTargets, targets } = useTargetStore();

  const myAddress = useAddress();
  const [address, setAddress] = useState<undefined | string>();
  const { userInfo } = useAuthStore();

  useEffect(() => {
    getTargets();
  }, []);

  const info = useMemo(() => {
    return [
      {
        sprite: "danger",
        text: t("main.programInfo.item1Text"),
        sub: t("main.programInfo.item1Sub"),
        spriteClassName: "border-main-yellow bg-red-600",
      },
      {
        sprite: "snow",
        text: t("main.programInfo.item2Text"),
        sub: t("main.programInfo.item2Sub"),
        spriteClassName: "border-main-yellow bg-blue-600",
      },
      {
        sprite: "gift",
        text: t("main.programInfo.item3Text"),
        sub: t("main.programInfo.item3Sub"),
        spriteClassName: "border-main-yellow bg-green-600",
      },
      {
        sprite: "money",
        text: t("main.programInfo.item4Text"),
        sub: t("main.programInfo.item4Sub"),
        spriteClassName: "border-main-yellow bg-yellow-600",
      },
    ];
  }, [locale]);

  useEffect(() => {
    if (!seeUser?.username && myAddress) {
      setAddress(myAddress);
    } else if (seeUser?.username) {
      setAddress(seeUser.username);
    }
  }, [seeUser, myAddress]);

  const handleCopy = async (e: any) => {
    if (userInfo?.currentUser?.userId || seeUser) {
      navigator?.clipboard?.writeText(
        `${window.location.origin}/ru/home?referral_all=${seeUser?.userId ? seeUser.userId : userInfo?.currentUser?.userId}`
      );
    }
    const target = e?.target?.parentNode.parentNode;
    target.style.color = "#64D121";
    setTimeout(() => (target.style.color = ""), 1000);
  };

  return (
    <div className={clsx("space-y-[40px] relative", className)}>
      <div className="bg-main-black-card-before relative xs:bg-transparent rounded-xl text-center space-y-8 pt-[30px] xs:pt-0 pb-[30px]  ">
        <div className="flex flex-col  gap-y-[40px] xs:gap-y-[20px]">
          <div className="flex flex-col   justify-center items-center pl-[49px] pr-[49px]">
            <Avatar seeUser={seeUser} />

            <div className="flex w-full items-center  justify-between mt-[35px]">
              <p className="text-center w-full text-h2">
                id {seeUser?.userId ? seeUser?.userId : userInfo?.currentUser?.userId || "Нет"}
              </p>
            </div>
            <TargetProgress
              hasTarget={!!targets.length}
              className="flex-col text-center mt-[15px] w-full flex justify-between items-center"
              seeUser={seeUser}
              progress={targets?.length ? `${calcPercentage(targets[0].value, targets[0].demand).toFixed(0)}%` : "55%"}
            />
          </div>
          <div className=" hr-color " />
          <div className="space-y-[15px] pl-[49px] pr-[49px]">
            <p className="text-h4" dangerouslySetInnerHTML={{ __html: t.raw("main.titleContract") }} />
            <div className="relative">
              <div className="flex px-5 py-2 right-panel-menu items-center rounded-xl bg-main-black-card  relative justify-between border-yellow">
                <p>line5</p>
                <div className="flex  gap-5">
                  <p className="right-panel-menu-value">0x5fw...e2</p>
                  <div className="flex gap-2">
                    <Sprite
                      onClick={(e: any) => {
                        navigator?.clipboard?.writeText(`0x5fw...e2`);
                        const target = e?.target?.parentNode.parentNode;
                        target.style.color = "#64D121";
                        setTimeout(() => (target.style.color = ""), 1000);
                      }}
                      name="copy"
                      className="w-5 h-5 cursor-pointer"
                    />
                    <Sprite name="share" className="w-5 h-5 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex px-5 py-2 right-panel-menu items-center rounded-xl border relative bg-main-black-card border-yellow justify-between">
              <p>M3/M6</p>
              <div className="flex  gap-5">
                <p className="right-panel-menu-value">0x5fw...e2</p>
                <div className="flex gap-2">
                  <Sprite
                    onClick={(e: any) => {
                      navigator?.clipboard?.writeText(`0x5fw...e2`);
                      const target = e?.target?.parentNode.parentNode;
                      target.style.color = "#64D121";
                      setTimeout(() => (target.style.color = ""), 1000);
                    }}
                    name="copy"
                    className="w-5 h-5 cursor-pointer"
                  />
                  <Sprite name="share" className="w-5 h-5 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-[15px] pl-[49px] pr-[49px]">
            <p className="text-h4" dangerouslySetInnerHTML={{ __html: t.raw("main.titleReferral") }} />
            <div className="flex px-5 py-2 right-panel-menu items-center relative bg-main-black-card border-yellow rounded-xl justify-between">
              <p className="right-panel-menu-value-2">{`${address?.slice(0, 10) || ""}...${address?.slice(-4) || ""}`}</p>
              <div className="flex gap-2">
                <Sprite onClick={handleCopy} name="copy" className="w-5 h-5" />
                <Sprite name="share" className="w-5 h-5" />
              </div>
            </div>
          </div>
          <TelegramPanel seeUser={seeUser} />
          <div className=" hr-color " />
        </div>
        <div className="right-menu-list grid text-left gap-y-5 gap-x-[20px] grid-cols-[repeat(1,40px_1fr)] pl-[49px] pr-[24px] xs:px-0">
          {info.map((data, index) => (
            <Fragment key={data.sprite + index + data.text}>
              <Sprite
                name={data.sprite}
                className={` ${data.spriteClassName} border p-2 rounded-full w-6 h-6  box-content`}
              />
              <p className=" text-[16px]">
                <span className=" text-main-yellow">{data.sub} </span>
                {data.text}
              </p>
            </Fragment>
          ))}
        </div>
      </div>
      <Social />
    </div>
  );
}
