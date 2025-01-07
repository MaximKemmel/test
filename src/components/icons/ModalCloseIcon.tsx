import React from "react";
import clsx from "clsx";

interface ModalCloseIconProps {
  onClick(): void;

  className?: string;
}

const ModalCloseIcon = ({ onClick, className }: ModalCloseIconProps) => {
  return (
    <svg
      onClick={onClick}
      className={clsx(
        "absolute top-[18px] left-1/2 -translate-x-1/2 cursor-pointer h-[24px] w-[24px]",
        className
      )}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.00781 5L19.0078 19M5.00784 19L12.0078 12L19.0078 5"
        stroke="#CB9E31"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ModalCloseIcon;
