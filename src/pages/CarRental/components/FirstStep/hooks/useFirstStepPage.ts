import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useFirstStepPage = (props: any) => {
    const navigate = useNavigate();

    const back = () => { navigate('/cars'); };

    const [value, setValue] = useState<[Date | null, Date | null]>([
        props.carRental.startDate ? new Date(props.carRental.startDate) : null,
        props.carRental.endDate ? new Date(props.carRental.endDate) : null,
    ]);

    const handleChange = (newValue: [Date | null, Date | null]) => {
        setValue(newValue);
        if (newValue[0]) {
            props.handleDateChange('startDate', newValue[0].getTime());
        }
        if (newValue[1]) {
            props.handleDateChange('endDate', newValue[1].getTime());
        }
    };

    return {
        state: { value },
        functions: {
            handleChange,
            back
        }
    }
}