import React from 'react';
import clsx from "clsx";

interface DashboardArrowProps {
    position: 'left' | 'right',
    className?: string
}

const DashboardArrow = ({position, className}: DashboardArrowProps) => {
    return (
        <svg className={clsx('cursor-pointer', className, position === 'right' && 'rotate-180')} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M19.4129 7.46209C19.779 7.8282 19.779 8.4218 19.4129 8.78791L12.5758 15.625L19.4129 22.4621C19.779 22.8282 19.779 23.4218 19.4129 23.7879C19.0468 24.154 18.4532 24.154 18.0871 23.7879L10.5871 16.2879C10.221 15.9218 10.221 15.3282 10.5871 14.9621L18.0871 7.46209C18.4532 7.09597 19.0468 7.09597 19.4129 7.46209Z" fill="#BCBCBC"/>
        </svg>
    );
};

export default DashboardArrow;