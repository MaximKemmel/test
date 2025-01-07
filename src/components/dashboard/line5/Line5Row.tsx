import React, {ReactNode} from 'react';
import {Mousewheel} from "swiper/modules";
import {Swiper} from "swiper/react";

interface Line5RowProps {
    children: ReactNode
}

const Line5Row = ({children}: Line5RowProps) => {
    return (
        <Swiper  spaceBetween={40} slidesPerView={3} modules={[Mousewheel]} mousewheel={true} className="flex items-center justify-center">
            {children}
        </Swiper>
    );
};

export default Line5Row;