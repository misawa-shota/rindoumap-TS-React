const useFormatHour = () => {
    const formatHour = (timeString: string) => {
        return new Date(timeString).getHours() + "時";
    };

    return { formatHour };
};

export default useFormatHour;
