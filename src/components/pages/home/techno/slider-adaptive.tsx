"use client";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

function SliderAdaptive({ data }: { data: { name: string; desc: string; image: any }[] }) {
  return (
    <Swiper className={"lg:!hidden"} spaceBetween={50} modules={[Pagination]} pagination={true}>
      {data.map((el, index) => (
        <SwiperSlide key={el.name}>
          <div
            key={el.desc + index + el.name}
            className="h-full flex flex-col gap-3 items-center text-center p-8 rounded-3xl bg-[#262626]"
          >
            <Image src={el.image} alt="" width={150} height={150} />
            <p className="text-2xl">{el.name}</p>
            <p className=" font-normal" dangerouslySetInnerHTML={{ __html: el.desc }} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SliderAdaptive;
