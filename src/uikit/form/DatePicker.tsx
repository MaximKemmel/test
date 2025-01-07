import React, { forwardRef } from "react";
import { useController } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import calendar from "/public/images/profile/calendar.png";
import Image from "next/image";

registerLocale("ru", ru);

interface DateProps {
  placeholder: string;
  className?: string;
  name: string;
}

interface Props {
  value: string;
  onClick(): void;
}
export type Ref = HTMLButtonElement;

const CustomInput = forwardRef<Ref, Props>(({ value, onClick }, ref) => {
  return (
    <button
      type="button"
      className="bg-transparent outline-none"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  );
});

CustomInput.displayName = "CustomInput";

const DatePickerCustom = ({ placeholder, className, name }: DateProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name });

  return (
    <div className="flex gap-4 text-[#775E22] text-2xl w-[calc(50%-20px)]">
      <p className="text-black text-[20px] w-1/2">{placeholder}</p>
      <div className="flex w-1/2 gap-[10px] justify-between border-[#775E22] pb-2 px-2 border-b">
        <DatePicker
          className="w-1/2"
          locale="ru"
          selected={field.value}
          onChange={(date) => field.onChange(date)}
          customInput={ // @ts-ignore
            <CustomInput />
          }
        />
        <Image src={calendar} alt="" className="w-6 h-6" />
      </div>
    </div>
  );
};

export default DatePickerCustom;
