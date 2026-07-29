import { useState, useEffect } from "react";

const useRainViewer = () => {
    const [host, setHost] = useState("");
    const [time, setTime] = useState<number>();

    useEffect(() => {
        fetch("https://api.rainviewer.com/public/weather-maps.json")
            .then(res => res.json())
            .then(data => {
                setHost(data.host);

                const latest = data.radar.past[data.radar.past.length - 1];
                setTime(latest.time);
            });
    }, []);

    return {
        host,
        time,
    };
}

export default useRainViewer;
