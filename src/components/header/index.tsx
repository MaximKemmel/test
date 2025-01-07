"use client";
import { usePopupConnect, usePopupRegistration } from "@/store/toggle-stores";
import { Sprite } from "@/tags/sprite";
import { useAddress, useDisconnect } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { logout } from "@/lib/api";
import { useLocale, useTranslations } from "next-intl";
import { UserInfo } from "@/lib/interfaces";
import dynamic from "next/dynamic";
import { NavigatorComponent } from "@/components/navigation";
import loginIcon from "/public/images/login.png";
import logoutIcon from "/public/images/logout.png";
import { poppins, ptsans } from "@/styles/fonts";
import menuIcon from "/public/images/menu.png";
import useNavStore from "@/store/nav-store";

const LanguageSelect = dynamic(
  () => import("@/components/header/language-select")
);
const Drawer = dynamic(() => import("@/components/drawer/Drawer"));
const DrawerProfile = dynamic(
  () => import("@/components/drawer/DrawerProfile")
);
const DrawerAuth = dynamic(() => import("@/components/drawer/DrawerAuth"));
const Course = dynamic(() => import("@/components/header/Course"));
const BalanceWallet = dynamic(
  () => import("@/components/header/BalanceWallet")
);
const RegistrationPopup = dynamic(() => import("@/components/registration"), {
  ssr: false,
});
const ConnectionPopup = dynamic(
  () => import("@/components/registration/connection"),
  { ssr: false }
);
const AutoPopup = dynamic(() => import("@/components/registration/auto"), {
  ssr: false,
});

//TODO Тестовые данные
export default function Header({
  lang,
  seedUser,
}: {
  lang: string;
  seedUser?: UserInfo;
}) {
  const { open: openRegister } = usePopupRegistration();
  const locale = useLocale();

  const t = useTranslations("Dashboard");
  const address = useAddress();
  const { isOpen } = usePopupConnect();

  const pathname = usePathname();
  const disconnect = useDisconnect();
  //const { closeAuth, isAuth } = useAuthStore();
  const { closeAuth } = useAuthStore();
  const isAuth = true;

  const { setIsNavShow } = useNavStore();

  const onLogout = async () => {
    if (isAuth) {
      await logout();
      await disconnect();
      window.location.href = `/ru/home`;
      closeAuth();
    } else {
      openRegister();
    }
  };

  return (
    <>
      <header
        className={`${poppins.className} sticky z-10 top-0 ${
          !pathname.includes("/home")
            ? "border-solid border-b xl:border-[#FFFFFF33] border-[#CB9E31]"
            : ""
        }`}
      >
        <div className="absolute top-0 left-0 w-full h-full  backdrop-blur-[5px] -z-1" />
        {isAuth ? (
          <div className="flex xl:flex-row flex-col xl:items-start items-center gap-[10px]">
            <div
              className={`relative py-5 text-lg flex justify-between ${
                pathname.includes("/home")
                  ? "container gap-[50px]"
                  : "px-[20px] lg:px-[60px]"
              } items-center xl:border-0 border-b border-[#FFFFFF33] w-full`}
            >
              <div
                className={`flex items-center gap-4 ${
                  pathname.includes("/home") ? "grow" : ""
                }`}
              >
                <Link
                  className={`${ptsans.className} flex items-center gap-4 xs:gap-[5px]`}
                  href={`/${locale}/home`}
                >
                  <Image width={50} height={50} alt="" src={"/logo.svg"} />
                  {!isAuth && (
                    <span className="text-h3 xs:hidden text-main-white">
                      100Х-Booster.io
                    </span>
                  )}
                  <span className="text-h3 hidden xs:flex text-main-white">
                    100Х-Booster.io
                  </span>
                </Link>
              </div>
              {!pathname.includes("/home") ? (
                <div className="xl:flex hidden">
                  <Course className="xl:flex hidden" />
                </div>
              ) : null}
              {!pathname.includes("/home") ? (
                <div className="gap-[20px] h-[26px] xl:flex hidden">
                  <BalanceWallet />
                  <span className="h-full">|</span>
                  <p
                    onClick={(e) => {
                      navigator?.clipboard?.writeText(`${address}`);
                      const target = e.target as HTMLParagraphElement;
                      target.style.color = "#64D121";
                      setTimeout(() => (target.style.color = "inherit"), 1000);
                    }}
                    className="flex cursor-pointer items-center gap-[10px]"
                  >
                    <Sprite className="w-[25px] h-[25px]" name="wallet" />
                    {`${address?.slice(0, 4)}...${address?.slice(-2)}`}
                  </p>
                </div>
              ) : null}
              {pathname.includes("/home") ? (
                <Link
                  href={`/${locale}/1/dashboard`}
                  className="relative items-center h-[57px] w-[230px] md:hidden flex justify-center select-none bg-gradientYellow text-black text-base shadow-buttonShadow rounded-full"
                >
                  {t("main.dashboard")}
                </Link>
              ) : null}
              <div className="xl:flex hidden">
                <LanguageSelect lang={lang} />
              </div>
              <div onClick={onLogout} className="cursor-pointer xl:hidden flex">
                <Image src={logoutIcon} alt="log" className="w-6 h-6" />
              </div>
              {!pathname.includes("/home") ? (
                <div className="flex gap-5 items-center">
                  <Sprite className="w-[27px] h-[27px]" name="search" />
                  <Sprite className="w-[27px] h-[27px]" name="notification" />
                </div>
              ) : null}
              <div
                onClick={onLogout}
                className="cursor-pointer items-center gap-2 text-white xl:flex hidden"
              >
                <Image src={logoutIcon} alt="log" className="w-6 h-6" />
                {t("main.out")}
              </div>
              {!pathname.includes("/home") ? (
                <div className="xl:hidden flex" onClick={() => setIsNavShow()}>
                  <Image src={menuIcon} alt="menu" className="w-6 h-6" />
                </div>
              ) : null}
              {/*<div className="hidden xs:flex items-center gap-5">
                <Drawer seedUser={seedUser} />
                <DrawerProfile />
              </div>*/}
            </div>
            {!pathname.includes("/home") ? (
              <div className="gap-[20px] h-[26px] xl:hidden flex z-[1] justify-center">
                <BalanceWallet />
                <span className="h-full text-[#FFFFFF33]">|</span>
                <p
                  onClick={(e) => {
                    navigator?.clipboard?.writeText(`${address}`);
                    const target = e.target as HTMLParagraphElement;
                    target.style.color = "#64D121";
                    setTimeout(() => (target.style.color = "inherit"), 1000);
                  }}
                  className="flex cursor-pointer items-center gap-[10px]"
                >
                  <Sprite className="w-[25px] h-[25px]" name="wallet" />
                  {`${address?.slice(0, 4)}...${address?.slice(-2)}`}
                </p>
              </div>
            ) : null}
            {!pathname.includes("/home") ? (
              <div className="xl:hidden flex">
                <Course className="xl:hidden flex" />
              </div>
            ) : null}
          </div>
        ) : (
          <div
            className={`relative py-5 text-lg flex justify-between xs:bg-main-black-drawer ${
              pathname.includes("/home")
                ? "container"
                : " px-[60px] xs:px-[20px]"
            } items-center `}
          >
            <div className="flex items-center gap-4">
              <Link
                className={`${ptsans.className} flex items-center gap-4 xs:gap-[5px]`}
                href={`/${locale}/home`}
              >
                <Image width={50} height={50} alt="" src={"/logo.svg"} />
                {!isAuth && (
                  <span className="text-h3 xs:hidden text-main-white">
                    100Х-Booster.io
                  </span>
                )}
                <span className="text-h3 hidden xs:flex text-main-white">
                  100Х-Booster.io
                </span>
              </Link>
              {pathname.includes("/home") && isAuth ? (
                <Link
                  href={`/${locale}/1/dashboard`}
                  className="flex cursor-pointer items-center gap-2 text-[#BCBCBC]"
                >
                  {t("main.dashboard")}
                </Link>
              ) : null}
            </div>
            <div className="flex items-center gap-[50px]">
              <div
                onClick={onLogout}
                className="flex cursor-pointer items-center gap-2 text-white"
              >
                <Image src={loginIcon} alt="log" className="w-6 h-6" />
                {t("main.log")}
              </div>
              <LanguageSelect lang={lang} />
            </div>
            {/*<div className="hidden xs:flex items-center gap-5">
              <DrawerAuth />
            </div>*/}
          </div>
        )}
      </header>
      <RegistrationPopup />
      {isOpen ? <ConnectionPopup /> : null}
      <AutoPopup />
      <NavigatorComponent />
    </>
  );
}
