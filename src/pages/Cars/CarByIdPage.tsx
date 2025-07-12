import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CancelButton from "../../components/CancelBurron";
import SubmitButton from "../../components/SubmitButton";
import { CarByIdDTO } from "../../types/CarByIdDTO";
import { getCarById } from "../../api/cars/getCarById";
import { translateBodyType, translateColor, translateSteering, translateTransmission } from "../../components/Consts";

const CarByIdPage = () => {

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

    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 7);
    const formatter = new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
    });
    const formattedToday = formatter.format(today);
    const formattedFutureDate = formatter.format(futureDate);

    const getCar = async () => {
        try {
            const response = await getCarById(id);
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

    const back = () => {
        navigate('/cars');
    };

    const rent = () => {
        navigate(`/car/rent/${car.id}`);
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
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '24px', height: 'auto', width: '100%' }}>
                                <span style={{ color: '#141C24', fontSize: '16px', width: '50%' }}>Аренда на 7 дней</span>
                                <span style={{ color: '#141C24', fontSize: '16px', width: '50%' }}>{formattedToday} - {formattedFutureDate}</span>
                            </div>
                            <div style={{ border: '1px solid #E3E5E5' }}></div>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '24px', height: 'auto', width: '100%' }}>
                                <h3 style={{ color: '#141C24', fontSize: '16px', width: '50%', margin: 0 }}>Итого</h3>
                                <h3 style={{ color: '#141C24', fontSize: '16px', width: '50%', margin: 0 }}>{car.price * 7} &#8381;</h3>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '24px', padding: '16px 0' }}>
                        <CancelButton text="Назад" width="100%" onClick={back} />
                        <SubmitButton text="Забронировать" width="100%" onClick={rent} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarByIdPage;