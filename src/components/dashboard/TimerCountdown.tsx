import {Fragment, useEffect, useMemo, useState} from "react";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export const TimerCountdown = ({ deadline = new Date().toString() }) => {
    const parsedDeadline = useMemo(() => Date.parse(deadline), [deadline]);
    const [time, setTime] = useState(parsedDeadline - Date.now());

    useEffect(() => {
        const interval = setInterval(
            () => setTime(parsedDeadline - Date.now()),
            1000,
        );

        return () => clearInterval(interval);
    }, [parsedDeadline]);

    return (
        <div className="flex items-center gap-x-1">
            {Object.entries({
                ['д.']: time / DAY,
                ['час.']: (time / HOUR) % 24,
                ['мин.']: (time / MINUTE) % 60,
                ['сек.']: (time / SECOND) % 60,
            }).map(([label, value]) => (
                <div className="flex items-center gap-x-1" key={label}>
                        <p>{`${Math.floor(value)}`.padStart(2, "0")}</p>
                        <span className="text">{label}</span>
                </div>
            ))}
        </div>
    );
};
