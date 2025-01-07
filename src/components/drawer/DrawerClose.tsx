import React from 'react';
import clsx from "clsx";

interface DrawerCloseProps {
    onClick(): void,
    className?: string
}

const DrawerClose = ({onClick, className}: DrawerCloseProps) => {
    return (
        <button className={clsx("h-[24px] w-[24px] flex items-center justify-center", className)} onClick={onClick}>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1339_4113)">
                    <path d="M17 16.999L0.000366211 0" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.9998 0.000976562L8.15505e-05 17" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                    <clipPath id="clip0_1339_4113">
                        <rect width="17" height="17" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        </button>
    );
};

export default DrawerClose;
