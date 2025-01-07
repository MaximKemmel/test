import React from 'react';
import background from '/public/images/home/home-back.png';
import Image from "next/image";

const MainBackground = () => {
    return (
        <Image
            src={background}
            alt={"background"}
            placeholder="blur"
            fill
            sizes="100vw"
            style={{
                objectFit: 'cover',
                zIndex: -1
            }}
        />
    );
};

export default MainBackground;