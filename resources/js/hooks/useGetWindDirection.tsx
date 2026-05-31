const useGetWindDirection = () => {
    const getWindDirection = (windDirection: number): string => {
        const directions =
        [
            '北',
            '北北東',
            '北東',
            '東北東',
            '東',
            '東南東',
            '南東',
            '南南東',
            '南',
            '南南西',
            '南西',
            '西南西',
            '西',
            '西北西',
            '北西',
            '北北西'
        ];
        const index = Math.round(windDirection / 22.5) % 16;
        return directions[index];
    };

    return { getWindDirection };
};

export default useGetWindDirection;
