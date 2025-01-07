"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAddress } from "@thirdweb-dev/react";
import { useAuthStore } from "@/store/auth-store";
import { useLocale, useTranslations } from "next-intl";
import { Profit, Static, UserInfo } from "@/lib/interfaces";
import Image from "next/image";
import useTargetStore from "@/store/targets-store";
import Avatar from "@/components/navigation/avatar";
import { unbounded } from "@/styles/fonts";
import settingsIcon from "/public/images/profile/settings.png";
import telegramIcon from "/public/images/profile/tg.png";
import copyIcon from "/public/images/profile/copy.png";
import fullIcon from "/public/images/profile/full.png";
import targetIcon from "/public/images/profile/target.png";
import arrowUpIcon from "/public/images/profile/arrow-up.png";
import arrowLeftIcon from "/public/images/profile/arrow-left.png";
import arrowRightIcon from "/public/images/profile/arrow-right.png";
import Link from "next/link";
import { calcPercentage } from "@/lib/api";
import clsx from "clsx";
import { Swiper as Swip } from "swiper/types";
import useMatrixStore from "@/store/matrix-store";

export function UserProfile({ seeUser }: { seeUser?: UserInfo }) {
  const locale = useLocale();
  const t = useTranslations("Dashboard");

  const { getTargets, targets } = useTargetStore();
  const { setCurrentMatrix, currentMatrix } = useMatrixStore();

  const myAddress = useAddress();
  const [address, setAddress] = useState<undefined | string>();
  const { userInfo } = useAuthStore();
  const [swiper, setSwiper] = useState<Swip>();
  const [realIndex, setRealIndex] = useState(currentMatrix);

  useEffect(() => {
    getTargets();
  }, []);

  const [statics, setStatics] = useState<Static>({
    profit24h: { value: 0 },
    deals24: { value: 0 },
    partners24: 0,
    team24: 0,
    deals: {
      value: 0,
    },
    partners: 0,
    referrerId: 0,
    team: 0,
    userId: 0,
  });

  const [profits, setProfits] = useState<Profit>({
    profits: {
      profitL5: 0,
      profitM3: 0,
      profitTotal: 0,
      profitM6: 0,
    },
  });

  const programs = useMemo(() => {
    return [
      {
        id: 1,
        text: "Line 5",
        value: profits?.profits?.profitL5 || 0,
      },
      {
        id: 2,
        text: "M3",
        value: profits?.profits?.profitM3 || 0,
      },
      {
        id: 3,
        text: "M6",
        value: profits?.profits?.profitM6 || 0,
      },
    ];
  }, [profits]);

  const loopFixMode = programs.length === 3;

  useEffect(() => {
    setCurrentMatrix(
      realIndex > programs.length - 1 ? realIndex - programs.length : realIndex
    );
  }, [programs.length, realIndex]);

  const info = useMemo(() => {
    return [
      {
        name: t("main.info1"),
        count: statics?.partners || 0,
        increased: statics?.partners24 || 0,
        className: "bg-gradientDashboardRadial",
      },
      {
        name: t("main.info2"),
        count: statics?.team || 0,
        increased: statics?.team24 || 0,
        className: "bg-[#C41A1A]",
      },
      {
        name: t("main.info3"),
        count: seeUser
          ? seeUser.ContractUserMM.profitTotal
          : userInfo?.profits?.profitTotal || 0,
        increased: statics?.profit24h?.value || 0,
        className: "bg-[#00ABBA]",
      },
      {
        name: t("main.info4"),
        count: statics?.deals?.value || 0,
        increased: statics?.deals24?.value || 0,
        className: "bg-[#64D121]",
      },
    ];
  }, [statics, seeUser, userInfo]);

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
        `${window.location.origin}/ru/home?referral_all=${
          seeUser?.userId ? seeUser.userId : userInfo?.currentUser?.userId
        }`
      );
    }
    const target = e?.target?.parentNode.parentNode;
    target.style.color = "#64D121";
    setTimeout(() => (target.style.color = ""), 1000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex rounded-xl p-[3px] w-auto bg-gradientDashboardRadial">
        <div className="flex rounded-xl bg-black w-full">
          <div className="flex lg:flex-row flex-col rounded-xl bg-[#21232559] p-[21px] w-full lg:gap-5 gap-[15px] lg:justify-between">
            <div className="flex gap-6 lg:w-1/3 w-full">
              <Avatar seeUser={seeUser} />
              <div className="flex flex-col lg:h-auto h-[90px] justify-between grow">
                <div className="flex items-center justify-between">
                  <p className={`${unbounded.className} lg:text-2xl text-[18px]`}>
                    ID{" "}
                    {seeUser?.userId
                      ? seeUser?.userId
                      : userInfo?.currentUser?.userId || "Нет"}
                  </p>
                  <Image
                    src={settingsIcon}
                    alt={"settings"}
                    className="cursor-pointer w-[20px] h-[20px]"
                  />
                </div>
                <Image
                  src={telegramIcon}
                  alt={"telegram"}
                  className="cursor-pointer lg:w-8 w-[30px] lg:h-8 h-[30px]"
                />
                <div className="flex items-center justify-between">
                  <p className="text-sm">0x5fwdwef73jf1...e2</p>
                  <Image
                    src={copyIcon}
                    alt={"copy"}
                    className="cursor-pointer w-[20px] h-[20px]"
                  />
                </div>
              </div>
            </div>
            <div
              className={"lg:w-[1px] w-full lg:h-auto h-[1px] bg-[#FFFFFF33]"}
            />
            <div className="flex gap-6 lg:w-1/3 w-full">
              {!!targets.length ? (
                <div className="flex flex-col justify-between grow">
                  <div className="flex items-center gap-2.5">
                    <p className="text-sm">{t("main.targetTitle")}</p>
                    <Image
                      src={targetIcon}
                      alt={"target"}
                      className="cursor-pointer w-6 h-6"
                    />
                  </div>
                  <div
                    className={`${unbounded.className} bg-gradientDashboardText text-[80px] leading-none text-transparent bg-clip-text w-max`}
                  >
                    {targets?.length
                      ? `${calcPercentage(
                          targets[0].value,
                          targets[0].demand
                        ).toFixed(0)}%`
                      : "55%"}
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center grow">
                  <Link
                    href={`/${locale}/1/targets`}
                    className={`${unbounded.className} relative items-center h-[44px] w-[295px] flex justify-center select-none bg-gradientDashboardTarget text-[#775E22] text-xl rounded-2xl`}
                  >
                    {t("main.addTarget")}
                  </Link>
                </div>
              )}
            </div>
            <div
              className={"lg:w-[1px] w-full lg:h-auto h-[1px] bg-[#FFFFFF33]"}
            />
            <div className="flex lg:w-1/3 w-full flex-col lg:gap-0 gap-[10px] justify-between grow">
              <p
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: t.raw("main.titleProgram") }}
              ></p>
              <div className="flex flex-row lg:h-[100px] h-[65px] gap-[5px] w-full items-center">
                <div
                  className="w-6 h-6 cursor-pointer z-6 shrink-0"
                  onClick={() => {
                    if (!swiper) return;
                    swiper.slidePrev();
                  }}
                >
                  <Image src={arrowLeftIcon} alt={"prev"} className="w-6 h-6" />
                </div>
                <div className="w-full flex grid grid-cols-1">
                  <Swiper
                    onSlideChangeTransitionEnd={({
                      realIndex: i,
                    }: {
                      realIndex: number;
                    }) => setRealIndex(i)}
                    onSlideChange={({ realIndex: i }: { realIndex: number }) =>
                      setRealIndex(i)
                    }
                    onSwiper={setSwiper}
                    mousewheel={false}
                    direction={"horizontal"}
                    loop
                    className={`w-full lg:h-[100px] h-[65px] flex overflow-hidden`}
                    slidesPerView={1}
                  >
                    {programs.map((el, index) => (
                      <SwiperSlide
                        key={index}
                        className="flex h-full horizontal-swiper"
                      >
                        <div className="justify-between">
                          <p className="lg:text-[32px] text-[20px]">{el.text}</p>
                          <div
                            className={`${unbounded.className} bg-gradientDashboardText lg:text-[45px] text-2xl leading-none text-transparent bg-clip-text w-max`}
                          >
                            $ {el.value.toLocaleString()}
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div
                  className="w-6 h-6 cursor-pointer z-6 shrink-0"
                  onClick={() => {
                    if (!swiper) return;
                    swiper.slideNext();
                  }}
                >
                  <Image
                    src={arrowRightIcon}
                    alt={"next"}
                    className="w-6 h-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col items-end w-full gap-5 justify-between">
        <div className="flex items-end lg:w-2/3 w-full gap-5 justify-between">
          <div className="flex flex-col w-1/2 gap-[10px]">
            <p
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: t.raw("main.titleContract") }}
            ></p>
            <div className="flex rounded-[10px] p-[1px] w-auto h-[40px] bg-gradientDashboardRadial">
              <div className="flex items-center justify-between rounded-[10px] bg-black w-full py-[10px] px-[15px]">
                <div className="flex gap-[10px]">
                  <p className="text-sm">line5</p>
                  <p className="text-sm">0x5fw...e2</p>
                </div>
                <div className="flex gap-[10px]">
                  <Image
                    src={copyIcon}
                    alt={"copy"}
                    className="w-[17px] h-[17px] cursor-pointer"
                  />
                  <Image
                    src={fullIcon}
                    alt={"open"}
                    className="w-[17px] h-[17px] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-1/2 h-[40px] gap-[10px] rounded-[10px] p-[1px] bg-gradientDashboardRadial">
            <div className="flex items-center justify-between rounded-[10px] bg-black w-full py-[10px] px-[15px]">
              <div className="flex gap-[10px]">
                <p className="text-sm">M3/M6</p>
                <p className="text-sm">0x5fw...e2</p>
              </div>
              <div className="flex gap-[10px]">
                <Image
                  src={copyIcon}
                  alt={"copy"}
                  className="w-[17px] h-[17px] cursor-pointer"
                />
                <Image
                  src={fullIcon}
                  alt={"open"}
                  className="w-[17px] h-[17px] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={"lg:w-[1px] w-full lg:h-full h-[1px] bg-[#FFFFFF33]"} />
        <div className="flex flex-col lg:w-1/3 w-full gap-[10px]">
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: t.raw("main.titleReferral") }}
          ></p>
          <div className="flex rounded-[10px] p-[1px] w-auto h-[40px] bg-gradientDashboardRadial">
            <div className="flex items-center justify-between rounded-[10px] bg-black w-full py-[10px] px-[15px]">
              <p className="text-sm">0x5fwwefewyajs...e2</p>
              <div className="flex gap-[10px]">
                <Image
                  src={copyIcon}
                  alt={"copy"}
                  className="w-[17px] h-[17px] cursor-pointer"
                />
                <Image
                  src={fullIcon}
                  alt={"open"}
                  className="w-[17px] h-[17px] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full lg:gap-6 gap-[10px] justify-between flex-wrap">
        {info.map((item, index) => {
          return (
            <div
              className="flex lg:w-[calc(25%-18px)] w-[calc(50%-5px)] lg:h-[145px] rounded-[15px] p-[3px] bg-gradientDashboardRadial"
              key={index}
            >
              <div
                className={clsx(
                  "flex w-full rounded-[15px] lg:pl-[10px] pl-[7px]",
                  item.className
                )}
              >
                <div className="flex h-full w-full rounded-[15px] bg-black">
                  <div className="flex flex-col lg:gap-6 gap-[10px] w-full rounded-[15px] p-[20px] bg-[#21232559] justify-between">
                    <p className="lg:text-[16px] text-[14px]">{item.name}</p>
                    <div className="flex flex-col gap-[3px]">
                      <p className={`${unbounded.className} lg:text-2xl text-[16px]`}>{`${
                        item.count
                      }${index === 2 ? " USDT" : ""}`}</p>
                      <div
                        className={`flex gap-[10px] items-bottom ${
                          item.increased > 0 ? "text-[#64D121]" : ""
                        }`}
                      >
                        {item.increased > 0 && (
                          <Image
                            src={arrowUpIcon}
                            alt={"up"}
                            className="h-[12px]"
                          />
                        )}
                        <p className="text-base font-bold">{`${item.increased}${
                          index === 2 ? " USDT" : ""
                        }`}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
