import React from "react";
import { ptsans } from "@/styles/fonts";
import Image from "next/image";
import youtubeIcon from "/public/images/home/youtube-traced.svg";
import vkIcon from "/public/images/home/vk-traced.svg";
import telegramIcon from "/public/images/home/telegram-traced.svg";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const HomeWelcome = dynamic(
  () => import("@/components/pages/home/welcome/welcome")
);
const WelcomeDescription = dynamic(
  () => import("@/components/pages/home/welcome/description")
);
const HomeResults = dynamic(
  () => import("@/components/pages/home/results/results")
);
const HomeTechno = dynamic(
  () => import("@/components/pages/home/techno/techno")
);
const HomeRoad = dynamic(() => import("@/components/pages/home/road"));
const FAQ = dynamic(() => import("@/components/pages/home/faq"));
const Contacts = dynamic(() => import("@/components/pages/home/contacts"));
const UserCabinet = dynamic(
  () => import("@/components/pages/home/user-cabinet")
);
const Coins = dynamic(() => import("@/components/pages/home/coins"));
const Header = dynamic(() => import("@/components/header"));

export default function HomePage({ params }: { params: { locale: string } }) {
  const t = useTranslations("Home");

  return (
    <>
      <Header lang={params.locale} />
      <div
        className={`${ptsans.className} font-bold md:mt-20 relative space-y-20`}
      >
        <div className="md:py-40 py-[10px] md:space-y-[100px] space-y-[40px]">
          <HomeWelcome />
          <WelcomeDescription />
        </div>
        <HomeResults />
        <div>
          <div className="container">
            <HomeTechno />
          </div>
        </div>
        <div>
          <div className="relative overflow-hidden">
            <Image
              src={"/images/home/roadmap-line.png"}
              alt=""
              className="absolute pt-20 4xl:block hidden"
              fill
              sizes="100vw"
              style={{
                objectFit: "contain",
                zIndex: -1,
                objectPosition: "center",
              }}
            />
            <Image
              src={"/images/home/roadmap-line-vert.png"}
              alt=""
              className="absolute pt-25 4xl:hidden xl:block hidden"
              fill
              sizes="100vw"
              style={{
                objectFit: "contain",
                zIndex: -1,
                objectPosition: "center",
                top: "100px",           
              }}
            />
            <HomeRoad />
          </div>
        </div>
        <div className="lg:mt-4">
          <div className="container">
            <UserCabinet />
          </div>
        </div>
        <Contacts />
        <footer className={"flex flex-col items-center bg-[#1c1c1c]"}>
          <p className={"text-xs font-normal py-[35px]"}>
            {t("home.copywrite.description")}
          </p>
        </footer>
        {/*<Image*/}
        {/*    src={background}*/}
        {/*    alt={"background"}*/}
        {/*    placeholder="blur"*/}
        {/*    fill*/}
        {/*    sizes="100vw"   quality={30}*/}
        {/*    style={{*/}
        {/*        objectFit: 'cover',*/}
        {/*        zIndex: -1*/}
        {/*    }}*/}
        {/*/>*/}
      </div>
    </>
  );
}
