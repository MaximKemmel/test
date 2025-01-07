"use client";
import React from "react";
import { usePopupAuto, usePopupRegistration } from "@/store/toggle-stores";
import { useAuthContext } from "@/providers/AuthContext";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

interface HomeButtonProps {
  register: string;
}

const HomeButton = ({ register }: HomeButtonProps) => {
  const router = useRouter();
  const { open: openRegister } = usePopupAuto();
  const { auth } = useAuthContext();
  const locale = useLocale();

  const isAuth = auth;

  const onAuth = async () => {
    if (isAuth) {
      router.push(`/${locale}/1/dashboard`);
    } else {
      openRegister();
    }
  };

  return (
    <button
      onClick={onAuth}
      className={
        "relative items-center md:mt-8 mt-[10px] md:h-24 h-[38px] md:w-96 w-[150px] flex justify-center select-none bg-gradientYellow text-black md:text-2xl text-base font-bold shadow-buttonShadow rounded-full"
      }
    >
      {register}
    </button>
  );
};

export default HomeButton;
