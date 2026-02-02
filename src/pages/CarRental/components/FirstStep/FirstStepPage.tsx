import InputForm from "../../../../components/InputForm";
import SubmitButton from "../../../../components/SubmitButton";
import { CarRentalDTO } from "../../../../types/CarRentalDTO";
import { LocalizationProvider, DateRangePicker } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useFirstStepPage } from "./hooks/useFirstStepPage";

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

    const { state, functions } = useFirstStepPage({ carRental, handleDateChange });

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
                        value={state.value}
                        onChange={functions.handleChange}
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
                <SubmitButton text="Назад" width="100%" colorScheme="secondary" onClick={functions.back} />
                <SubmitButton text="Продолжить" width="100%" colorScheme="primary" onClick={continues} />
            </div>
        </div >
    );
};

export default FirstStepPage;