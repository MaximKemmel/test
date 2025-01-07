"use client";
import { Separator } from "@/components/ui/separator";
import { cn, getLast50 } from "@/lib/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { unbounded } from "@/styles/fonts";

//TODO Тестовые данные
export function HomeResultPay({
  isShowed,
  isMob,
}: {
  isShowed?: boolean;
  isMob?: boolean;
}) {
  //const [last, setLast] = useState<{value: number; User: { userId: number; }; }[]>([]);
  const [last, setLast] = useState<
    { value: number; User: { userId: number } }[]
  >([
    {
      value: 199415,
      User: { userId: 1554 },
    },
    {
      value: 199416,
      User: { userId: 1574 },
    },
    {
      value: 199417,
      User: { userId: 1555 },
    },
    {
      value: 199418,
      User: { userId: 1554 },
    },
    {
      value: 199415,
      User: { userId: 154 },
    },
    {
      value: 199410,
      User: { userId: 155400 },
    },
  ]);
  const t = useTranslations("Home");

  useEffect(() => {
    getLast50().then((res) => {
      //setLast(res.result);
      setLast([
        {
          value: 199415,
          User: { userId: 1554 },
        },
        {
          value: 199416,
          User: { userId: 1574 },
        },
        {
          value: 199417,
          User: { userId: 1555 },
        },
        {
          value: 199418,
          User: { userId: 1554 },
        },
        {
          value: 199415,
          User: { userId: 154 },
        },
        {
          value: 199410,
          User: { userId: 155400 },
        },
      ]);
    });
    setInterval(() => {
      getLast50().then((res) => {
        //setLast(res.result);
        setLast([
          {
            value: 199415,
            User: { userId: 1554 },
          },
          {
            value: 199416,
            User: { userId: 1574 },
          },
          {
            value: 199417,
            User: { userId: 1555 },
          },
          {
            value: 199418,
            User: { userId: 1554 },
          },
          {
            value: 199415,
            User: { userId: 154 },
          },
          {
            value: 199410,
            User: { userId: 155400 },
          },
        ]);
      });
    }, 300000);
  }, []);

  return isShowed ? (
    <div className="flex flex-row justify-between items-center lg:pt-10">
      <p
        className={`${unbounded.className} w-[400px] text-[45px] text-black text-left lg:flex hidden`}
      >
        {t("home.results.pay.title")}
      </p>
      <div className="flex bg-white lg:rounded-3xl rounded-b-[10px] grid grid-cols-1 shadow-resultsShadow grow lg:p-14 p-2 text-black">
        {isMob ? (
          <Swiper
            centeredSlides={true}
            direction={"horizontal"}
            mousewheel={false}
            autoplay={{
              delay: 1500,
            }}
            loop
            className={"h-auto w-full overflow-hidden"}
            modules={[Autoplay]}
            slidesPerView={"auto"}
            watchSlidesProgress={true}
            allowTouchMove={false}
          >
            {last.map((el, index) => (
              <SwiperSlide key={index}>
                {({ isActive, isPrev, isNext }) => (
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
                          ID
                        </span>
                        <span
                          className={`${
                            unbounded.className
                          } w-full lg:text-2xl sm:text-[15px] text-[10px] ${
                            isActive ? "text-[#BD0003]" : "text-black"
                          }`}
                        >
                          {el.User.userId}
                        </span>
                      </div>
                      <div className="flex flex-col items-center lg:gap-[20px] gap-[5px] w-full">
                        <span className="flex lg:text-[20px] sm:text-[15px] text-[10px] font-normal">
                          {t("home.results.pay.payment")}
                        </span>
                        <span
                          className={`${
                            unbounded.className
                          } w-full lg:text-2xl sm:text-[15px] text-[10px] ${
                            isActive ? "text-[#BD0003]" : "text-black"
                          }`}
                        >
                          ${el.value.toLocaleString()}
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
            ))}
          </Swiper>
        ) : (
          <Swiper
            centeredSlides={true}
            direction={"vertical"}
            mousewheel={false}
            autoplay={{
              delay: 1500,
            }}
            loop
            className={`w-full h-[508px] xs:h-[728px] overflow-hidden swiper-vertical`}
            modules={[Autoplay]}
            slidesPerView={5}
            watchSlidesProgress={true}
            allowTouchMove={false}
          >
            {last.map((el, index) => (
              <SwiperSlide key={(index + 1) * last.length}>
                {({ isActive, isPrev, isNext, isVisible }) => (
                  <div className="!flex flex-col !justify-between gap-8 spy-8 w-full text-center xl:text-xl sm:text-base text-sm">
                    <div
                      className={`${
                        !isActive && !isNext && !isPrev ? "opacity-20" : ""
                      } ${
                        isNext || isPrev ? "opacity-40" : ""
                      } flex flex-row gap-6 w-full !justify-between`}
                    >
                      <div className="flex justify-left sm:flex-nowrap flex-wrap gap-8 w-[175px]">
                        <span className="flex items-center text-left text-[20px] font-normal">
                          ID
                        </span>
                        <span
                          className={`${
                            unbounded.className
                          } sm:w-auto w-full sm:text-2xl text-sm flex items-center text-left ${
                            isActive ? "text-[#BD0003]" : "text-black"
                          }`}
                        >
                          {el.User.userId}
                        </span>
                      </div>
                      <div className="flex justify-between sm:flex-nowrap flex-wrap sm:mr-8 gap-8 w-[300px]">
                        <span className="sm:w-max flex items-center text-left text-[20px] font-normal">
                          {t("home.results.pay.payment")}
                        </span>
                        <span
                          className={`${
                            unbounded.className
                          } sm:w-auto w-full sm:text-2xl text-sm flex items-center text-left ${
                            isActive ? "text-[#BD0003]" : "text-black"
                          }`}
                        >
                          ${el.value.toLocaleString()}
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
            ))}
          </Swiper>
        )}
      </div>
    </div>
  ) : null;
}
