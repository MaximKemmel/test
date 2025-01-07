import React, {useState} from 'react';
import Line5 from "@/components/dashboard/line5/Line5";
import Line5Page from "@/components/dashboard/line5/Line5Page";


const Line5Program = () => {

    const [active, setActive] = useState<boolean>(false)
    const [level, setLevel] = useState<null | string>(null)

    const onActive = (level: string) => {
        setActive(true)
        setLevel(level)
    }

    return (
        <>
            {(active && level) ? <Line5Page level={level}/> : <div className="program-2-grid">
                {Array(1, 2, 3, 4, 5).map(el => {
                    return <Line5 setActive={() => onActive(String(el))} level={String(el)} key={el}/>
                })}
            </div>}
        </>
    );
};

export default Line5Program;
