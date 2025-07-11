import { useNavigate } from "react-router-dom";
import CancelButton from "../commonComponents/CancelBurron";
import InputForm from "../commonComponents/InputForm";
import SubmitButton from "../commonComponents/SubmitButton";
import { CarRentalDTO } from "../../types/CarRentalDTO";
import { useState } from "react";
import { LocalizationProvider, DateRangePicker } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface StepOneProps {
    carRental: {
        startDate?: number;
        endDate?: number;
        pickupLocation: string;
        returnLocation: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    continues: () => void;
    errors: (Partial<Record<keyof CarRentalDTO, string>>);
    handleDateChange: (name: 'startDate' | 'endDate', value: number | null) => void;
}

const FirstStepPage: React.FC<StepOneProps> = ({ carRental, handleChange, continues, errors, handleDateChange }) => {
    const navigate = useNavigate();

    const back = () => {
        navigate('/cars');
    };

    const [value, setValue] = useState<[Date | null, Date | null]>([
        carRental.startDate ? new Date(carRental.startDate) : null,
        carRental.endDate ? new Date(carRental.endDate) : null,
    ]);

    const handleChange1 = (newValue: [Date | null, Date | null]) => {
        setValue(newValue);
        if (newValue[0]) {
            handleDateChange('startDate', newValue[0].getTime());
        }
        if (newValue[1]) {
            handleDateChange('endDate', newValue[1].getTime());
        }
    };

    return (
        <div style={{
            display: 'flex',
            gap: '24px',
            flexDirection: 'column',
            width: '368px'
        }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label>Даты аренды</label>
                    <DateRangePicker
                        value={value}
                        onChange={handleChange1}
                    />
                </div>
            </LocalizationProvider>
            <InputForm
                label="Место получения"
                name="pickupLocation"
                type="text"
                placeholder="Место получения"
                value={carRental.pickupLocation || ''}
                onChange={handleChange}
                error={!!errors.pickupLocation}
                helperText={errors.pickupLocation}
                width="100%"
            />
            <InputForm
                label="Место возврата"
                name="returnLocation"
                type="text"
                placeholder="Место возврата"
                value={carRental.returnLocation || ''}
                onChange={handleChange}
                error={!!errors.returnLocation}
                helperText={errors.returnLocation}
                width="100%"
            />
            <div style={{ display: 'flex', gap: '24px', padding: '16px 0' }}>
                <CancelButton text="Назад" width="100%" onClick={back} />
                <SubmitButton text="Продолжить" width="100%" onClick={continues} />
            </div>
        </div >
    );
};

export default FirstStepPage;