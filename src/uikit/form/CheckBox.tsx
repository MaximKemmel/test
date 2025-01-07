import { Dispatch, memo, SetStateAction, useState } from "react";
import checkMark from "/public/images/profile/check-mark.png";
import Image from "next/image";

interface CheckBoxProps {
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
}

const CheckBox = ({
  isChecked,
  setIsChecked
}: CheckBoxProps) => {
  return (
    <label className="flex items-center gap-[5px] w-max cursor-pointer text-black">
      <input type="checkbox" onChange={() => setIsChecked(!isChecked)} />
      <span className="w-6 h-6 bg-white border-[#775E22] border rounded-[3px] flex items-center justify-center overflow-hidden" aria-hidden="true">
        {isChecked ? (
          <Image src={checkMark} alt="" className="w-[17px] h-[12px]" />
        ) : null}
      </span>
    </label>
  );
}


export default memo(CheckBox);