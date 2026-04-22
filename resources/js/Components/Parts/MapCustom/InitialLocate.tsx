import { useEffect } from 'react';
import useLocate from '@/hooks/useLocate';

const InitialLocate = () => {
    const { locate } = useLocate();

    useEffect(() => {
        locate();
    }, []);

    return null;
};

export default InitialLocate;
