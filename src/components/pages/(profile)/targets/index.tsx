"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { TargetProgress } from "./progress";
import { CreateTargetPopup } from "./create-target-popup";
import { usePopupTargetStore } from "@/store/toggle-stores";
import TargetCard from "@/components/cards/TargetCard";
import useTargetStore from "@/store/targets-store";
import { useEffect, useMemo, useState } from "react";
import { Target } from "@/lib/interfaces";
import { formatDate } from "@/lib/date";
import { calcPercentage } from "@/lib/api";
import { useTranslations } from "next-intl";
import { getImageUrl } from "@/lib/data";
import { unbounded } from "@/styles/fonts";
import targetIcon from "/public/images/profile/target.png";
import editIcon from "/public/images/profile/edit.png";
import repeatIcon from "/public/images/profile/repeat.png";
import deleteIcon from "/public/images/profile/delete.png";
import { Swiper as Swip } from "swiper/types";
import arrowLeftIcon from "/public/images/profile/arrow-left.png";
import arrowRightIcon from "/public/images/profile/arrow-right.png";
import completedIcon from "/public/images/profile/completed.png";
import emptyImageIcon from "/public/images/profile/empty-image.png";

export function Targets() {
  const t = useTranslations("Dashboard");
  const { open } = usePopupTargetStore();
  const { getTargets, targets } = useTargetStore();
  const [active, setActive] = useState<number>(0);
  const [id, setId] = useState<number | null>(null);
  const [swiper, setSwiper] = useState<Swip>();

  useEffect(() => {
    getTargets();
  }, []);

  const nextTarget = (val: number) => () => {
    if (targets[val]) {
      setActive(val);
    }
  };

  const prevTarget = (val: number) => () => {
    if (val >= 0) {
      setActive(val);
    }
  };

  const onEdit = (id: number) => {
    setId(id);
    open();
  };

  const data = useMemo(() => {
    return [
      {
        name: t("targets.info.item1"),
        key: "title",
      },
      {
        name: t("targets.info.item2"),
        key: "content",
      },
      {
        name: t("targets.info.item3"),
        key: "value",
      },
      {
        name: t("targets.info.item4"),
        key: "demand",
      },
      {
        name: t("targets.info.item5"),
        key: "beginDate",
      },
      {
        name: t("targets.info.item6"),
        key: "endDate",
      },
    ];
  }, []);

  return (
    <div className="flex flex-col gap-[40px] grow">
      <div className="flex items-center gap-y-4 xs:flex-col xs:items-start justify-between">
        <p
          className={`${unbounded.className} bg-gradientDashboardText lg:text-[45px] text-2xl text-transparent bg-clip-text w-max`}
        >
          {t("targets.title")}
        </p>
        <button
          onClick={open}
          className="flex md:h-[54px] h-[46px] items-center justify-center gap-3 bg-black py-3 px-[30px] rounded-[5px] border-[1px] border-[#CB9E31]"
        >
          <p className={`${unbounded.className} text-[#CB9E31] text-2xl`}>+</p>
          <p className="text-[#CB9E31] text-xs">{t("main.addTarget")}</p>
        </button>
      </div>
      {targets?.length ? (
        <>
          {targets.filter((target) => target.value < target.demand).length >
          0 ? (
            <div className="flex rounded-[10px] p-[3px] grow bg-gradientDashboardRadial">
              <div className="flex rounded-[10px] bg-black w-full p-[20px] relative">
                <Swiper
                  onSwiper={setSwiper}
                  mousewheel={false}
                  direction={"horizontal"}
                  loop
                  className={`w-full flex overflow-hidden`}
                  slidesPerView={1}
                >
                  {targets
                    .filter((target) => target.value < target.demand)
                    .map((target, index) => (
                      <SwiperSlide
                        key={index}
                        className="flex h-auto horizontal-swiper"
                      >
                        <div className="flex flex-col items-center gap-12 w-full">
                          <p
                            className={`${unbounded.className} bg-gradientDashboardText lg:text-[45px] text-2xl text-transparent bg-clip-text w-max`}
                          >
                            {`${t("targets.target")} ${index + 1}`}
                          </p>
                          <div className="flex lg:flex-row flex-col w-full gap-8">
                            <div className="p-[3px] rounded-[10px] h-[306px] lg:w-[306px] w-full bg-gradientDashboardRadial shrink-0">
                              {target.image.trim().length != 0 ? (
                                <Image
                                  className="object-cover rounded-[10px] bg-black"
                                  alt={""}
                                  src={getImageUrl(target.image)}
                                  width={303}
                                  height={303}
                                />
                              ) : (
                                <div className="flex items-center justify-center w-full h-full rounded-[10px] bg-black">
                                  <Image
                                    alt={""}
                                    src={emptyImageIcon}
                                    width={100}
                                    height={100}
                                  />
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col grow">
                              {data.map((info, index) => {
                                return (
                                  <div
                                    key={index}
                                    className={`${
                                      index === 0 || index % 2 === 0
                                        ? "bg-[#21232F]"
                                        : ""
                                    } flex items-center justify-between grow px-6 lg:h-auto h-[50px]`}
                                  >
                                    <p className="text-xl">{info.name}</p>
                                    <p
                                      className={`${unbounded.className} text-xl text-right text-ellipsis overflow-hidden max-w-[55%] text-[#CB9E31]`}
                                    >
                                      {`${target[info.key as keyof Target]}${
                                        index === 2 || index === 3 ? " $" : ""
                                      }`}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="p-[3px] rounded-[10px] h-[306px] lg:w-[306px] w-full bg-gradientDashboardRadial shrink-0">
                              <div className="flex flex-col w-full h-full rounded-[10px] bg-black p-[20px] justify-between">
                                <div className="flex flex-col gap-[16px] w-full items-center">
                                  <div className="flex items-center gap-2.5">
                                    <p className="text-sm">
                                      {t("main.targetTitle")}
                                    </p>
                                    <Image
                                      src={targetIcon}
                                      alt={"target"}
                                      className="cursor-pointer w-6 h-6"
                                    />
                                  </div>
                                  <div
                                    className={`${unbounded.className} bg-gradientDashboardText text-[45px] leading-none text-transparent bg-clip-text w-max`}
                                  >
                                    {`${calcPercentage(
                                      target.value,
                                      target.demand
                                    ).toFixed(0)}%`}
                                  </div>
                                </div>
                                <div className="w-full h-[1px] bg-gradientDashboardText" />
                                <button
                                  onClick={() => onEdit(target.id)}
                                  className="flex w-full h-[40px] items-center justify-center gap-3 bg-black rounded-[5px] border-[1px] border-[#CB9E31]"
                                >
                                  <Image
                                    alt={""}
                                    width={24}
                                    height={24}
                                    src={editIcon}
                                  />
                                  <p className="text-[#CB9E31] text-sm">
                                    {t("targets.editTarget")}
                                  </p>
                                </button>
                                <button className="flex w-full h-[40px] items-center justify-center gap-3 bg-black rounded-[5px] border-[1px] border-[#CB9E31]">
                                  <Image
                                    alt={""}
                                    width={24}
                                    height={24}
                                    src={repeatIcon}
                                  />
                                  <p className="text-[#CB9E31] text-sm">
                                    {t("targets.repeatTarget")}
                                  </p>
                                </button>
                                <button className="flex w-full h-[40px] items-center justify-center gap-3 bg-black rounded-[5px] border-[1px] border-[#CB9E31]">
                                  <Image
                                    alt={""}
                                    width={24}
                                    height={24}
                                    src={deleteIcon}
                                  />
                                  <p className="text-[#CB9E31] text-sm">
                                    {t("targets.deleteTarget")}
                                  </p>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
                <div className="absolute z-6 flex h-[56px] justify-between w-[calc(100%-40px)]">
                  <div
                    className={`${unbounded.className} flex items-center text-[#CB9E31] cursor-pointer`}
                    onClick={() => {
                      if (!swiper) return;
                      swiper.slidePrev();
                    }}
                  >
                    <Image
                      src={arrowLeftIcon}
                      alt={"prev"}
                      className="w-6 h-6"
                    />
                    {t("main.prev")}
                  </div>
                  <div
                    className={`${unbounded.className} flex items-center text-[#CB9E31] cursor-pointer`}
                    onClick={() => {
                      if (!swiper) return;
                      swiper.slideNext();
                    }}
                  >
                    {t("main.next")}
                    <Image
                      src={arrowRightIcon}
                      alt={"next"}
                      className="w-6 h-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {targets.filter((target) => target.value >= target.demand).length >
          0 ? (
            <div className="flex flex-col w-full gap-6">
              <div
                className={`${unbounded.className} flex gap-[30px] items-center text-2xl`}
              >
                <p className="bg-gradientDashboardText text-transparent bg-clip-text w-max">
                  {t("targets.completed")}
                </p>
                <p>{`(${
                  targets.filter((target) => target.value >= target.demand)
                    .length
                })`}</p>
              </div>
              <div className="grid lg:gap-6 gap-[10px] lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                {targets
                  .filter((target) => target.value >= target.demand)
                  .map((target, index) => (
                    <div
                      className="flex rounded-[10px] p-[3px] grow bg-gradientDashboardRadial"
                      key={index}
                    >
                      <div className="flex flex-col gap-6 rounded-[10px] bg-black w-full p-[20px]">
                        <div className="flex justify-between">
                          <p
                            className={`${unbounded.className} bg-gradientDashboardText text-transparent bg-clip-text w-max text-ellipsis overflow-hidden max-w-[85%] whitespace-nowrap`}
                          >
                            {target?.title}
                          </p>
                          <Image
                            src={completedIcon}
                            alt={"completed"}
                            className="w-6 h-6"
                          />
                        </div>
                        <div className="flex flex-col w-full">
                          <div className="flex justify-between p-3 items-center">
                            <p>{t("targets.card.item1")}</p>
                            <p
                              className={`${unbounded.className} text-[#CB9E31] shrink-0`}
                            >
                              {target.demand}$
                            </p>
                          </div>
                          <div className="flex justify-between p-3 bg-[#21232F] items-center">
                            <p>{t("targets.card.item2")}</p>
                            <p
                              className={`${unbounded.className} text-[#CB9E31] shrink-0  whitespace-pre`}
                            >{`${target.beginDate} -\n${target.endDate}`}</p>
                          </div>
                          <div className="flex justify-between p-3 items-center">
                            <p>{t("targets.card.item3")}</p>
                            <p
                              className={`${unbounded.className} text-[#CB9E31] shrink-0`}
                            >
                              {target.value - target.demand}$
                            </p>
                          </div>
                        </div>
                        <button className="flex w-[182px] h-[40px] items-center justify-center gap-3 bg-black rounded-[5px] border-[1px] border-[#CB9E31] self-center">
                          <Image
                            alt={""}
                            width={24}
                            height={24}
                            src={repeatIcon}
                          />
                          <p className="text-[#CB9E31] text-sm">
                            {t("targets.repeatTarget")}
                          </p>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <div className="space-y-[40px]">
          <p className="text-h3 ">{t("main.targetNull")}</p>
        </div>
      )}
      <CreateTargetPopup id={id} />
    </div>
  );
}
