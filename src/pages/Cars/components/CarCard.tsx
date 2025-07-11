import React from "react";
import { CarDTO } from "../../../types/CarDTO";
import SubmitButton from "../../commonComponents/SubmitButton";
import { useNavigate } from "react-router-dom";

interface CarCardProps {
    car: CarDTO;
    loading: boolean;
}

const translateTransmission = {
    'automatic': 'Автомат',
    'manual': 'Механика'
}

const CarCard: React.FC<CarCardProps> = ({ loading, car }) => {

    const navigate = useNavigate();

    const pictureUrl = car.media[0].url;
    const sum = car.price * 14;

    const carById = () => {
        navigate(`/car/${car.id}`);
    };

    const rent = () => {
        navigate(`/car/rent/${car.id}`);
    };

    return (
        <div style={{
            border: 'none',
            padding: '16px',
            width: '298.67px',
            height: '436px',
            display: 'flex',
            gap: '24px',
            flexDirection: 'column',
            cursor: 'pointer'
        }}
            onClick={carById}
        >
            <div style={{ height: '220px', display: 'flex', justifyContent: 'center' }}>
                <img src={'https://shift-intensive.ru/api' + pictureUrl} style={{ maxHeight: '220px', maxWidth: '100%', height: 'auto', borderRadius: '16px' }} />
            </div>
            <div style={{ display: 'flex', gap: '32px', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                    <h3 style={{ margin: '0px' }}>{car.name}</h3>
                    <span style={{ fontSize: '16px' }}>{translateTransmission[car.transmission]}</span>
                </div>
                <div style={{ display: 'flex', gap: '24px', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h3 style={{ color: '#141C24', margin: '0px' }}>{car.price} &#8381;</h3>
                        <span style={{ fontSize: '16px' }}>{sum} &#8381; за 14 дней</span>
                    </div>
                    <SubmitButton text="Выбрать" disabled={loading} width="100%" onClick={(e) => { e.stopPropagation(); rent(); }} />
                </div>
            </div>
        </div>
    );
};

export default CarCard;