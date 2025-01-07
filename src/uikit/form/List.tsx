import clsx from "clsx";
import { Dispatch, memo, SetStateAction, useState } from "react";
import carretDown from "/public/images/profile/carret-down.png";
import Image from "next/image";

interface ListProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  arrayValues: any[];
  className?: string;
  isHorizontal?: boolean;
}

const List = ({
  value,
  setValue,
  arrayValues,
  className = "",
  isHorizontal = false
}: ListProps) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="flex outline-none w-full justify-between border-b border-[#775E22] items-center pb-[14px] text-[#CB9E31] text-[18px] z-1"
      >
        {value}
        <Image
          src={carretDown}
          className={`${show ? "rotate-180" : ""} w-[20px] h-[20px]`}
          alt=""
        />
      </button>
      <div className="relative">
        <ul
          className={clsx(
            "absolute flex gap-0 bg-[#21232FCC] transition-all w-full xs:overflow-y-auto rounded-[10px] overflow-hidden backdrop-blur-sm z-[10]",
            !show && "opacity-0 select-none ",
            className,
            !isHorizontal ? "flex-col" : "p-[20px] pverflow-x-auto"
          )}
        >
          {arrayValues.map((el, index) => (
            <li
              className={clsx(
                "cursor-pointer p-2 text-[20px] text-white",
                el == value && "bg-[#CB9E31] text-black",
                el == value && isHorizontal && "rounded-[3px] w-[50px] h-[50px] text-black flex items-center justify-center",
              )}
              onClick={() => {
                if (show && value != el) {
                  setValue(el);
                  setShow(false);
                }
              }}
              key={el + index}
            >
              {el}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default memo(List);