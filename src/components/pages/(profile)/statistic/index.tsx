"use client";
import { Sprite } from "@/tags/sprite";
import React, { useEffect, useState } from "react";
import { StaticsPopup, StatisticFilterPopup } from "./filter-popup";
import { usePopupStatisticFilterStore } from "@/store/toggle-stores";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAddress } from "@thirdweb-dev/react";
import { getTransactionsDashboard } from "@/lib/api";
import { Transaction } from "@/lib/interfaces";
import { formatDate } from "@/lib/date";
import { openHash } from "@/lib/data";
import { unbounded } from "@/styles/fonts";
import filterIcon from "/public/images/profile/filter-stats.png";
import copyIcon from "/public/images/profile/copy.png";

export function Statistic() {
  const address = useAddress();

  const t = useTranslations("Dashboard");
  const [count, setCount] = useState<number>(20);
  const { open, close } = usePopupStatisticFilterStore();

  //TODO Тестовые данные
  //const [rows, setRows] = useState<Transaction[]>();
  const [rows, setRows] = useState<Transaction[]>([
    {
      to: "test",
      contractName: "mmdg",
      type: 0,
      receiver: "user",
      User: {
        userId: 4848,
      },
      profitType: "DIRECT",
      value: 10,
      transitValue: 7,
      level: 5,
      matrix: 4,
      createdAt: "01.01.2025",
      transactionHash: "0xdjfjaw...4560",
    },
    {
      to: "test",
      contractName: "mmdg",
      type: 0,
      receiver: "user",
      User: {
        userId: 4848,
      },
      profitType: "MISSED",
      value: 10,
      transitValue: 7,
      level: 5,
      matrix: 4,
      createdAt: "01.01.2025",
      transactionHash: "0xdjfjaw...4560",
    },
    {
      to: "test",
      contractName: "mmdg",
      type: 0,
      receiver: "user",
      User: {
        userId: 4848,
      },
      profitType: "ADDITIONAL",
      value: 10,
      transitValue: 7,
      level: 5,
      matrix: 4,
      createdAt: "01.01.2025",
      transactionHash: "0xdjfjaw...4560",
    },
    {
      to: "test",
      contractName: "mmdg",
      type: 0,
      receiver: "user",
      User: {
        userId: 4848,
      },
      profitType: "OVERTAKE",
      value: 10,
      transitValue: 7,
      level: 5,
      matrix: 4,
      createdAt: "01.01.2025",
      transactionHash: "0xdjfjaw...4560",
    },
    {
      to: "test",
      contractName: "mmdg",
      type: 0,
      receiver: "user",
      User: {
        userId: 4848,
      },
      profitType: "DIRECT",
      value: 10,
      transitValue: 7,
      level: 5,
      matrix: 4,
      createdAt: "01.01.2025",
      transactionHash: "0xdjfjaw...4560",
    },
  ]);

  const [activeProgram, setActiveProgram] = useState<number | null>(null);

  const onAcceptFilter = (filter: StaticsPopup) => {
    close();

    switch (filter.type) {
      case "Line5": {
        setActiveProgram(1);
        break;
      }
      case "M3": {
        setActiveProgram(2);
        break;
      }
      case "M6": {
        setActiveProgram(2);
        break;
      }
    }
  };

  useEffect(() => {
    if (address)
      getTransactionsDashboard(address, activeProgram, count).then((res) => {
        if (res) {
          setRows(res.result);
        }
      });
  }, [address, count, activeProgram]);

  return (
    <>
      <div className="flex flex-col lg:gap-[40px] gap-[20px] grow">
        <div className="flex items-center justify-between">
          <p
            className={`${unbounded.className} bg-gradientDashboardText lg:text-[45px] text-2xl text-transparent bg-clip-text w-max`}
          >
            {t("statistic.title")}
          </p>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={open}
          >
            <p className="text-lg text-[#CB9E31]">{t("main.filter")}</p>
            <Image src={filterIcon} alt={"filter"} className="w-6 h-6" />
          </div>
        </div>
        <div className="flex rounded-[10px] p-[3px] grow bg-gradientDashboardRadial">
          <div className="flex rounded-[10px] bg-black w-full lg:p-[20px] p-[1px]">
            <div className="lg:flex hidden w-full xs:overflow-x-scroll">
              <table className="table-auto w-full xs:min-w-[1000px] border-collapse border-spacing-y-1.5">
                <thead>
                  <tr className="text-[#D9DBE1] text-xl h-[67px]">
                    <th>{t("statistic.table.item1")}</th>
                    <th>{t("statistic.table.item2")}</th>
                    <th>ID</th>
                    <th>{t("statistic.table.item3")}</th>
                    <th>{t("statistic.table.item4")}</th>
                    <th>{t("statistic.table.item5")}</th>
                    <th>USDT</th>
                  </tr>
                </thead>
                {rows?.length ? (
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
                    {rows.map((el, index) => (
                      <tr
                        className={`h-[56px] text-center text-base ${
                          index != 0 && index % 2 == 1 ? "bg-[#21232F]" : ""
                        }`}
                        key={index}
                      >
                        <td className="flex h-[56px] justify-center items-center">
                          <div
                            className={`
                              ${
                                el.profitType === "DIRECT"
                                  ? "bg-gradientDashboardRadial"
                                  : ""
                              } 
                              ${
                                el.profitType === "OVERTAKE"
                                  ? "bg-[#C41A1A]"
                                  : ""
                              } 
                              ${
                                el.profitType === "ADDITIONAL"
                                  ? "bg-[#00ABBA]"
                                  : ""
                              } 
                              ${
                                el.profitType === "MISSED" ? "bg-[#64D121]" : ""
                              } 
                              flex h-[40px] w-[40px] p-[6px] rounded-full self-center`}
                          >
                            <div className="flex w-full h-full rounded-full bg-black" />
                          </div>
                        </td>
                        <td>{formatDate(el.createdAt, "DD.MM.YYYY HH:mm")}</td>
                        <td>ID {el.User.userId}</td>
                        <td>{el.contractName}</td>
                        <td>{el.level || "Нет"}</td>
                        <td className="cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span
                              onClick={(e) => {
                                navigator?.clipboard?.writeText(
                                  el.transactionHash
                                );
                                const target = e?.target as HTMLElement;
                                target.style.color = "#64D121";
                                setTimeout(
                                  () => (target.style.color = ""),
                                  1000
                                );
                              }}
                            >{`${el.transactionHash?.slice(
                              0,
                              6
                            )}...${el.transactionHash?.slice(-4)}`}</span>
                            <Image
                              src={copyIcon}
                              alt={"copy"}
                              className="w-6 h-6"
                              onClick={() => openHash(el.transactionHash)}
                            />
                          </div>
                        </td>
                        <td
                          className={`${unbounded.className} text-2xl text-[#64D121]`}
                        >
                          {el.transitValue ? el.transitValue : el.value} USDT
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : null}
              </table>
            </div>
            <div className="lg:hidden flex flex-col w-full gap-[12px]">
              {rows.map((el, index) => (
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
                      <p>{t("statistic.table.item1")}</p>
                      <div
                        className={`
                              ${
                                el.profitType === "DIRECT"
                                  ? "bg-gradientDashboardRadial"
                                  : ""
                              } 
                              ${
                                el.profitType === "OVERTAKE"
                                  ? "bg-[#C41A1A]"
                                  : ""
                              } 
                              ${
                                el.profitType === "ADDITIONAL"
                                  ? "bg-[#00ABBA]"
                                  : ""
                              } 
                              ${
                                el.profitType === "MISSED" ? "bg-[#64D121]" : ""
                              } 
                              flex h-[25px] w-[25px] p-[4px] rounded-full self-center`}
                      >
                        <div className="flex w-full h-full rounded-full bg-black" />
                      </div>
                    </div>
                    <div className="flex w-full justify-between items-center text-[14px]">
                      <p>{t("statistic.table.item2")}</p>
                      <p>{formatDate(el.createdAt, "DD.MM.YYYY HH:mm")}</p>
                    </div>
                    <div className="flex w-full justify-between items-center text-[14px]">
                      <p>ID</p>
                      <p>ID {el.User.userId}</p>
                    </div>
                    <div className="flex w-full justify-between items-center text-[14px]">
                      <p>{t("statistic.table.item3")}</p>
                      <p>{el.contractName}</p>
                    </div>
                    <div className="flex w-full justify-between items-center text-[14px]">
                      <p>{t("statistic.table.item4")}</p>
                      <p>{el.level || "Нет"}</p>
                    </div>
                    <div className="flex w-full justify-between items-center text-[14px]">
                      <p>{t("statistic.table.item5")}</p>
                      <div className="flex cursor-pointer gap-[5px] items-center justify-between">
                        <span
                          onClick={(e) => {
                            navigator?.clipboard?.writeText(el.transactionHash);
                            const target = e?.target as HTMLElement;
                            target.style.color = "#64D121";
                            setTimeout(() => (target.style.color = ""), 1000);
                          }}
                        >{`${el.transactionHash?.slice(
                          0,
                          6
                        )}...${el.transactionHash?.slice(-4)}`}</span>
                        <Image
                          src={copyIcon}
                          alt={"copy"}
                          className="w-6 h-6"
                          onClick={() => openHash(el.transactionHash)}
                        />
                      </div>
                    </div>                    
                    <div className="flex w-full justify-between items-center text-[14px]">
                      <p>USDT</p>
                      <p className={`${unbounded.className} text-[18px] text-[#64D121]`}>
                          {el.transitValue ? el.transitValue : el.value} USDT</p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
        {rows?.length > 20 ? (
          <button
            onClick={() => setCount((prev) => prev + 20)}
            className=" mx-auto text-main-gray-light/100 w-full text-center"
          >
            <span className=" border-b cursor-pointer border-main-gray-light/100 pb-2">
              {t("main.more")}
            </span>
          </button>
        ) : null}
        <StatisticFilterPopup onAcceptFilter={onAcceptFilter} />
      </div>
    </>
  );
}
