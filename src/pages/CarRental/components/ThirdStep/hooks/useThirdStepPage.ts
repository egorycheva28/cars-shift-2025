import { useEffect, useState } from "react";
import { rentCar } from "../../../../../api/rents/rentCar";
import { getCarById } from "../../../../../api/cars/getCarById";
import { useNavigate } from "react-router-dom";
import { format, differenceInCalendarDays } from 'date-fns';
import { CarByIdDTO } from "../../../../../types/CarByIdDTO";

export const useThirdStepPage = (props: any) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [car, setCar] = useState<CarByIdDTO>();

    const formatDate = (date: number) => {
        return date ? format(date, 'dd.MM.yyyy') : '';
    };

    const daysCount = () => {
        if (props.carRental.startDate && props.carRental.endDate) {
            return differenceInCalendarDays(props.carRental.endDate, props.carRental.startDate) + 1;
        }
        return 0;
    };

    const displayValue = () => {
        if (props.carRental.startDate && props.carRental.endDate) {
            const start = formatDate(props.carRental.startDate);
            const end = formatDate(props.carRental.endDate);
            const days = daysCount();
            return `${start} - ${end} (${days} дней)`;
        }
        return '';
    };

    const edit = (step: number) => { props.setStep(step); };

    const rent = async () => {
        try {
            const result = await rentCar(props.carRental);
            navigate('/car/rent', { state: result.rent });
            setLoading(true);
        } catch (err: any) {
            console.error(err);
            alert('Ошибка аренды автомобиля: ' + (err.message || 'Неизвестная ошибка'));
        } finally {
            setLoading(false);
        }
    };

    const getCar = async () => {
        try {
            const response = await getCarById(props.carRental.carId);
            setCar(response.data);
            setLoading(true);
        }
        catch (err: any) {
            console.error(err);
            alert('Ошибка получения машины: ' + (err.message || 'Неизвестная ошибка'));
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCar();
    }, []);


    return {
        state: { loading, car },
        functions: {
            daysCount,
            displayValue,
            edit,
            rent
        }
    }
}