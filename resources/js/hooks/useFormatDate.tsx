const useFormatDate = () => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        return date.toLocaleDateString('ja-JP', {
            month: 'numeric',
            day: 'numeric',
            weekday: 'short',
        });
    };
    return { formatDate };

};

export default useFormatDate;
