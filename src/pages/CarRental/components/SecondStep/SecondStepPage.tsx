import InputForm from "../../../../components/InputForm";
import SubmitButton from "../../../../components/SubmitButton";
import { CarRentalDTO } from "../../../../types/CarRentalDTO";
import { Checkbox, FormControlLabel } from "@mui/material";

interface StepOneProps {
    carRental: CarRentalDTO;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    continues: () => void;
    back: () => void;
    errors: (Partial<Record<keyof CarRentalDTO, string>>);
    isDark: boolean;
}

const SecondStepPage: React.FC<StepOneProps> = ({ carRental, handleChange, continues, back, errors, isDark }) => {
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
                isDark={isDark}
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
                isDark={isDark}
            />
            <InputForm
                label="Отчество"
                name="middleName"
                type="text"
                placeholder="Отчество"
                value={carRental.middleName || ''}
                onChange={handleChange}
                width="100%"
                isDark={isDark}
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
                isDark={isDark}
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
                isDark={isDark}
            />
            <InputForm
                label="Электронная почта"
                name="email"
                type="email"
                placeholder="Электронная почта"
                value={carRental.email || ''}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                width="100%"
                isDark={isDark}
            />
            <InputForm
                label="Комментарий"
                name="comment"
                type="text"
                placeholder="Введите дополнительную информацию"
                value={carRental.comment || ''}
                onChange={handleChange}
                width="100%"
                isDark={isDark}
            />
            <FormControlLabel style={{ color: isDark ? '#FFFFFF' : '#141C24' }} control={<Checkbox />} label="Принимаю условия соглашения" />
            <div style={{ display: 'flex', gap: '24px', padding: '16px 0' }}>
                <SubmitButton text="Назад" width="100%" colorScheme="secondary" isDark={isDark} onClick={back} />
                <SubmitButton text="Продолжить" width="100%" colorScheme="primary" isDark={isDark} onClick={continues} />
            </div>
        </div >
    );
};

export default SecondStepPage;