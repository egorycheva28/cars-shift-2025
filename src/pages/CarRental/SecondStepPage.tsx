import CancelButton from "../../components/CancelBurron";
import InputForm from "../../components/InputForm";
import SubmitButton from "../../components/SubmitButton";
import { CarRentalDTO } from "../../types/CarRentalDTO";
import { Checkbox, FormControlLabel } from "@mui/material";

interface StepOneProps {
    carRental: {
        firstName: string;
        lastName: string;
        middleName: string;
        birthDate: string;
        email: string;
        phone: string;
        comment: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    continues: () => void;
    back: () => void;
    errors: (Partial<Record<keyof CarRentalDTO, string>>);
}

const SecondStepPage: React.FC<StepOneProps> = ({ carRental, handleChange, continues, back, errors }) => {
    return (
        <div style={{
            display: 'flex',
            gap: '24px',
            flexDirection: 'column',
            width: '368px'
        }}>
            <InputForm
                label="Фамилия"
                name="lastName"
                type="text"
                placeholder="Фамилия"
                value={carRental.lastName || ''}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                width="100%"
            />
            <InputForm
                label="Имя"
                name="firstName"
                type="text"
                placeholder="Имя"
                value={carRental.firstName || ''}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                width="100%"
            />
            <InputForm
                label="Отчество"
                name="middleName"
                type="text"
                placeholder="Отчество"
                value={carRental.middleName || ''}
                onChange={handleChange}
                width="100%"
            />
            <InputForm
                label="Дата рождения"
                name="birthDate"
                type="date"
                placeholder="Дата рождения"
                value={carRental.birthDate || ''}
                onChange={handleChange}
                error={!!errors.birthDate}
                helperText={errors.birthDate}
                width="100%"
            />
            <InputForm
                label="Номер телефона"
                name="phone"
                type="text"
                placeholder="Номер телефона"
                value={carRental.phone || ''}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                width="100%"
            />
            <InputForm
                label="Электронная почта"
                name="email"
                type="text"
                placeholder="Электронная почта"
                value={carRental.email || ''}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                width="100%"
            />
            <InputForm
                label="Комментарий"
                name="comment"
                type="text"
                placeholder="Введите дополнительную информацию"
                value={carRental.comment || ''}
                onChange={handleChange}
                width="100%"
            />
            <FormControlLabel control={<Checkbox />} label="Принимаю условия соглашения" />
            <div style={{ display: 'flex', gap: '24px', padding: '16px 0' }}>
                <CancelButton text="Назад" width="100%" onClick={back} />
                <SubmitButton text="Продолжить" width="100%" onClick={continues} />
            </div>
        </div >
    );
};

export default SecondStepPage;