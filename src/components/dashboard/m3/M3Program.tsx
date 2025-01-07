import React, {useEffect, useState} from 'react';
import M3 from "@/components/dashboard/m3/M3";
import M3Page from "@/components/dashboard/m3/M3Page";
import {getM3} from "@/lib/api";
import {useAddress} from "@thirdweb-dev/react";
import {M3Type} from "@/lib/interfaces";

const M3Program = () => {

    const [m3, setM3] = useState<null | M3Type>(null)
    const address = useAddress()
    const [active, setActive] = useState<boolean>(false)
    const [level, setLevel] = useState<null | string>(null)

    useEffect(() => {
        if (address) {
            getM3(address).then(res => {
                if (res!.success && res) {
                    setM3(res.result)
                }
            })
        }
    }, [address])

    const onActive = (level: string) => {
        setActive(true)
        setLevel(level)
    }

    return (
        <>
            {(active && level) ? <M3Page level={level}/> : <div className="program-3-grid">
                {Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12).map(el => {
                    return <M3 m3={m3} key={el} level={String(el)} setActive={() => onActive(String(el))} />
                })}
            </div>}
        </>
    );
};

export default M3Program;
