import { unbounded } from "@/styles/fonts";
import React from "react";
import { useController } from "react-hook-form";

interface TextAreaProps {
  placeholder: string;
  innerPlaceholder?: string;
  rows?: number;
  name: string;
  className?: string;
}

const TextArea = ({
  placeholder,
  innerPlaceholder,
  className,
  name,
  rows = 10,
}: TextAreaProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name });

  return (
    <div className="space-y-3">
      <p className="text-[20px]">{placeholder}</p>
      <textarea
        {...field}
        className={`${unbounded.className} p-[12px] w-full bg-transparent min-h-[150px] border resize-none border-[#775E22] rounded-[3px] text-[#775E22] text-xl placeholder-[#775E22BB] placeholder:text-[14px]`}
        placeholder={innerPlaceholder}
      />
    </div>
  );
};

export default TextArea;
