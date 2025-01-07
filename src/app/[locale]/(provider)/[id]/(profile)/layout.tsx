"use client";
import { Menu } from "@/components/navigation/menu";
import React, { ReactNode, useState } from "react";
import { AvatarPopup } from "@/components/navigation/avatar-popup";
import { TelegramPopup } from "@/components/navigation/telegram-popup";
import { TimerPopup } from "@/components/navigation/timer-popup";
import Header from "@/components/header";
import { UserProfile } from "@/components/pages/(profile)/user";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import useNavStore from "@/store/nav-store";

export default function LayoutProfile({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string; locale: string};
}) {
  const t = useTranslations("Home");
  const Contacts = dynamic(() => import("@/components/pages/home/contacts"));
  const {isNavShow} = useNavStore();

  return (
    <>
      <Header lang={params.locale} />
      <div className={`${isNavShow ? "overflow-hidden" : ""} flex flex-row jusify-between w-full`}>
        <Menu className="" />
        <div className="flex flex-col lg:gap-12 gap-[20px] p-10 pr-[60px] grow overflow-hidden">
          {!isNavShow ? <UserProfile /> : null}
          {!isNavShow ? children : null}
        </div>
      </div>
      {!isNavShow ? <Contacts /> : null}
      <footer className={"flex flex-col items-center py-14 bg-[#1c1c1c]"}>
        <p className={"text-xs font-normal"}>{t("home.copywrite.description")}</p>
      </footer>
      <AvatarPopup />
      <TelegramPopup />
      <TimerPopup />
    </>
  );
}
