import SubmitButton from "../../../../components/SubmitButton";
import { translateStatus } from "../../../../components/Constants";
import { activeCar, formatTimestampToDate } from "../../../../components/CommonFunctions";
import { useLocation, useNavigate } from "react-router-dom";

const CarRentPage = ({ isDark }: { isDark: boolean }) => {

    const location = useLocation();
    const carRental = location.state;
    const navigate = useNavigate();

    return (
        <div style={{
            display: 'flex',
            gap: '24px',
            paddingLeft: '260px',
            flexDirection: 'column',
            position: 'relative',
            top: 125,
        }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '24px', alignItems: 'center' }}>
                <img src="../carRented.png" style={{ width: '80px', height: '80px' }} />
                <h2 style={{ margin: 0, color: isDark ? '#FFFFFF' : '#141C24' }}>Автомобиль забронирован</h2>
            </div>
            <div style={{ display: 'flex', gap: '24px', border: '1px solid #E3E5E5', borderRadius: '24px', padding: '24px 48px', width: '600px', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ color: '#637083', fontSize: '12px' }}>Статус</span>
                    <div style={{ display: 'flex', gap: '12px', flexDirection: 'row', width: '160px', alignItems: 'center' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: activeCar(carRental.status, carRental.startDate, carRental.endDate) ? '#4ECF53' : (carRental.status == 0 ? '#FDD442' : '#F64C4C') }}></div>
                        <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24', fontWeight: 400 }}>{activeCar(carRental.status, carRental.startDate, carRental.endDate) ? 'Активна' : translateStatus[carRental.status]}</span>
                    </div>                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ color: '#637083', fontSize: '12px' }}>Автомобиль</span>
                    <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24' }}>{carRental.carInfo.name}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ color: '#637083', fontSize: '12px' }}>Даты брони</span>
                    <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24' }}>{formatTimestampToDate(carRental.startDate)} - {formatTimestampToDate(carRental.endDate)}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ color: '#637083', fontSize: '12px' }}>Место получения</span>
                    <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24' }}>{carRental.pickupLocation}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ color: '#637083', fontSize: '12px' }}>Место возврата</span>
                    <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24' }}>{carRental.returnLocation}</span>
                </div>
                <span style={{ color: '#97A1AF', fontSize: '14px' }}>Вся информация была продублирована в SMS</span>
            </div>
            <div style={{ display: 'flex', gap: '24px', padding: '16px 0', width: '464px' }}>
                <SubmitButton text="Посмотреть статус" width="100%" colorScheme="secondary" isDark={isDark} onClick={() => navigate('/rents')} />
                <SubmitButton text="На главную" width="100%" colorScheme="primary" isDark={isDark} onClick={() => navigate('/cars')} />
            </div>
        </div >
    );
};

export default CarRentPage;
