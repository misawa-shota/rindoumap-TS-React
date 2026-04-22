import { BsFillPinMapFill } from "react-icons/bs";
import useLocate from "@/hooks/useLocate";

const LocateButton = () => {
    const { locate } = useLocate();

    return (
        <button
            onClick={locate}
            style={{
                position: 'absolute',
                top: '130px',
                left: '10px',
                zIndex: 1000,
                cursor: 'pointer',
                backgroundColor: 'white',
                padding: '8px',
                borderRadius: '4px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
            }}
        >
            <BsFillPinMapFill size={"17"}/>
        </button>
    );
};

export default LocateButton;
