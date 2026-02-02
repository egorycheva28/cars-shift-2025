import { useState } from "react";
import { useParams } from "react-router-dom";
import { CarRentalDTO } from "../../../types/CarRentalDTO";

export const useCarRentalPage = () => {
    const { id } = useParams();

    const [errors, setErrors] = useState<Partial<Record<keyof CarRentalDTO, string>>>({});
    const [step, setStep] = useState<number>(1);
    const [carRental, setCarRental] = useState<CarRentalDTO>(
        {
            carId: id,
            pickupLocation: '',
            returnLocation: '',
            startDate: 0,
            endDate: 0,
            firstName: '',
            lastName: '',
            birthDate: '',
            email: '',
            phone: '',
        }
    );

    const progressValue = (step / 3) * 100;

    const validateFirstStep = (): boolean => {
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

    const validateSecondStep = (): boolean => {
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
        else if (!/^[78]\d{10}$/.test(carRental.phone)) {
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
        if ((step === 1 && !validateFirstStep()) || (step === 2 && !validateSecondStep())) return false;

        setStep(step + 1);
    };

    return {
        state: { step, progressValue, carRental, errors },
        functions: {
            setStep,
            handleChange,
            handleDateChange,
            back,
            continues
        }
    }
}