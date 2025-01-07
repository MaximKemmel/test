"use client";
import { usePopupParentFilterStore } from "@/store/toggle-stores";
import { Sprite } from "@/tags/sprite";
import React, { useEffect, useMemo, useState } from "react";
import { PartnersFilterPopup } from "./filter-popup";
import { LoadingDots } from "@/tags/loading-dots";
import { helvetica, unbounded } from "@/styles/fonts";
import InfoCard from "@/components/cards/InfoCard";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useAuthStore } from "@/store/auth-store";
import { getPartners } from "@/lib/api";
import { useAddress } from "@thirdweb-dev/react";
import { Partners } from "@/lib/interfaces";
import { formatDate } from "@/lib/date";
import { openHash } from "@/lib/data";
import filterIcon from "/public/images/profile/filter-stats.png";
import copyIcon from "/public/images/profile/copy.png";
import fullIcon from "/public/images/profile/full.png";
import arrowUpIcon from "/public/images/profile/arrow-up.png";

const statistic = [
  {
    date: "05.10.2022 20:53",
    wallet: "0xdjfjaw...4560",
    id: "301472",
    line5: 1,
    m3_m6: 1,
    profit: "5 busd",
    partners: 1,
  },
  {
    date: "05.10.2022 20:53",
    wallet: "0xdjfjaw...4560",
    id: "301472",
    line5: 1,
    m3_m6: 1,
    profit: "5 busd",
    partners: 1,
  },
  {
    date: "05.10.2022 20:53",
    wallet: "0xdjfjaw...4560",
    id: "301472",
    line5: 1,
    m3_m6: 1,
    profit: "5 busd",
    partners: 1,
  },
  {
    date: "05.10.2022 20:53",
    wallet: "0xdjfjaw...4560",
    id: "301472",
    line5: 1,
    m3_m6: 1,
    profit: "5 busd",
    partners: 1,
  },
];

export function Partners({ id }: { id: { id: string } }) {
  const { open } = usePopupParentFilterStore();
  const address = useAddress();
  const { userInfo } = useAuthStore();

  //TODO Тестовые данные
  //const [data, setData] = useState<null | Partners>(null);
  const [data, setData] = useState<null | Partners>({
    createdAt: "01.01.2025",
    id: 101004,
    partnersCount: 15,
    partnersCount24: 15,
    referrals: [
      {
        createdAt: "01.01.2025",
        id: 101004,
        partnersCount: 15,
        profits: { profitTotal: 10, profitL5: 5, profitM3: 3, profitM6: 2 },
        referrerId: 1500778,
        team: 5,
        userId: 84848,
        username: "test",
      },
      {
        createdAt: "01.01.2025",
        id: 101004,
        partnersCount: 15,
        profits: { profitTotal: 10, profitL5: 5, profitM3: 3, profitM6: 2 },
        referrerId: 1500778,
        team: 5,
        userId: 84848,
        username: "test",
      },
      {
        createdAt: "01.01.2025",
        id: 101004,
        partnersCount: 15,
        profits: { profitTotal: 10, profitL5: 5, profitM3: 3, profitM6: 2 },
        referrerId: 1500778,
        team: 5,
        userId: 84848,
        username: "test",
      },
      {
        createdAt: "01.01.2025",
        id: 101004,
        partnersCount: 15,
        profits: { profitTotal: 10, profitL5: 5, profitM3: 3, profitM6: 2 },
        referrerId: 1500778,
        team: 5,
        userId: 84848,
        username: "test",
      },
      {
        createdAt: "01.01.2025",
        id: 101004,
        partnersCount: 15,
        profits: { profitTotal: 10, profitL5: 5, profitM3: 3, profitM6: 2 },
        referrerId: 1500778,
        team: 5,
        userId: 84848,
        username: "test",
      },
    ],
    referrerId: 1500778,
    team: 5,
    userId: 84848,
    username: "test",
  });

  // const {referralHref} = useReferral(id.id);
  const referralHref = `${window.location.origin}/ru/home?referral_all=${userInfo?.currentUser?.userId}`;

  const t = useTranslations("Dashboard");

  useEffect(() => {
    if (address) {
      getPartners(address).then((res) => {
        if (res) {
          setData(res.user);
        }
      });
    }
  }, [address]);

  //TODO Тестовые данные
  const info = useMemo(() => {
    return [
      {
        name: t("partners.info.item1"),
        count: data?.referrals.length || 300,
        increased: data?.referrals.length || 55,
      },
      {
        name: t("partners.info.item2"),
        count: data?.partnersCount || 0,
        increased: data?.partnersCount24 || 0,
      },
    ];
  }, [data]);

  return (
    <>
      <div className="flex flex-col lg:gap-[40px] gap-[20px] grow">
        <div className="flex flex-col gap-[15px] w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[30px]">
              <p
                className={`${unbounded.className} bg-gradientDashboardText lg:text-[45px] text-2xl text-transparent bg-clip-text w-max`}
              >
                {t("partners.title")}
              </p>
              <div className="lg:flex hidden rounded-[10px] p-[1px] w-[400px] h-[40px] bg-gradientDashboardRadial">
                <div className="flex items-center justify-between rounded-[10px] bg-black w-full py-[10px] px-[15px]">
                  <p className="text-sm">0x5fwwefewyajs...e2</p>
                  <div className="flex gap-[10px]">
                    <Image
                      src={copyIcon}
                      alt={"copy"}
                      className="w-[17px] h-[17px] cursor-pointer"
                      onClick={(e: any) => {
                        navigator?.clipboard?.writeText(referralHref);
                        const target = e?.target?.parentNode.parentNode;
                        target.style.color = "#64D121";
                        setTimeout(() => (target.style.color = ""), 1000);
                      }}
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
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={open}
            >
              <p className="text-lg text-[#CB9E31]">{t("main.filter")}</p>
              <Image src={filterIcon} alt={"filter"} className="w-6 h-6" />
            </div>
          </div>
          <div className="lg:hidden flex rounded-[10px] p-[1px] w-full h-[40px] bg-gradientDashboardRadial">
            <div className="flex items-center justify-between rounded-[10px] bg-black w-full py-[10px] px-[15px]">
              <p className="text-sm">0x5fwwefewyajs...e2</p>
              <div className="flex gap-[10px]">
                <Image
                  src={copyIcon}
                  alt={"copy"}
                  className="w-[17px] h-[17px] cursor-pointer"
                  onClick={(e: any) => {
                    navigator?.clipboard?.writeText(referralHref);
                    const target = e?.target?.parentNode.parentNode;
                    target.style.color = "#64D121";
                    setTimeout(() => (target.style.color = ""), 1000);
                  }}
                />
                <Image
                  src={fullIcon}
                  alt={"open"}
                  className="w-[17px] h-[17px] cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 w-full">
              {info.map((infos, index) => (
                <div className="flex rounded-[15px] p-[1px] lg:h-[70px] h-[50px] bg-gradientDashboardRadial">
                  <div className="flex items-center gap-[30px] rounded-[15px] bg-black p-[20px] w-full">
                    <p>{infos.name}</p>
                    <p className={`${unbounded.className} text-2xl`}>
                      {infos.count}
                    </p>
                    <div
                      className={`flex gap-[10px] items-center ${
                        infos.increased > 0 ? "text-[#64D121]" : ""
                      }`}
                    >
                      {infos.increased > 0 && (
                        <Image
                          src={arrowUpIcon}
                          alt={"up"}
                          className="h-[12px]"
                        />
                      )}
                      <p className="text-base font-bold">{infos.increased}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex rounded-[10px] p-[3px] grow bg-gradientDashboardRadial">
          <div className="flex rounded-[10px] bg-black w-full p-[20px]">
            <div className="lg:flex hidden w-full xs:overflow-x-scroll">
              <table className="table-auto w-full xs:min-w-[1000px] border-collapse border-spacing-y-1.5">
                <thead>
                  <tr className="text-[#D9DBE1] text-xl h-[67px]">
                    <th>{t("partners.table.item1")}</th>
                    <th>{t("partners.table.item2")}</th>
                    <th>ID</th>
                    <th>Line5</th>
                    <th>M3/M6</th>
                    <th>{t("partners.table.item3")}</th>
                    <th>{t("partners.table.item4")}</th>
                  </tr>
                </thead>
                {data ? (
                  <tbody className="">
                    <tr className="">
                      <td className="h-[1px] border-t border-[#21232F]" />
                      <td className="h-[1px] border-t border-[#21232F]" />
                      <td className="h-[1px] border-t border-[#21232F]" />
                      <td className="h-[1px] border-t border-[#21232F]" />
                      <td className="h-[1px] border-t border-[#21232F]" />
                      <td className="h-[1px] border-t border-[#21232F]" />
                      <td className="h-[1px] border-t border-[#21232F]" />
                    </tr>
                    {data?.referrals.length
                      ? data.referrals.map((el, index) => (
                          <tr
                            className={`h-[56px] text-center text-base ${
                              index != 0 && index % 2 == 1 ? "bg-[#21232F]" : ""
                            }`}
                            key={index}
                          >
                            <td>
                              {formatDate(el.createdAt, "DD.MM.YYYY HH:mm")}
                            </td>
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
                            <td>ID {el.id}</td>
                            <td>{el.profits.profitL5}</td>
                            <td>{`${el.profits.profitM3}/${el.profits.profitM6}`}</td>
                            <td
                              className={`${unbounded.className} text-2xl text-[#64D121]`}
                            >
                              {el.profits.profitTotal} USDT
                            </td>
                            <td>{el.partnersCount}</td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                ) : null}
              </table>
            </div>
            <div className="lg:hidden flex flex-col w-full gap-[12px]">
              {data?.referrals.map((el, index) => (
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
                      <p>{t("partners.table.item1")}</p>
                      <p>{formatDate(el.createdAt, "DD.MM.YYYY HH:mm")}</p>
                    </div>
                    <div className="flex w-full justify-between items-center text-[14px]">
                      <p>{t("partners.table.item2")}</p>
                      <div className="flex cursor-pointer gap-[5px] items-center justify-between">
                        <span
                          onClick={(e) => {
                            navigator?.clipboard?.writeText("0xdjfjaw...4560");
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
                      <p>ID</p>
                      <p>ID {el.id}</p>
                    </div>
                    <div className="flex w-full justify-between items-center text-[14px]">
                      <p>Line5</p>
                      <p>{el.profits.profitL5}</p>
                    </div>
                    <div className="flex w-full justify-between items-center text-[14px]">
                      <p>M3/M6</p>
                      <p>{`${el.profits.profitM3}/${el.profits.profitM6}`}</p>
                    </div>
                    <div className="flex w-full justify-between items-center text-[14px]">
                      <p>{t("partners.table.item3")}</p>
                      <p
                        className={`${unbounded.className} text-[18px] text-[#64D121]`}
                      >
                        {el.profits.profitTotal} USDT
                      </p>
                    </div>
                    <div className="flex w-full justify-between items-center text-[14px]">
                      <p>{t("partners.table.item4")}</p>
                      <p>{el.partnersCount}</p>
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
        <PartnersFilterPopup />
      </div>
    </>
  );
}
