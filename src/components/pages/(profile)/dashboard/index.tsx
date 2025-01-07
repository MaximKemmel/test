"use client";
import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Line5Program from "@/components/dashboard/line5/Line5Program";
import M3Program from "@/components/dashboard/m3/M3Program";
import M6Program from "@/components/dashboard/m6/M6Program";
import { clsx } from "clsx";
import ProgramTable from "@/components/dashboard/tables/ProgramTable";
import InfoCard from "@/components/cards/InfoCard";
import { useAddress } from "@thirdweb-dev/react";
import { getProfit, getStatics } from "@/lib/api";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Profit, Static, User, UserInfo } from "@/lib/interfaces";
import { SeeAddressProvider } from "@/providers/SeeAddressContext";
import { useAuthStore } from "@/store/auth-store";
import { unbounded } from "@/styles/fonts";
import filterIcon from "/public/images/profile/filter.png";
import closeIcon from "/public/images/profile/close.png";
import { RightMenu } from "@/components/navigation/right-menu";
import profitIcon from "/public/images/profile/profit.png";
import benefitIcon from "/public/images/profile/benefit.png";
import warningIcon from "/public/images/profile/warning.png";
import coldIcon from "/public/images/profile/cold.png";
import giftIcon from "/public/images/profile/gift.png";
import useMatrixStore from "@/store/matrix-store";
import coinIcon from "/public/images/profile/coin.png";
import groupIcon from "/public/images/profile/group.png";
import refreshIcon from "/public/images/profile/refresh.png";
import trashIcon from "/public/images/profile/trash.png";
import { openHash } from "@/lib/data";
import copyIcon from "/public/images/profile/copy.png";
import arrowLeftIcon from "/public/images/profile/arrow-left.png";
import arrowRightIcon from "/public/images/profile/arrow-right.png";
import { Swiper as Swip } from "swiper/types";

interface DashboardProps {
  seeAddress?: string;
  seeUser?: UserInfo;
}

export function Dashboard({ seeAddress, seeUser }: DashboardProps) {
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

  const t = useTranslations("Dashboard");
  const locale = useLocale();

  const { userInfo } = useAuthStore();
  const { currentMatrix } = useMatrixStore();
  const [activeProgram, setActiveProgram] = useState<number | null>(1);
  const myAddress = useAddress();
  const [address, setAddress] = useState("");
  const [isLegendShowed, setIsLegendShowed] = useState(false);
  const [swiperLine5, setSwiperLine5] = useState<Swip>();
  const [swiperM3, setSwiperM3] = useState<Swip>();
  const [swiperM6, setSwiperM6] = useState<Swip>();

  const renderProgramTab = (activeProgram: number | null) => {
    switch (activeProgram) {
      case 1: {
        return <Line5Program />;
      }
      case 2: {
        return <M3Program />;
      }
      case 3: {
        return <M6Program />;
      }
      default: {
        return null;
      }
    }
  };

  const info = useMemo(() => {
    return [
      {
        name: t("main.info1"),
        count: statics?.partners || 0,
        increased: statics?.partners24 || 0,
      },
      {
        name: t("main.info2"),
        count: statics?.team || 0,
        increased: statics?.team24 || 0,
      },
      {
        name: t("main.info3"),
        count: seeUser
          ? seeUser.ContractUserMM.profitTotal
          : userInfo?.profits?.profitTotal || 0,
        increased: statics?.profit24h?.value || 0,
      },
      {
        name: t("main.info4"),
        count: statics?.deals?.value || 0,
        increased: statics?.deals24?.value || 0,
      },
    ];
  }, [statics, seeUser, userInfo]);

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

  const legendInfo = useMemo(() => {
    return [
      {
        id: 1,
        title: t("main.legendInfo.item1Sub"),
        text: t("main.legendInfo.item1Text"),
        className: "bg-gradientDashboardRadial",
      },
      {
        id: 2,
        title: t("main.legendInfo.item2Sub"),
        text: t("main.legendInfo.item2Text"),
        className: "bg-[#C41A1A]",
      },
      {
        id: 3,
        title: t("main.legendInfo.item3Sub"),
        text: t("main.legendInfo.item3Text"),
        className: "bg-[#00ABBA]",
      },
      {
        id: 4,
        title: t("main.legendInfo.item4Sub"),
        text: t("main.legendInfo.item4Text"),
        className: "bg-[#64D121]",
      },
    ];
  }, [locale]);

  const programsInfo = useMemo(() => {
    return [
      {
        id: 1,
        title: t("main.programInfo.item1Sub"),
        text: t("main.programInfo.item1Text"),
        icon: profitIcon,
      },
      {
        id: 2,
        title: t("main.programInfo.item2Sub"),
        text: t("main.programInfo.item2Text"),
        icon: benefitIcon,
      },
      {
        id: 3,
        title: t("main.programInfo.item3Sub"),
        text: t("main.programInfo.item3Text"),
        icon: warningIcon,
      },
      {
        id: 4,
        title: t("main.programInfo.item4Sub"),
        text: t("main.programInfo.item4Text"),
        icon: coldIcon,
      },
      {
        id: 5,
        title: t("main.programInfo.item5Sub"),
        text: t("main.programInfo.item5Text"),
        icon: giftIcon,
      },
    ];
  }, [locale]);

  useEffect(() => {
    if (address) {
      getStatics(address).then((res) => {
        if (res) setStatics(res.result);
      });
      getProfit(address).then((res) => {
        if (res) setProfits(res.result);
      });
    }
  }, [address]);

  useEffect(() => {
    if (!seeAddress && myAddress) {
      setAddress(myAddress);
    } else if (seeAddress) {
      setAddress(seeAddress);
    }
  }, [seeAddress, myAddress]);

  return (
    <SeeAddressProvider value={{ seeAddress, seeUser }}>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col w-full gap-6">
          <div className={`${unbounded.className} flex items-center gap-8`}>
            <p className="bg-gradientResultsTab text-2xl text-transparent bg-clip-text w-max">
              {t("main.legend")}
            </p>
            <Image
              src={isLegendShowed ? closeIcon : filterIcon}
              alt={"filter"}
              className="w-8 cursor-pointer"
              onClick={() => setIsLegendShowed(!isLegendShowed)}
            />
          </div>
          {isLegendShowed && (
            <div className="flex rounded-[10px] p-[1px] w-auto bg-gradientDashboardRadial">
              <div className="flex flex-col lg:flex-row justify-between rounded-[10px] bg-black w-full p-[20px] gap-5">
                {legendInfo.map((item, index) => {
                  return (
                    <div className="flex gap-3 lg:w-1/4 w-full" key={index}>
                      <div
                        className={`${item.className} flex h-[40px] w-[40px] p-[6px] rounded-full shrink-0 mt-[3px]`}
                      >
                        <div className="flex w-full h-full rounded-full bg-black" />
                      </div>
                      <div className="flex flex-col grow">
                        <p className="text-base">{item.title}</p>
                        <p className="text-xs text-wrap">{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {isLegendShowed && (
            <div className="flex rounded-[10px] p-[1px] w-auto bg-gradientDashboardRadial">
              <div className="flex flex-col lg:flex-row justify-between rounded-[10px] bg-black w-full p-[20px] gap-5">
                {programsInfo.map((item, index) => {
                  return (
                    <div className="flex gap-3 lg:w-1/5 w-full" key={index}>
                      <Image
                        src={item.icon}
                        alt={"program"}
                        className="w-10 h-10"
                      />
                      <div className="flex flex-col grow">
                        <p className="text-base">{item.title}</p>
                        <p className="text-xs">{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="md:grid hidden 4xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 w-full px-[20px] py-[40px] bg-gradientDashboardProgram rounded-[25px] gap-6">
          {currentMatrix === 0 ? (
            <>
              {...Array(3)
                .fill(1)
                .map((_value, index: number) => (
                  <div className="bg-white rounded-[10px] p-[20px] h-[225px] flex flex-col justify-between shadow-matrixCardShadow" key={index}>
                    <div className="flex justify-between items-center">
                      <div
                        className={`${unbounded.className} text-[24px] text-[#CB9E31]`}
                      >
                        Lvl {index + 1}
                      </div>
                      <div className="flex gap-[10px] items-center">
                        <Image src={coinIcon} alt="" className="w-25 h-25" />
                        <div
                          className={`${unbounded.className} text-[24px] text-black`}
                        >
                          $ {index === 0 ? "50" : index === 1 ? "200" : "500"}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-[15px] justify-center items-center">
                      {...Array(3)
                        .fill(1)
                        .map((_value) => (
                          <div className="bg-gradientDashboardRadial flex h-[40px] w-[40px] p-[6px] rounded-full"  key={index}>
                            <div className="bg-white rounded-full w-full h-full" />
                          </div>
                        ))}
                      {...Array(2)
                        .fill(1)
                        .map((_value) => (
                          <div className="bg-[#D9DBE1] h-[40px] w-[40px] rounded-full"  key={index}/>
                        ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-[12px] text-[20px] text-black">
                        <div className="flex items-center gap-[8px]">
                          <Image
                            src={groupIcon}
                            alt=""
                            className="w-[28px] h-[22px]"
                          />
                          <p>5</p>
                        </div>
                        <div className="flex items-center gap-[8px]">
                          <Image
                            src={refreshIcon}
                            alt=""
                            className="w-[20px] h-[22px]"
                          />
                          <p>1</p>
                        </div>
                      </div>
                      <Image
                        src={coldIcon}
                        alt=""
                        className="w-[27px] h-[27px]"
                      />
                    </div>
                  </div>
                ))}
              <div className="bg-[#775E22] rounded-[10px] p-[20px] h-[225px] flex flex-col justify-between shadow-matrixCardShadow">
                <div className="flex justify-between items-center">
                  <div className={`${unbounded.className} text-[24px]`}>
                    Lvl 4
                  </div>
                  <div className="flex gap-[10px] items-center">
                    <Image src={coinIcon} alt="" className="w-25 h-25" />
                    <div className={`${unbounded.className} text-[24px]`}>
                      $ 1000
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-[12px]">
                  <Image src={trashIcon} alt="" className="w-[20px] h-auto" />
                  <p className="text-[20px]">{t("main.activate")}</p>
                </div>
                <div className="flex justify-end">
                  <Image
                    src={warningIcon}
                    alt=""
                    className="w-[27px] h-[27px]"
                  />
                </div>
              </div>
            </>
          ) : null}
          {currentMatrix === 1 ? (
            <>
              {...Array(3)
                .fill(1)
                .map((_value, index: number) => (
                  <div className="bg-white rounded-[10px] p-[20px] h-[225px] flex flex-col justify-between shadow-matrixCardShadow"  key={index}>
                    <div className="flex justify-between items-center">
                      <div
                        className={`${unbounded.className} text-[24px] text-[#CB9E31]`}
                      >
                        Lvl {index + 1}
                      </div>
                      <div className="flex gap-[10px] items-center">
                        <Image src={coinIcon} alt="" className="w-25 h-25" />
                        <div
                          className={`${unbounded.className} text-[24px] text-black`}
                        >
                          $ {(10 * Math.pow(2, index)).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-[15px] justify-center items-center">
                      {...Array(3)
                        .fill(1)
                        .map((_value) => (
                          <div className="bg-gradientDashboardRadial flex h-[40px] w-[40px] p-[6px] rounded-full"  key={index}>
                            <div className="bg-white rounded-full w-full h-full" />
                          </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-[12px] text-[20px] text-black">
                        <div className="flex items-center gap-[8px]">
                          <Image
                            src={groupIcon}
                            alt=""
                            className="w-[28px] h-[22px]"
                          />
                          <p>5</p>
                        </div>
                        <div className="flex items-center gap-[8px]">
                          <Image
                            src={refreshIcon}
                            alt=""
                            className="w-[20px] h-[22px]"
                          />
                          <p>1</p>
                        </div>
                      </div>
                      <Image
                        src={coldIcon}
                        alt=""
                        className="w-[27px] h-[27px]"
                      />
                    </div>
                  </div>
                ))}
              {...Array(9)
                .fill(1)
                .map((_value, index: number) => (
                  <div className="bg-[#775E22] rounded-[10px] p-[20px] h-[225px] flex flex-col justify-between shadow-matrixCardShadow" key={index + 4}>
                    <div className="flex justify-between items-center">
                      <div className={`${unbounded.className} text-[24px]`}>
                        Lvl {index + 4}
                      </div>
                      <div className="flex gap-[10px] items-center">
                        <Image src={coinIcon} alt="" className="w-25 h-25" />
                        <div className={`${unbounded.className} text-[24px]`}>
                          $ {(10 * Math.pow(2, index + 3)).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-[12px]">
                      <Image
                        src={trashIcon}
                        alt=""
                        className="w-[20px] h-auto"
                      />
                      <p className="text-[20px]">{t("main.activate")}</p>
                    </div>
                    <div className="flex justify-end">
                      <Image
                        src={warningIcon}
                        alt=""
                        className="w-[27px] h-[27px]"
                      />
                    </div>
                  </div>
                ))}
            </>
          ) : null}
          {currentMatrix === 2 ? (
            <>
              {...Array(4)
                .fill(1)
                .map((_value, index: number) => (
                  <div className="bg-white rounded-[10px] p-[20px] h-[225px] flex flex-col justify-between shadow-matrixCardShadow"  key={index}>
                    <div className="flex justify-between items-center">
                      <div
                        className={`${unbounded.className} text-[24px] text-[#CB9E31]`}
                      >
                        Lvl {index + 1}
                      </div>
                      <div className="flex gap-[10px] items-center">
                        <Image src={coinIcon} alt="" className="w-25 h-25" />
                        <div
                          className={`${unbounded.className} text-[24px] text-black`}
                        >
                          $ {(10 * Math.pow(2, index)).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-[15px] justify-center items-center">
                      <div className="flex flex-col gap-[10px] items-center">
                        <div className="bg-gradientDashboardRadial flex h-[40px] w-[40px] p-[6px] rounded-full">
                          <div className="bg-white rounded-full w-full h-full" />
                        </div>
                        <div className="flex items-center gap-[40px]">
                          <div className="bg-gradientDashboardRadial flex h-[30px] w-[30px] p-[6px] rounded-full">
                            <div className="bg-white rounded-full w-full h-full" />
                          </div>
                          <div className="bg-gradientDashboardRadial flex h-[30px] w-[30px] p-[6px] rounded-full">
                            <div className="bg-white rounded-full w-full h-full" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-[10px] items-center">
                        <div className="bg-gradientDashboardRadial flex h-[40px] w-[40px] p-[6px] rounded-full">
                          <div className="bg-white rounded-full w-full h-full" />
                        </div>
                        <div className="flex items-center gap-[40px]">
                          <div className="bg-[#C41A1A] flex h-[30px] w-[30px] p-[6px] rounded-full">
                            <div className="bg-white rounded-full w-full h-full" />
                          </div>
                          <div className="bg-[#D9DBE1] h-[30px] w-[30px] rounded-full" />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-[12px] text-[20px] text-black">
                        <div className="flex items-center gap-[8px]">
                          <Image
                            src={groupIcon}
                            alt=""
                            className="w-[28px] h-[22px]"
                          />
                          <p>5</p>
                        </div>
                        <div className="flex items-center gap-[8px]">
                          <Image
                            src={refreshIcon}
                            alt=""
                            className="w-[20px] h-[22px]"
                          />
                          <p>1</p>
                        </div>
                      </div>
                      <Image
                        src={coldIcon}
                        alt=""
                        className="w-[27px] h-[27px]"
                      />
                    </div>
                  </div>
                ))}
              {...Array(8)
                .fill(1)
                .map((_value, index: number) => (
                  <div className="bg-[#775E22] rounded-[10px] p-[20px] h-[225px] flex flex-col justify-between shadow-matrixCardShadow"  key={index + 5}>
                    <div className="flex justify-between items-center">
                      <div className={`${unbounded.className} text-[24px]`}>
                        Lvl {index + 5}
                      </div>
                      <div className="flex gap-[10px] items-center">
                        <Image src={coinIcon} alt="" className="w-25 h-25" />
                        <div className={`${unbounded.className} text-[24px]`}>
                          $ {(10 * Math.pow(2, index + 4)).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-[12px]">
                      <Image
                        src={trashIcon}
                        alt=""
                        className="w-[20px] h-auto"
                      />
                      <p className="text-[20px]">{t("main.activate")}</p>
                    </div>
                    <div className="flex justify-end">
                      <Image
                        src={warningIcon}
                        alt=""
                        className="w-[27px] h-[27px]"
                      />
                    </div>
                  </div>
                ))}
            </>
          ) : null}
        </div>

        {currentMatrix === 0 ? (
          <div className="md:hidden flex items-center w-full h-[255px] px-[12px] py-[15px] bg-gradientDashboardProgram rounded-[25px] gap-[5px]">
            <div
              className="w-6 h-6 cursor-pointer z-6 shrink-0"
              onClick={() => {
                if (!swiperLine5) return;
                swiperLine5.slidePrev();
              }}
            >
              <Image src={arrowLeftIcon} alt={"prev"} className="w-6 h-6" />
            </div>
            <Swiper
              onSwiper={setSwiperLine5}
              mousewheel={false}
              direction={"horizontal"}
              loop
              className={`w-full h-[225px] flex overflow-hidden`}
              slidesPerView={1}
            >
              {...Array(3)
                .fill(1)
                .map((_value, index: number) => (
                  <SwiperSlide
                    key={index}
                    className="flex h-full horizontal-swiper px-[15px] py-[15px]"
                  >
                    <div className="bg-white rounded-[10px] p-[20px] h-full flex flex-col justify-between shadow-matrixCardShadow">
                      <div className="flex justify-between items-center">
                        <div
                          className={`${unbounded.className} text-[24px] text-[#CB9E31]`}
                        >
                          Lvl {index + 1}
                        </div>
                        <div className="flex gap-[10px] items-center">
                          <Image src={coinIcon} alt="" className="w-25 h-25" />
                          <div
                            className={`${unbounded.className} text-[24px] text-black`}
                          >
                            $ {index === 0 ? "50" : index === 1 ? "200" : "500"}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-[15px] justify-center items-center">
                        {...Array(3)
                          .fill(1)
                          .map((_value) => (
                            <div className="bg-gradientDashboardRadial flex h-[40px] w-[40px] p-[6px] rounded-full"  key={index}>
                              <div className="bg-white rounded-full w-full h-full" />
                            </div>
                          ))}
                        {...Array(2)
                          .fill(1)
                          .map((_value) => (
                            <div className="bg-[#D9DBE1] h-[40px] w-[40px] rounded-full" key={index} />
                          ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-[12px] text-[20px] text-black">
                          <div className="flex items-center gap-[8px]">
                            <Image
                              src={groupIcon}
                              alt=""
                              className="w-[28px] h-[22px]"
                            />
                            <p>5</p>
                          </div>
                          <div className="flex items-center gap-[8px]">
                            <Image
                              src={refreshIcon}
                              alt=""
                              className="w-[20px] h-[22px]"
                            />
                            <p>1</p>
                          </div>
                        </div>
                        <Image
                          src={coldIcon}
                          alt=""
                          className="w-[27px] h-[27px]"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              <SwiperSlide
                key={4}
                className="flex h-full horizontal-swiper p-[15px]"
              >
                <div className="bg-[#775E22] rounded-[10px] p-[20px] h-[225px] flex flex-col justify-between shadow-matrixCardShadow">
                  <div className="flex justify-between items-center">
                    <div className={`${unbounded.className} text-[24px]`}>
                      Lvl 4
                    </div>
                    <div className="flex gap-[10px] items-center">
                      <Image src={coinIcon} alt="" className="w-25 h-25" />
                      <div className={`${unbounded.className} text-[24px]`}>
                        $ 1000
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-[12px]">
                    <Image src={trashIcon} alt="" className="w-[20px] h-auto" />
                    <p className="text-[20px]">{t("main.activate")}</p>
                  </div>
                  <div className="flex justify-end">
                    <Image
                      src={warningIcon}
                      alt=""
                      className="w-[27px] h-[27px]"
                    />
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
            <div
              className="w-6 h-6 cursor-pointer z-6 shrink-0"
              onClick={() => {
                if (!swiperLine5) return;
                swiperLine5.slideNext();
              }}
            >
              <Image src={arrowRightIcon} alt={"next"} className="w-6 h-6" />
            </div>
          </div>
        ) : null}
        {currentMatrix === 1 ? (
          <div className="md:hidden flex items-center w-full h-[255px] px-[12px] py-[15px] bg-gradientDashboardProgram rounded-[25px] gap-[5px]">
            <div
              className="w-6 h-6 cursor-pointer z-6 shrink-0"
              onClick={() => {
                if (!swiperM3) return;
                swiperM3.slidePrev();
              }}
            >
              <Image src={arrowLeftIcon} alt={"prev"} className="w-6 h-6" />
            </div>
            <Swiper
              onSwiper={setSwiperM3}
              mousewheel={false}
              direction={"horizontal"}
              loop
              className={`w-full h-[225px] flex overflow-hidden`}
              slidesPerView={1}
            >
              {...Array(3)
                .fill(1)
                .map((_value, index: number) => (
                  <SwiperSlide
                    key={index}
                    className="flex h-full horizontal-swiper p-[15px]"
                  >
                    <div className="bg-white rounded-[10px] p-[20px] h-full flex flex-col justify-between shadow-matrixCardShadow">
                      <div className="flex justify-between items-center">
                        <div
                          className={`${unbounded.className} text-[24px] text-[#CB9E31]`}
                        >
                          Lvl {index + 1}
                        </div>
                        <div className="flex gap-[10px] items-center">
                          <Image src={coinIcon} alt="" className="w-25 h-25" />
                          <div
                            className={`${unbounded.className} text-[24px] text-black`}
                          >
                            $ {(10 * Math.pow(2, index)).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-[15px] justify-center items-center">
                        {...Array(3)
                          .fill(1)
                          .map((_value) => (
                            <div className="bg-gradientDashboardRadial flex h-[40px] w-[40px] p-[6px] rounded-full" key={index}>
                              <div className="bg-white rounded-full w-full h-full" />
                            </div>
                          ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-[12px] text-[20px] text-black">
                          <div className="flex items-center gap-[8px]">
                            <Image
                              src={groupIcon}
                              alt=""
                              className="w-[28px] h-[22px]"
                            />
                            <p>5</p>
                          </div>
                          <div className="flex items-center gap-[8px]">
                            <Image
                              src={refreshIcon}
                              alt=""
                              className="w-[20px] h-[22px]"
                            />
                            <p>1</p>
                          </div>
                        </div>
                        <Image
                          src={coldIcon}
                          alt=""
                          className="w-[27px] h-[27px]"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              {...Array(9)
                .fill(1)
                .map((_value, index: number) => (
                  <SwiperSlide
                    key={index + 4}
                    className="flex h-full horizontal-swiper p-[15px]"
                  >
                    <div className="bg-[#775E22] rounded-[10px] p-[20px] h-full flex flex-col justify-between shadow-matrixCardShadow">
                      <div className="flex justify-between items-center">
                        <div className={`${unbounded.className} text-[24px]`}>
                          Lvl {index + 4}
                        </div>
                        <div className="flex gap-[10px] items-center">
                          <Image src={coinIcon} alt="" className="w-25 h-25" />
                          <div className={`${unbounded.className} text-[24px]`}>
                            $ {(10 * Math.pow(2, index + 3)).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-[12px]">
                        <Image
                          src={trashIcon}
                          alt=""
                          className="w-[20px] h-auto"
                        />
                        <p className="text-[20px]">{t("main.activate")}</p>
                      </div>
                      <div className="flex justify-end">
                        <Image
                          src={warningIcon}
                          alt=""
                          className="w-[27px] h-[27px]"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              <div className="bg-[#775E22] rounded-[10px] p-[20px] h-[225px] flex flex-col justify-between shadow-matrixCardShadow">
                <div className="flex justify-between items-center">
                  <div className={`${unbounded.className} text-[24px]`}>
                    Lvl 4
                  </div>
                  <div className="flex gap-[10px] items-center">
                    <Image src={coinIcon} alt="" className="w-25 h-25" />
                    <div className={`${unbounded.className} text-[24px]`}>
                      $ 1000
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-[12px]">
                  <Image src={trashIcon} alt="" className="w-[20px] h-auto" />
                  <p className="text-[20px]">{t("main.activate")}</p>
                </div>
                <div className="flex justify-end">
                  <Image
                    src={warningIcon}
                    alt=""
                    className="w-[27px] h-[27px]"
                  />
                </div>
              </div>
            </Swiper>
            <div
              className="w-6 h-6 cursor-pointer z-6 shrink-0"
              onClick={() => {
                if (!swiperM3) return;
                swiperM3.slideNext();
              }}
            >
              <Image src={arrowRightIcon} alt={"next"} className="w-6 h-6" />
            </div>
          </div>
        ) : null}
        {currentMatrix === 2 ? (
          <div className="md:hidden flex items-center w-full h-[255px] px-[12px] py-[15px] bg-gradientDashboardProgram rounded-[25px] gap-[5px]">
            <div
              className="w-6 h-6 cursor-pointer z-6 shrink-0"
              onClick={() => {
                if (!swiperM6) return;
                swiperM6.slidePrev();
              }}
            >
              <Image src={arrowLeftIcon} alt={"prev"} className="w-6 h-6" />
            </div>
            <Swiper
              onSwiper={setSwiperM6}
              mousewheel={false}
              direction={"horizontal"}
              loop
              className={`w-full h-[225px] flex overflow-hidden`}
              slidesPerView={1}
            >
              {...Array(4)
                .fill(1)
                .map((_value, index: number) => (
                  <SwiperSlide
                    key={index}
                    className="flex h-full horizontal-swiper p-[15px]"
                  >
                    <div className="bg-white rounded-[10px] p-[20px] h-full flex flex-col justify-between shadow-matrixCardShadow">
                      <div className="flex justify-between items-center">
                        <div
                          className={`${unbounded.className} text-[24px] text-[#CB9E31]`}
                        >
                          Lvl {index + 1}
                        </div>
                        <div className="flex gap-[10px] items-center">
                          <Image src={coinIcon} alt="" className="w-25 h-25" />
                          <div
                            className={`${unbounded.className} text-[24px] text-black`}
                          >
                            $ {(10 * Math.pow(2, index)).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-[15px] justify-center items-center">
                        <div className="flex flex-col gap-[10px] items-center">
                          <div className="bg-gradientDashboardRadial flex h-[40px] w-[40px] p-[6px] rounded-full">
                            <div className="bg-white rounded-full w-full h-full" />
                          </div>
                          <div className="flex items-center gap-[40px]">
                            <div className="bg-gradientDashboardRadial flex h-[30px] w-[30px] p-[6px] rounded-full">
                              <div className="bg-white rounded-full w-full h-full" />
                            </div>
                            <div className="bg-gradientDashboardRadial flex h-[30px] w-[30px] p-[6px] rounded-full">
                              <div className="bg-white rounded-full w-full h-full" />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-[10px] items-center">
                          <div className="bg-gradientDashboardRadial flex h-[40px] w-[40px] p-[6px] rounded-full">
                            <div className="bg-white rounded-full w-full h-full" />
                          </div>
                          <div className="flex items-center gap-[40px]">
                            <div className="bg-[#C41A1A] flex h-[30px] w-[30px] p-[6px] rounded-full">
                              <div className="bg-white rounded-full w-full h-full" />
                            </div>
                            <div className="bg-[#D9DBE1] h-[30px] w-[30px] rounded-full" />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-[12px] text-[20px] text-black">
                          <div className="flex items-center gap-[8px]">
                            <Image
                              src={groupIcon}
                              alt=""
                              className="w-[28px] h-[22px]"
                            />
                            <p>5</p>
                          </div>
                          <div className="flex items-center gap-[8px]">
                            <Image
                              src={refreshIcon}
                              alt=""
                              className="w-[20px] h-[22px]"
                            />
                            <p>1</p>
                          </div>
                        </div>
                        <Image
                          src={coldIcon}
                          alt=""
                          className="w-[27px] h-[27px]"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              {...Array(8)
                .fill(1)
                .map((_value, index: number) => (
                  <SwiperSlide
                    key={index + 4}
                    className="flex h-full horizontal-swiper p-[15px]"
                  >
                    <div className="bg-[#775E22] rounded-[10px] p-[20px] h-full flex flex-col justify-between shadow-matrixCardShadow">
                      <div className="flex justify-between items-center">
                        <div className={`${unbounded.className} text-[24px]`}>
                          Lvl {index + 4}
                        </div>
                        <div className="flex gap-[10px] items-center">
                          <Image src={coinIcon} alt="" className="w-25 h-25" />
                          <div className={`${unbounded.className} text-[24px]`}>
                            $ {(10 * Math.pow(2, index + 3)).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-[12px]">
                        <Image
                          src={trashIcon}
                          alt=""
                          className="w-[20px] h-auto"
                        />
                        <p className="text-[20px]">{t("main.activate")}</p>
                      </div>
                      <div className="flex justify-end">
                        <Image
                          src={warningIcon}
                          alt=""
                          className="w-[27px] h-[27px]"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
            <div
              className="w-6 h-6 cursor-pointer z-6 shrink-0"
              onClick={() => {
                if (!swiperM6) return;
                swiperM6.slideNext();
              }}
            >
              <Image src={arrowRightIcon} alt={"next"} className="w-6 h-6" />
            </div>
          </div>
        ) : null}
        <div className="flex rounded-[10px] p-[3px] grow bg-gradientDashboardRadial">
          <div className="flex rounded-[10px] bg-black w-full lg:p-[20px] p-[1px]">
            <div className="lg:flex hidden w-full xs:overflow-x-scroll">
              <table className="table-auto w-full xs:min-w-[1000px] border-collapse border-spacing-y-1.5">
                <thead>
                  <tr className="text-[#D9DBE1] text-xl h-[67px]">
                    <th>{t("main.table2.item1")}</th>
                    <th>{t("main.table2.item2")}</th>
                    <th>ID</th>
                    <th>{t("main.table2.item3")}</th>
                    <th>{t("main.table2.item4")}</th>
                    <th>USDT</th>
                  </tr>
                </thead>
                <tbody className="">
                  <tr className="">
                    <td className="h-[1px] border-t border-[#21232F]" />
                    <td className="h-[1px] border-t border-[#21232F]" />
                    <td className="h-[1px] border-t border-[#21232F]" />
                    <td className="h-[1px] border-t border-[#21232F]" />
                    <td className="h-[1px] border-t border-[#21232F]" />
                    <td className="h-[1px] border-t border-[#21232F]" />
                  </tr>
                  {...Array(6)
                    .fill(1)
                    .map((_value, index) => (
                      <tr
                        className={`h-[56px] text-center text-base ${
                          index != 0 && index % 2 == 1 ? "bg-[#21232F]" : ""
                        }`}
                        key={index}
                      >
                        <td className="flex h-[56px] justify-center items-center">
                          <div className="flex h-[50px] w-[50px] self-center">
                            <Image
                              src={profitIcon}
                              alt=""
                              className="w-full h-full"
                            />
                          </div>
                        </td>
                        <td>05.10.2022 20:53</td>
                        <td>
                          <div className="flex items-center justify-center py-[6px] w-[200px] bg-[#64D121] rounded-[10px] self-center m-auto">
                            ID 301472
                          </div>
                        </td>
                        <td>1</td>
                        <td className="cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span
                              onClick={(e) => {
                                navigator?.clipboard?.writeText(
                                  "0xdjfjaw...4560"
                                );
                                const target = e?.target as HTMLElement;
                                target.style.color = "#64D121";
                                setTimeout(
                                  () => (target.style.color = ""),
                                  1000
                                );
                              }}
                            >{`${"0xdjfjaw...4560"?.slice(
                              0,
                              6
                            )}...${"0xdjfjaw...4560"?.slice(-4)}`}</span>
                            <Image
                              src={copyIcon}
                              alt={"copy"}
                              className="w-6 h-6"
                              onClick={() => openHash("0xdjfjaw...4560")}
                            />
                          </div>
                        </td>
                        <td
                          className={`${unbounded.className} text-2xl text-[#64D121]`}
                        >
                          3 USDT
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="lg:hidden flex flex-col w-full gap-[12px]">
              {...Array(6)
                .fill(1)
                .map((_value, index) => (
                  <>
                    {index !== 0 ? (
                      <div className="w-full h-[1px] bg-[#21232F]" />
                    ) : null}
                    <div
                      key={index}
                      className={`${
                        index != 0 && index % 2 == 1 ? "bg-[#21232F]" : ""
                      } flex flex-col gap-[5px] w-full py-[8px] px-[12px]`}
                    >
                      <div className="flex w-full justify-between items-center text-[14px]">
                        <p>{t("main.table2.item1")}</p>
                        <div className="flex h-[50px] w-[50px] self-center">
                          <Image
                            src={profitIcon}
                            alt=""
                            className="w-full h-full"
                          />
                        </div>
                      </div>
                      <div className="flex w-full justify-between items-center text-[14px]">
                        <p>{t("main.table2.item2")}</p>
                        <p>05.10.2022 20:53</p>
                      </div>
                      <div className="flex w-full justify-between items-center text-[14px]">
                        <p>ID</p>
                        <div className="flex items-center justify-center py-[3px] w-[100px] bg-[#64D121] rounded-[10px]">
                          ID 301472
                        </div>
                      </div>
                      <div className="flex w-full justify-between items-center text-[14px]">
                        <p>{t("main.table2.item3")}</p>
                        <p>1</p>
                      </div>
                      <div className="flex w-full justify-between items-center text-[14px]">
                        <p>{t("main.table2.item4")}</p>
                        <div className="flex cursor-pointer gap-[5px] items-center justify-between">
                          <span
                            onClick={(e) => {
                              navigator?.clipboard?.writeText(
                                "0xdjfjaw...4560"
                              );
                              const target = e?.target as HTMLElement;
                              target.style.color = "#64D121";
                              setTimeout(() => (target.style.color = ""), 1000);
                            }}
                          >{`${"0xdjfjaw...4560"?.slice(
                            0,
                            6
                          )}...${"0xdjfjaw...4560"?.slice(-4)}`}</span>
                          <Image
                            src={copyIcon}
                            alt={"copy"}
                            className="w-6 h-6"
                            onClick={() => openHash("0xdjfjaw...4560")}
                          />
                        </div>
                      </div>
                      <div className="flex w-full justify-between items-center text-[14px]">
                        <p>USDT</p>
                        <p
                          className={`${unbounded.className} text-[18px] text-[#64D121]`}
                        >
                          3 USDT
                        </p>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
        <button className=" mx-auto text-main-gray-light/100 w-full text-center">
          <span className=" border-b cursor-pointer border-main-gray-light/100 pb-2">
            {t("main.more")}
          </span>
        </button>
      </div>
    </SeeAddressProvider>
  );
}
