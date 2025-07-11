import { useNavigate } from "react-router-dom";
import CancelButton from "../../components/CancelBurron";
import SubmitButton from "../../components/SubmitButton";
import { rentCar } from "../../api/cars/rentCar";
import { useEffect, useState } from "react";
import { CarByIdDTO } from "../../types/CarByIdDTO";
import { format, differenceInCalendarDays } from 'date-fns';
import { getCarById } from "../../api/cars/getCarById";

interface StepOneProps {
    carRental: {
        carId: string | undefined;
        pickupLocation: string;
        returnLocation: string;
        startDate?: number;
        endDate?: number;
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
    setStep: (step: number) => void;
}

const ThirdStepPage: React.FC<StepOneProps> = ({ carRental, back, setStep }) => {
    const navigate = useNavigate();
    const [car, setCar] = useState<CarByIdDTO>();

    const formatDate = (date: (Date | '' | string)) => {
        if (!date) return "Нет данных";
        return new Date(date).toLocaleDateString("ru-RU");
    };

    const formatTimestampToDate = (milliseconds: number) => {
        const date = new Date(milliseconds);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    const formatDate1 = (date: number) => {
        return date ? format(date, 'dd.MM.yyyy') : '';
    };

    const daysCount = () => {
        if (carRental.startDate && carRental.endDate) {
            return differenceInCalendarDays(carRental.endDate, carRental.startDate) + 1;
        }
        return 0;
    };

    const displayValue = () => {
        if (carRental.startDate && carRental.endDate) {
            const start = formatDate1(carRental.startDate);
            const end = formatDate1(carRental.endDate);
            const days = daysCount();
            return `${start} - ${end} (${days} дней)`;
        }
        return '';
    };

    const edit = (step: number) => {
        setStep(step);
    };

    const rent = async () => {
        try {
            const result = await rentCar(carRental);
            navigate('/car/rent', { state: result.rent });
            //setLoading(true);
        } catch (err: any) {
            console.error(err);
            alert('Ошибка аренды автомобиля: ' + (err.message || 'Неизвестная ошибка'));
        } finally {
            // setLoading(false);
        }
    };

    const getCar = async () => {
        try {
            const response = await getCarById(carRental.carId);
            setCar(response.data);
            // setLoading(true);
        }
        catch (err: any) {
            console.error(err);
            alert('Ошибка получения машины: ' + (err.message || 'Неизвестная ошибка'));
        }
        finally {
            // setLoading(false);
        }
    };

    useEffect(() => {
        getCar();
    }, []);

    return (
        <div style={{
            display: 'flex',
            gap: '24px',
            flexDirection: 'column',
            width: '960px'
        }}>

            <div style={{
                padding: '24px 48px',
                display: 'flex',
                gap: '24px',
                borderRadius: '16px',
                backgroundColor: '#F3F4F6',
                flexDirection: 'row'
            }}>
                <div style={{ padding: '8px 0', display: 'flex', gap: '16px', width: '100%' }}>
                    <span style={{ fontSize: '16px', color: '#141C24' }}>Данные брони</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ color: '#637083', fontSize: '12px' }}>Автомобиль</span>
                        <span style={{ fontSize: '16px', color: '#141C24' }}>{car?.name}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ color: '#637083', fontSize: '12px' }}>Даты брони</span>
                        <span style={{ fontSize: '16px', color: '#141C24' }}>{formatTimestampToDate(carRental.startDate || 0)} - {formatTimestampToDate(carRental.endDate || 0)}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ color: '#637083', fontSize: '12px' }}>Место получения</span>
                        <span style={{ fontSize: '16px', color: '#141C24' }}>{carRental.pickupLocation}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ color: '#637083', fontSize: '12px' }}>Место возврата</span>
                        <span style={{ fontSize: '16px', color: '#141C24' }}>{carRental.returnLocation}</span>
                    </div>
                </div>
                <div>
                    <img src="../../edit.png" style={{ width: '24px', height: '24px', cursor: 'pointer' }} onClick={() => edit(1)} />
                </div>
            </div>

            <div style={{
                padding: '24px 48px',
                display: 'flex',
                gap: '24px',
                borderRadius: '16px',
                backgroundColor: '#F3F4F6',
                flexDirection: 'row'
            }}>
                <div style={{ padding: '8px 0', display: 'flex', gap: '16px', width: '100%' }}>
                    <span style={{ fontSize: '16px', color: '#141C24' }}>Данные заказчика</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ color: '#637083', fontSize: '12px' }}>ФИО</span>
                        <span style={{ fontSize: '16px', color: '#141C24' }}>{carRental.lastName} {carRental.firstName} {carRental.middleName}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ color: '#637083', fontSize: '12px' }}>Дата рождения</span>
                        <span style={{ fontSize: '16px', color: '#141C24' }}>{formatDate(carRental.birthDate)}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ color: '#637083', fontSize: '12px' }}>Номер телефона</span>
                        <span style={{ fontSize: '16px', color: '#141C24' }}>{carRental.phone}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ color: '#637083', fontSize: '12px' }}>Электронная почта</span>
                        <span style={{ fontSize: '16px', color: '#141C24' }}>{carRental.email}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ color: '#637083', fontSize: '12px' }}>Комментарий</span>
                        <span style={{ fontSize: '16px', color: '#141C24' }}>{carRental.comment || 'Нет данных'}</span>
                    </div>
                </div>
                <div>
                    <img src="../../edit.png" style={{ width: '24px', height: '24px', cursor: 'pointer' }} onClick={() => edit(2)} />
                </div>
            </div>
            <div style={{ padding: '12px 0', display: 'flex', gap: '16px', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                    <h3 style={{ margin: 0 }}>Итого:</h3>
                    <h3 style={{ margin: 0 }}>{(car?.price || 0) * daysCount()} &#8381;</h3>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <span>Аренда: {displayValue()}</span>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0' }}>
                <CancelButton text="Назад" width="33%" onClick={back} />
                <SubmitButton text="Забронировать" width="33%" onClick={rent} />
            </div>
        </div >
    );
};

export default ThirdStepPage;