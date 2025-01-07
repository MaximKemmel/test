import React from 'react';
import clsx from "clsx";

interface ArrowIconProps {
    position?: 'left' | 'top' | 'bottom'
}


const ArrowIcon = ({position = 'bottom'}: ArrowIconProps) => {
    return (
        <svg className={clsx('transition-transform', position === 'top' && 'rotate-180')} width="19" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 10L0.406734 0.25L18.5933 0.25L9.5 10Z" fill="#C89539"/>
        </svg>
    );
};

export default ArrowIcon;