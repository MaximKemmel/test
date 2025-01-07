"use client";
import { cn, getLast, getLast50 } from "@/lib/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/date";
import { unbounded } from "@/styles/fonts";

//TODO Тестовые данные
export function HomeResultTable({
  isShowed,
  isMob,
}: {
  isShowed?: boolean;
  isMob?: boolean;
}) {
  //const [last, setLast] = useState<{ createdAt: string; profitTotal: number; userId: number }[]>([]);
  const [last, setLast] = useState<
    { createdAt: string; profitTotal: number; userId: number }[]
  >([
    { createdAt: "01.06.2021", profitTotal: 199514, userId: 1433 },
    { createdAt: "02.06.2021", profitTotal: 199515, userId: 147 },
    { createdAt: "02.06.2021", profitTotal: 199544, userId: 1477 },
    { createdAt: "02.06.2021", profitTotal: 199515, userId: 1478 },
    { createdAt: "02.06.2021", profitTotal: 19955, userId: 1474 },
    { createdAt: "02.06.2021", profitTotal: 199563, userId: 1472 },
    { createdAt: "02.06.2021", profitTotal: 199577, userId: 1473 },
  ]);

  const t = useTranslations("Home");

  useEffect(() => {
    getLast().then((res) => {
      //setLast(res.result.contractUsers);
      setLast([
        { createdAt: "01.06.2021", profitTotal: 199514, userId: 1433 },
        { createdAt: "02.06.2021", profitTotal: 199515, userId: 147 },
        { createdAt: "02.06.2021", profitTotal: 199544, userId: 1477 },
        { createdAt: "02.06.2021", profitTotal: 199515, userId: 1478 },
        { createdAt: "02.06.2021", profitTotal: 19955, userId: 1474 },
        { createdAt: "02.06.2021", profitTotal: 199563, userId: 1472 },
        { createdAt: "02.06.2021", profitTotal: 199577, userId: 1473 },
      ]);
    });
    setInterval(() => {
      getLast().then((res) => {
        //setLast(res.result.contractUsers);
        setLast([
          { createdAt: "01.06.2021", profitTotal: 199514, userId: 1433 },
          { createdAt: "02.06.2021", profitTotal: 199515, userId: 147 },
          { createdAt: "02.06.2021", profitTotal: 199544, userId: 1477 },
          { createdAt: "02.06.2021", profitTotal: 199515, userId: 1478 },
          { createdAt: "02.06.2021", profitTotal: 19955, userId: 1474 },
          { createdAt: "02.06.2021", profitTotal: 199563, userId: 1472 },
          { createdAt: "02.06.2021", profitTotal: 199577, userId: 1473 },
        ]);
      });
    }, 300000);
  }, []);

  return isShowed ? (
    <div className="flex bg-white lg:rounded-3xl rounded-b-[10px] grid grid-cols-1 shadow-resultsShadow grow lg:p-14 p-2 text-black">
      <Swiper
        centeredSlides={true}
        direction={isMob ? "horizontal" : "vertical"}
        mousewheel={false}
        autoplay={{
          delay: 1500,
        }}
        loop
        className={
          isMob
            ? "h-auto w-full overflow-hidden"
            : `w-full h-[508px] xs:h-[728px] overflow-hidden swiper-vertical`
        }
        modules={[Autoplay]}
        slidesPerView={isMob ? "auto" : 5}
        watchSlidesProgress={true}
        allowTouchMove={false}
      >
        {isMob ? (
          <>
            {last.map((el, index) => {
              return (
                <SwiperSlide key={index}>
                  {({ isActive, isPrev, isNext, isVisible }) => (
                    <div className="!flex !justify-between lg:gap-8 gap-[5px] lg:py-8 p-2 lg:w-full w-[30vw] text-center">
                      {isNext ? (
                        <div
                          className={`h-auto bg-[#D9DBE1] w-[1px] table-result-line`}
                        />
                      ) : null}
                     <div
                        className={`${
                          !isActive ? "opacity-20" : ""
                        } flex flex-col lg:gap-6 gap-[10px] w-full !justify-between`}
                      >
                        <div className="flex flex-col items-center lg:gap-[20px] gap-[5px] w-full">
                          <span className="flex lg:text-[20px] sm:text-[15px] text-[10px] font-normal">
                            {t("home.results.table.register_date")}
                          </span>
                          <span
                            className={`${
                              unbounded.className
                            } w-full lg:text-2xl sm:text-[15px] text-[10px] ${
                              isActive ? "text-[#BD0003]" : "text-black"
                            }`}
                          >
                            {formatDate(el.createdAt, "DD.MM.YYYY")}
                          </span>
                        </div>
                        <div className="flex flex-col items-center lg:gap-[20px] gap-[5px] w-full">
                          <span className="flex lg:text-[20px] sm:text-[15px] text-[10px] font-normal">
                            ID
                          </span>
                          <span
                            className={`${
                              unbounded.className
                            } w-full lg:text-2xl sm:text-[15px] text-[10px] ${
                              isActive ? "text-[#BD0003]" : "text-black"
                            }`}
                          >
                            {el.userId}
                          </span>
                        </div>
                        <div className="flex flex-col items-center lg:gap-[20px] gap-[5px] w-full">
                          <span className="flex lg:text-[20px] sm:text-[15px] text-[10px] font-normal">
                            {t("home.results.table.balance")}
                          </span>
                          <span
                            className={`${
                              unbounded.className
                            } w-full lg:text-2xl sm:text-[15px] text-[10px] ${
                              isActive ? "text-[#BD0003]" : "text-black"
                            }`}
                          >
                            ${el.profitTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      {isPrev ? (
                        <div
                          className={`h-auto bg-[#D9DBE1] w-[1px] table-result-line`}
                        />
                      ) : null}
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
          </>
        ) : (
          <>
            {last.map((el, index) => {
              return (
                <SwiperSlide key={(index + 1) * last.length}>
                  {({ isActive, isPrev, isNext, isVisible }) => (
                    <div className="!flex flex-col !justify-between lg:gap-8 sm:gap-6 gap-2 py-8 w-full text-center xl:text-xl md:text-base text-sm">
                      <div
                        className={`${
                          !isActive && !isNext && !isPrev ? "opacity-20" : ""
                        } ${
                          isNext || isPrev ? "opacity-40" : ""
                        } flex flex-row sm:gap-6 gap-2 w-full !justify-between`}
                      >
                        <div className="flex md:flex-nowrap flex-wrap md:ml-8 gap-8 w-[35%]">
                          <span className="sm:w-max flex items-center text-left text-[20px] font-normal">
                            {t("home.results.table.register_date")}
                          </span>
                          <span
                            className={`${
                              unbounded.className
                            } sm:w-auto w-full md:text-2xl text-sm flex items-center text-left ${
                              isActive ? "text-[#BD0003]" : "text-black"
                            }`}
                          >
                            {formatDate(el.createdAt, "DD.MM.YYYY")}
                          </span>
                        </div>
                        <div className="flex justify-left md:flex-nowrap flex-wrap gap-8 w-[175px]">
                          <span className="flex items-center text-left text-[20px] font-normal">
                            ID
                          </span>
                          <span
                            className={`${
                              unbounded.className
                            } sm:w-auto w-full md:text-2xl text-sm flex items-center text-left ${
                              isActive ? "text-[#BD0003]" : "text-black"
                            }`}
                          >
                            {el.userId}
                          </span>
                        </div>
                        <div className="flex justify-between md:flex-nowrap flex-wrap md:mr-8 gap-8 w-[300px]">
                          <span className="sm:w-max flex items-center text-left text-[20px] font-normal">
                            {t("home.results.table.balance")}
                          </span>
                          <span
                            className={`${
                              unbounded.className
                            } sm:w-auto w-full md:text-2xl text-sm flex items-center text-left ${
                              isActive ? "text-[#BD0003]" : "text-black"
                            }`}
                          >
                            ${el.profitTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      {isVisible ? (
                        <div
                          className={`w-full bg-[#D9DBE1] h-[1px] table-result-line`}
                        />
                      ) : null}
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
          </>
        )}
      </Swiper>
    </div>
  ) : null;
}
