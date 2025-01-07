import React from "react";
import Image from "next/image";
import { Sprite } from "@/tags/sprite";
import { Promo } from "@/lib/interfaces";
import copyIcon from "/public/images/profile/copy.png";
import fullIcon from "/public/images/profile/full.png";
import emptyImageIcon from "/public/images/profile/empty-image.png";

interface AutomaticCardProps {
  info: Promo;
}

const AutomaticCard = ({ info }: AutomaticCardProps) => {
  return (
    <div className="p-[3px] rounded-[10px] bg-gradientDashboardRadial">
      <div className="flex flex-col w-full rounded-[10px] gap-6 p-[21px] bg-black">
        <p className="bg-gradientDashboardText text-[20px] text-transparent bg-clip-text">
          {info.title}
        </p>
        <div className="p-[3px] rounded-[10px] h-[306px] bg-gradientDashboardRadial">
          {info.file && info.file.trim().length > 0 ? (
            <Image
              className="aspect-video w-full h-full rounded-[10px] bg-black"
              alt=""
              src={info.file}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full rounded-[10px] bg-black">
              <Image alt={""} src={emptyImageIcon} width={100} height={100} />
            </div>
          )}
        </div>
        <div className="flex rounded-[10px] p-[1px] w-auto h-[40px] bg-gradientDashboardRadial">
          <div className="flex items-center justify-between rounded-[10px] bg-black w-full py-[10px] px-[15px]">
            <p className="text-sm">{info.link}</p>
            <div className="flex gap-[10px]">
              <Image
                src={copyIcon}
                alt={"copy"}
                className="w-[17px] h-[17px] cursor-pointer"
                onClick={(e: any) => {
                  navigator?.clipboard?.writeText(info.link);
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
    </div>
  );
};

export default AutomaticCard;
