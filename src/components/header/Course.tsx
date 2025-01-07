import React, { useEffect, useState } from "react";
import { Sprite } from "@/tags/sprite";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import clsx from "clsx";

interface CourseProps {
  className?: string;
}

type CourseItem = {
  binancecoin: {
    usd: number;
  };
  "cryptorg-token": {
    usd: number;
  };
  tether: {
    usd: number;
  };
};

const Course = ({ className }: CourseProps) => {
  const [valueCourse, setValueCourse] = useState<CourseItem>({
    binancecoin: {
      usd: 0,
    },
    "cryptorg-token": {
      usd: 0,
    },
    tether: {
      usd: 0,
    },
  });

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin%2Ctether%2Ccryptorg-token&vs_currencies=usd",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "force-cache",
      }
    )
      .then(function (res) {
        return res.json();
      })
      .then(function (body: CourseItem) {
        setValueCourse(body);
      });
  }, []);

  return (
    <div className="w-[230px]">
      <Swiper
        autoplay={{
          delay: 3000,
        }}
        loop
        wrapperClass="!flex "
        className={clsx(`flex gap-5 items-center w-full]`, className)}
        modules={[Autoplay]}
        slidesPerView={1}
      >
        <SwiperSlide className="!flex items-center justify-between ">
          <p>1 USDT</p>
          <Sprite className="w-[24px] h-[16px] cursor-pointer" name="arrow" />
          <p>$ {valueCourse.tether.usd}</p>
        </SwiperSlide>
        <SwiperSlide className=" !flex items-center justify-between ">
          <p>1 BNB</p>
          <Sprite className="w-[24px] h-[16px] cursor-pointer" name="arrow" />
          <p>$ {valueCourse.binancecoin.usd}</p>
        </SwiperSlide>
        <SwiperSlide className=" !flex items-center justify-between ">
          <p>1 CTG</p>
          <Sprite className="w-[24px] h-[16px] cursor-pointer" name="arrow" />
          <p>$ {valueCourse["cryptorg-token"].usd}</p>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Course;
