import SubmitButton from "../../components/SubmitButton";
import { translateBodyType, translateColor, translateSteering, translateTransmission } from "../../components/Constants";
import { useCarDetailPage } from "./hooks/useCarDetailPage";

const CarDetailPage = () => {

    const { state, functions } = useCarDetailPage();

    if (state.loading) {
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
            <div style={{ display: 'flex', flexDirection: 'row', cursor: "pointer" }} onClick={functions.back}>
                <img src='../arrowLeft.png' style={{ width: '24px', height: '24px' }} />
                <span style={{ color: '#97A1AF', fontSize: '16px' }}>Назад</span>
            </div>
            <div style={{ display: 'flex', gap: '40px', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '17.24px' }}>
                    {state.car.media.length > 0 && (
                        <div>
                            <img
                                src={'https://shift-intensive.ru/api' + state.car.media[0].url}
                                style={{ width: '100%', height: 'auto', borderRadius: '16px' }}
                                alt="Main"
                            />
                        </div>
                    )}
                    {state.car.media.length > 1 && (
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '17.24px' }}>
                            {state.car.media.slice(1).map((item, index) => (
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
                        <h1 style={{ color: '#141C24' }}>{state.car?.name}</h1>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <h2 style={{ color: '#141C24', margin: 0 }}>Характеристики</h2>
                            <div style={{ border: '1px solid #E3E5E5' }}></div>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '24px', height: 'auto', width: '100%' }}>
                                <span style={{ color: '#141C24', fontSize: '16px', width: '50%' }}>Коробка передач</span>
                                <span style={{ color: '#141C24', fontSize: '16px', width: '50%' }}>{translateTransmission[state.car.transmission]}</span>
                            </div>
                            <div style={{ border: '1px solid #E3E5E5' }}></div>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '24px', height: 'auto', width: '100%' }}>
                                <span style={{ color: '#141C24', fontSize: '16px', width: '50%' }}>Руль</span>
                                <span style={{ color: '#141C24', fontSize: '16px', width: '50%' }}>{translateSteering[state.car.steering]}</span>
                            </div>
                            <div style={{ border: '1px solid #E3E5E5' }}></div>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '24px', height: 'auto', width: '100%' }}>
                                <span style={{ color: '#141C24', fontSize: '16px', width: '50%' }}>Тип кузова</span>
                                <span style={{ color: '#141C24', fontSize: '16px', width: '50%' }}>{translateBodyType[state.car.bodyType]}</span>
                            </div>
                            <div style={{ border: '1px solid #E3E5E5' }}></div>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '24px', height: 'auto', width: '100%' }}>
                                <span style={{ color: '#141C24', fontSize: '16px', width: '50%' }}>Цвет</span>
                                <span style={{ color: '#141C24', fontSize: '16px', width: '50%' }}>{translateColor[state.car.color]}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <h2 style={{ color: '#141C24', margin: 0 }}>Стоимость</h2>
                            <div style={{ border: '1px solid #E3E5E5' }}></div>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '24px', height: 'auto', width: '100%' }}>
                                <span style={{ color: '#141C24', fontSize: '16px', width: '50%' }}>Аренда на 7 дней</span>
                                <span style={{ color: '#141C24', fontSize: '16px', width: '50%' }}>{state.formattedToday} - {state.formattedFutureDate}</span>
                            </div>
                            <div style={{ border: '1px solid #E3E5E5' }}></div>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '24px', height: 'auto', width: '100%' }}>
                                <h3 style={{ color: '#141C24', fontSize: '16px', width: '50%', margin: 0 }}>Итого</h3>
                                <h3 style={{ color: '#141C24', fontSize: '16px', width: '50%', margin: 0 }}>{state.car.price * 7} &#8381;</h3>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '24px', padding: '16px 0' }}>
                        <SubmitButton text="Назад" width="100%" colorScheme="secondary" onClick={functions.back} />
                        <SubmitButton text="Забронировать" width="100%" colorScheme="primary" onClick={functions.rent} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetailPage;