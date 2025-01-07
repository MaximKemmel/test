import React from "react";
import { unbounded } from "@/styles/fonts";
import Image from "next/image";
import interfaceImg from "/public/images/home/interface.png";
import { useTranslations } from "next-intl";

const UserCabinet = () => {
  const t = useTranslations("Home");

  return (
    <div className="lg:space-y-12 space-y-[15px]">
      <div className="flex flex-col justify-center items-center">
        <h2 className={`${unbounded.className} md:text-5xl text-2xl max-w-[900px] text-center`}>
          {t("home.user_cabinet.title")}
        </h2>
      </div>
      <div className={"flex flex-col items-center md:gap-14 gap-[15px]"}>
        <p className={"max-w-[930px] text-center md:text-[20px] text-base font-normal"}>
          {t("home.user_cabinet.description")}
        </p>
        <Image src={interfaceImg} alt={"interface"} />
      </div>
    </div>
  );
};

export default UserCabinet;
