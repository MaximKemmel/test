import React from 'react';
import Image from "next/image";
import Etherium_2 from '/public/images/home/Etherium-2.svg';
import Etherium_1 from '/public/images/home/Etherium-1.svg';
import LiteCoin_2 from '/public/images/home/LiteCoin-2.svg';
import LiteCoin_3 from '/public/images/home/LiteCoin-3.svg';
import Monero_1 from '/public/images/home/Monero-1.svg';
import Monero_5 from '/public/images/home/Monero-5.svg';
import Monero_2 from '/public/images/home/Monero-2.svg';
import Monero_3 from '/public/images/home/Monero-3.svg';
import Monero_4 from '/public/images/home/Monero-4.svg';
import Bitcoin_1 from '/public/images/home/Bitcoin-1.svg';

const Coins = () => {
    return (
        <>
            <Image src={Etherium_2} alt={'coin'} className={'absolute z-[-1] top-[750px] left-[1360px] 2xl:block hidden'}/>
            <Image src={LiteCoin_2} alt={'coin'} className={'absolute top-[514px] left-[152px] 2xl:block hidden'}/>
            <Image src={LiteCoin_3} alt={'coin'} className={'absolute top-[1215px] left-[142px] 2xl:block hidden'}/>
            <Image src={Monero_1} alt={'coin'} className={'absolute top-[2080px] left-[1341px] 2xl:block hidden'}/>
            <Image src={Monero_4} alt={'coin'} className={'absolute top-[3632px] left-[97px] 2xl:block hidden'}/>
            <Image src={Monero_2} alt={'coin'} className={'absolute top-[4268px] left-[100px] 2xl:block hidden'}/>
            <Image src={Monero_3} alt={'coin'} className={'absolute top-[5333px] left-[1340px] 2xl:block hidden'}/>
            <Image src={Etherium_1} alt={'coin'} className={'absolute top-[6170px] left-[1274px] 2xl:block hidden'}/>
            <Image src={Monero_5} alt={'coin'} className={'absolute top-[6540px] left-[60px] 2xl:block hidden'}/>
            <Image src={Bitcoin_1} alt={'coin'} className={'absolute top-[7150px] left-[1409px] 2xl:block hidden'}/>
        </>
    );
};

export default Coins;