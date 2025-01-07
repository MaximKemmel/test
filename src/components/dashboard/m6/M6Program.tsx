import React, {useState} from 'react';
import M6 from "@/components/dashboard/m6/M6";
import M6Page from "@/components/dashboard/m6/M6Page";

const M6Program = () => {

    const [active, setActive] = useState<boolean>(false)
    const [level, setLevel] = useState<null | string>(null)

    const onActive = (level: string) => {
        setActive(true)
        setLevel(level)
    }

    return (
        <>
            {(active && level) ? <M6Page level={level}/> : <div className="program-3-grid">
                {Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12).map(el => {
                    return <M6 key={el} level={String(el)} setActive={() => onActive(String(el))}/>
                })}
            </div>}
        </>
    );
};

export default M6Program;
