import React from 'react';

interface DrawerOpenProps {
    onClick(): void
}

const DrawerOpen = ({onClick}: DrawerOpenProps) => {
    return (
        <button className="h-[24px] w-[24px] flex items-center justify-center" onClick={onClick}>
            <svg  className="hidden xs:flex" width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="1" x2="24" y2="1" stroke="white" strokeWidth="2"/>
                <line y1="6" x2="20" y2="6" stroke="white" strokeWidth="2"/>
                <line y1="11" x2="14" y2="11" stroke="white" strokeWidth="2"/>
            </svg>
        </button>
    );
};

export default DrawerOpen;
