import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CarRentalDTO } from "../../types/CarRentalDTO";
import FirstStepPage from "./FirstStepPage";
import SecondStepPage from "./SecondStepPage";
import ThirdStepPage from "./ThirdStepPage";
import { LinearProgress } from "@mui/material";

const CarRentalPage: React.FC = () => {
    const { id } = useParams();

    const [errors, setErrors] = useState<Partial<Record<keyof CarRentalDTO, string>>>({});
    const [carRental, setCarRental] = useState<CarRentalDTO>(
        {
            carId: id,
            pickupLocation: '',
            returnLocation: '',
            firstName: '',
            lastName: '',
            middleName: '',
            birthDate: '',
            email: '',
            phone: '',
            comment: '',
        }
    );
    const [step, setStep] = useState<number>(1);
    const progressValue = (step / 3) * 100;

    const validate1 = (): boolean => {
        const e: typeof errors = {};

        if (!carRental.pickupLocation) {
            e.pickupLocation = 'Поле обязательно.';
        }

        if (!carRental.returnLocation) {
            e.returnLocation = 'Поле обязательно.';
        }

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const validate2 = (): boolean => {
        const e: typeof errors = {};

        if (!carRental.lastName) {
            e.lastName = 'Поле обязательно.';
        }

        if (!carRental.firstName) {
            e.firstName = 'Поле обязательно.';
        }

        if (!carRental.phone) {
            e.phone = 'Поле обязательно.';
        }
        else if (!/^7\d{10}$/.test(carRental.phone)) {
            e.phone = 'Некорректный формат номера телефона.';
        }

        if (!carRental.email) {
            e.email = 'Поле обязательно.';
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(carRental.email)) {
            e.email = 'Некорректный формат электронной почты.';
        }

        if (!carRental.birthDate) {
            e.birthDate = 'Поле обязательно.';
        }

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCarRental(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (name: 'startDate' | 'endDate', value: number | null) => {
        setCarRental(prev => ({ ...prev, [name]: value }));
    };

    const back = () => {
        setStep(step - 1);
    };

    const continues = () => {
        if ((step === 1 && !validate1()) || (step === 2 && !validate2())) return false;

        setStep(step + 1);
    };

    return (
        <div style={{
            display: 'flex',
            gap: '24px',
            paddingLeft: '260px',
            flexDirection: 'column',
            position: 'relative',
            top: 125,
            width: '368px'
        }}>
            {step === 1 && (
                <h2 style={{ margin: 0 }}>Бронирование авто</h2>
            )}
            {step === 2 && (
                <h2 style={{ margin: 0 }}>Введите ваши данные</h2>
            )}
            {step === 3 && (
                <h2 style={{ margin: 0 }}>Проверка данных</h2>
            )}
            <div>
                <div style={{ paddingBottom: '8px' }}>
                    <label>Шаг {step} из 3</label>
                </div>
                <LinearProgress variant="determinate" value={progressValue} sx={{
                    height: '4px',
                    borderRadius: '16px',
                    backgroundColor: '#CED2DA',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: '#4ECF53',
                    },
                }} />
            </div>
            {step === 1 && (
                <FirstStepPage carRental={carRental} handleChange={handleChange} continues={continues} errors={errors} handleDateChange={handleDateChange} />
            )}
            {step === 2 && (
                <SecondStepPage carRental={carRental} handleChange={handleChange} continues={continues} back={back} errors={errors} />
            )}
            {step === 3 && (
                <ThirdStepPage carRental={carRental} handleChange={handleChange} continues={continues} back={back} setStep={setStep} />
            )}
        </div >
    );
};

export default CarRentalPage;
