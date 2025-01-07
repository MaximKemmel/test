"use client";
import React, {
  Dispatch,
  HTMLInputTypeAttribute,
  memo,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import clsx from "clsx";
import { useController } from "react-hook-form";
import { unbounded } from "@/styles/fonts";
import carretDown from "/public/images/profile/carret-down.png";
import Image from "next/image";
import List from "./List";

interface InputProps {
  placeholder: string;
  className?: string;
  classNameContainer?: string;
  classNameLabel?: string;
  name: string;
  bottom?: ReactNode;
  type?: HTMLInputTypeAttribute;
}

const Input = ({
  placeholder,
  bottom,
  className,
  classNameLabel,
  classNameContainer,
  name,
  type = "text",
}: InputProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name });

  const [currentCurrency, setCurrency] = useState("RUB");

  return (
    <>
      {type === "currency" ? (
        <div className="flex flex-col w-[calc(50%-20px)] shrink-0">
          <div className={clsx("flex w-full", classNameContainer)}>
            <label
              className={clsx("text-[20px] w-1/2", classNameLabel)}
              htmlFor={field.name}
            >
              {placeholder}
            </label>
            <div className="flex items-end w-1/2">
              <input
                id={field.name}
                {...field}
                type="number"
                className={clsx(
                  "bg-transparent relative border-[#775E22] pb-2 outline-none border-b w-full px-[3px] text-[#775E22] text-2xl",
                  unbounded.className,
                  className
                )}
              />
              <div className="w-[80px]">
                <List
                  className="gap-4 !justify-start"
                  value={currentCurrency}
                  setValue={setCurrency}
                  arrayValues={["RUB", "USD"]}
                />
              </div>
            </div>
          </div>
          {bottom}
        </div>
      ) : (
        <div className={clsx("space-y-3 ", classNameContainer)}>
          <label
            className={clsx("text-[20px] w-full", classNameLabel)}
            htmlFor={field.name}
          >
            {placeholder}
          </label>
          <input
            id={field.name}
            {...field}
            type={type}
            className={clsx(
              "bg-transparent relative border-[#775E22] pb-2 outline-none border-b w-full px-[3px] text-[#775E22] text-2xl",
              unbounded.className,
              className
            )}
          />
          {bottom}
        </div>
      )}
    </>
  );
};

export default memo(Input);
