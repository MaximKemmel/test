"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { usePopupRegistration } from "@/store/toggle-stores";
import { useAuthContext } from "@/providers/AuthContext";
import { useLocale } from "next-intl";

interface InviteButtonProps {
  join: string;
}

const InviteButton = ({ join }: InviteButtonProps) => {
  const locale = useLocale();
  const router = useRouter();
  const { open: openRegister } = usePopupRegistration();
  const { auth } = useAuthContext();

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
        "relative items-center md:mt-8 mt-[10px] md:h-24 h-[38px] md:w-96 w-[170px] flex justify-center select-none bg-gradientYellow text-black md:text-2xl text-base font-bold shadow-buttonShadow rounded-full"
      }
    >
      {join}
    </button>
  );
};

export default InviteButton;
