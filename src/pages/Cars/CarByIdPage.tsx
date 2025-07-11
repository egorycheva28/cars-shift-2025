import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CancelButton from "../commonComponents/CancelBurron";
import SubmitButton from "../commonComponents/SubmitButton";
import { getCarById } from "../../api/cars/cars";
import { CarByIdDTO } from "../../types/CarByIdDTO";

const translateTransmission = {
    'automatic': 'Автомат',
    'manual': 'Механика'
}

const translateSteering = {
    'left': 'Левый',
    'right': 'Правый'
}

const translateBodyType = {
    'sedan': 'Седан',
    'suv': 'Внедорожник',
    'coupe': 'Купе',
    'hatchback': 'Хэтчбек',
    'cabriolet': 'Кабриолет'
}

const translateColor = {
    'black': 'Черный',
    'white': 'Белый',
    'red': 'Красный',
    'silver': 'Серебряный',
    'blue': 'Синий',
    'grey': 'Серый',
    'orange': 'Оранжевый'
}

const CarByIdPage: React.FC = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [car, setCar] = useState<CarByIdDTO>(
        {
            id: '',
            bodyType: 'sedan',
            brand: 'Haval',
            color: 'black',
            location: '',
            media: [],
            name: '',
            price: 0,
            steering: 'left',
            transmission: 'automatic',
            rents: []
        }
    );

    const getDateParts = (timestamp: number): string => {
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.toLocaleString('ru-RU', { month: 'long' });
        return `${day} ${month}`;
    };

    const getDaysDifference = (start: number, end: number) => {
        const msPerDay = 1000 * 60 * 60 * 24;
        const diffInMs = end - start;
        return Math.round(diffInMs / msPerDay);
    };

    const getCar = async () => {
        try {
            const response = await getCarById(id);
            const result = response.data;
            setCar({
                ...car,
                id: result?.id,
                bodyType: result?.bodyType,
                brand: result?.brand,
                color: result?.color,
                location: result?.location,
                media: result?.media,
                name: result?.name,
                price: result?.price,
                steering: result?.steering,
                transmission: result?.transmission,
                rents: result?.rents
            });
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

    const back = () => {
        navigate('/cars');
    };

    useEffect(() => {
        getCar();
    }, []);

    if (loading) {
        return <div style={{ position: 'relative', top: 100, display: 'flex', justifyContent: 'center' }}>Загрузка...</div>;
    }

    return (
        <div style={{
            display: 'flex',
            gap: '24px',
            paddingRight: '240px',
            paddingLeft: '240px',
            flexDirection: 'column',
            position: 'relative',
            top: 125,
            paddingBottom: '72px'
        }}>
            <div style={{ display: 'flex', flexDirection: 'row', cursor: "pointer" }} onClick={back}>
                <img src='../arrowLeft.png' style={{ width: '24px', height: '24px' }} />
                <span style={{ color: '#97A1AF', fontSize: '16px' }}>Назад</span>
            </div>
            <div style={{ display: 'flex', gap: '40px', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '17.24px' }}>
                    {car.media.length > 0 && (
                        <div>
                            <img
                                src={'https://shift-intensive.ru/api' + car.media[0].url}
                                style={{ width: '100%', height: 'auto', borderRadius: '16px' }}
                                alt="Main"
                            />
                        </div>
                    )}
                    {car.media.length > 1 && (
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '17.24px' }}>
                            {car.media.slice(1).map((item, index) => (
                                <div key={index}>
                                    <img
                                        src={'https://shift-intensive.ru/api' + item.url}
                                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '32px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <h1 style={{ color: '#141C24' }}>{car?.name}</h1>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <h2 style={{ color: '#141C24', margin: 0 }}>Характеристики</h2>
                            <div style={{ border: '1px solid #E3E5E5' }}></div>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '24px', height: 'auto', width: '100%' }}>
                                <span style={{ color: '#141C24', fontSize: '16px', width: '50%' }}>Коробка передач</span>
                                <span style={{ color: '#141C24', fontSize: '16px', width: '50%' }}>{translateTransmission[car.transmission]}</span>
                            </div>
                            <div style={{ border: '1px solid #E3E5E5' }}></div>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '24px', height: 'auto', width: '100%' }}>
                                <span style={{ color: '#141C24', fontSize: '16px', width: '50%' }}>Руль</span>
                                <span style={{ color: '#141C24', fontSize: '16px', width: '50%' }}>{translateSteering[car.steering]}</span>
                            </div>
                            <div style={{ border: '1px solid #E3E5E5' }}></div>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '24px', height: 'auto', width: '100%' }}>
                                <span style={{ color: '#141C24', fontSize: '16px', width: '50%' }}>Тип кузова</span>
                                <span style={{ color: '#141C24', fontSize: '16px', width: '50%' }}>{translateBodyType[car.bodyType]}</span>
                            </div>
                            <div style={{ border: '1px solid #E3E5E5' }}></div>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '24px', height: 'auto', width: '100%' }}>
                                <span style={{ color: '#141C24', fontSize: '16px', width: '50%' }}>Цвет</span>
                                <span style={{ color: '#141C24', fontSize: '16px', width: '50%' }}>{translateColor[car.color]}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <h2 style={{ color: '#141C24', margin: 0 }}>Стоимость</h2>
                            <div style={{ border: '1px solid #E3E5E5' }}></div>
                            {car.rents.length > 1 && (
                                <div>
                                    <div style={{ display: 'flex', flexDirection: 'row', gap: '24px', height: 'auto', width: '100%' }}>
                                        <span style={{ color: '#141C24', fontSize: '16px', width: '50%' }}>Аренда на {getDaysDifference(car.rents[0].startDate, car.rents[0].endDate)} дней</span>
                                        <span style={{ color: '#141C24', fontSize: '16px', width: '50%' }}>{getDateParts(car.rents[0].startDate)} - {getDateParts(car.rents[0].endDate)}</span>
                                    </div>

                                    <div style={{ border: '1px solid #E3E5E5' }}></div>
                                </div>
                            )}
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '24px', height: 'auto', width: '100%' }}>
                                <h3 style={{ color: '#141C24', fontSize: '16px', width: '50%', margin: 0 }}>Итого</h3>
                                <h3 style={{ color: '#141C24', fontSize: '16px', width: '50%', margin: 0 }}>{car.price} &#8381;</h3>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '24px', padding: '16px 0' }}>
                        <CancelButton text="Назад" width="100%" onClick={back} />
                        <SubmitButton text="Забронировать" width="100%" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarByIdPage;