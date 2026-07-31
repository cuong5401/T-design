import { useEffect, useState } from "react";
import { formatClock } from "../utils/formatTime";

export function useClock() {
    const [clockText, setClockText] = useState(() => formatClock(new Date()));

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setClockText(formatClock(new Date()));
        }, 1000);

        return () => {
            window.clearInterval(intervalId);
        };
    }, []);

    return clockText;
}
