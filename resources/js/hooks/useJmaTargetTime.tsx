import { useState, useEffect } from 'react';

const useJmaTargetTime = () => {
    const [targetTime, setTargetTime] = useState("");

    useEffect(() => {
        const fetchTargetTime = async () => {
            try {
                const response = await fetch("https://www.jma.go.jp/bosai/jmatile/data/nowc/targetTimes_N1.json");

                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    setTargetTime(data[0].basetime);
                }
            } catch (error) {
                console.error('Error fetching target time:', error);
            }
        };

        fetchTargetTime();

        const timer = setInterval(fetchTargetTime, 5 * 60 * 1000); // 5分ごとに更新

        return () => clearInterval(timer); // クリーンアップ
    }, []);

    return targetTime;
};

export default useJmaTargetTime;
