import { useNavigate } from "react-router-dom";
import { translateStatus } from "../../components/Constants";
import SubmitButton from "../../components/SubmitButton";
import { activeCar, formatDate, formatTimestampToDate } from "../../components/CommonFunctions";
import { useRentDetailPage } from "./hooks/useRentDetailPage";
import { CancelRentDialog } from "./components/CancelRentDialog";

const RentDetailPage = ({ isDark }: { isDark: boolean }) => {
    const navigate = useNavigate();

    const { state, functions } = useRentDetailPage();

    if (state.loading) {
        return <div style={{ position: 'relative', top: 100, display: 'flex', justifyContent: 'center' }}>Загрузка...</div>;
    }

    return (
        <div style={{
            display: 'flex',
            gap: '24px',
            padding: '0px 260px',
            flexDirection: 'column',
            position: 'relative',
            top: 125
        }}>
            <h2 style={{ color: isDark ? '#FFFFFF' : '#141C24' }}>Детали бронирования</h2>
            <div style={{ display: 'flex', gap: '24px', padding: '24px 48px', flexDirection: 'column', border: '1px solid #E3E5E5', borderRadius: '16px' }}>
                <div style={{ display: 'flex', gap: '24px', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', gap: '24px', flexDirection: 'column', width: '50%' }}>
                        <span style={{ fontSize: '16px', fontWeight: 500, color: isDark ? '#FFFFFF' : '#141C24' }}>Данные брони</span>
                        <div style={{ display: 'flex', gap: '2px', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 400, fontSize: '12px', color: '#637083' }}>Статус</span>
                            <div style={{ display: 'flex', gap: '12px', flexDirection: 'row', width: '160px', alignItems: 'center' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: activeCar(state.rent.status, state.rent.startDate, state.rent.endDate) ? '#4ECF53' : (state.rent.status == 0 ? '#FDD442' : '#F64C4C') }}></div>
                                <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24', fontWeight: 400 }}>{activeCar(state.rent.status, state.rent.startDate, state.rent.endDate) ? 'Активна' : translateStatus[state.rent.status]}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '2px', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 400, fontSize: '12px', color: '#637083' }}>Автомобиль</span>
                            <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24', fontWeight: 400 }}>{state.rent.carInfo.name}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '2px', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 400, fontSize: '12px', color: '#637083' }}>Даты брони</span>
                            <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24', fontWeight: 400 }}>{formatTimestampToDate(state.rent.startDate)} - {formatTimestampToDate(state.rent.endDate)}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '2px', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 400, fontSize: '12px', color: '#637083' }}>Место получения</span>
                            <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24', fontWeight: 400 }}>{state.rent.pickupLocation}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '2px', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 400, fontSize: '12px', color: '#637083' }}>Место возврата</span>
                            <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24', fontWeight: 400 }}>{state.rent.returnLocation}</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '24px', flexDirection: 'column', width: '50%' }}>
                        <span style={{ fontSize: '16px', fontWeight: 500, color: isDark ? '#FFFFFF' : '#141C24' }}>Данные заказчика</span>
                        <div style={{ display: 'flex', gap: '2px', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 400, fontSize: '12px', color: '#637083' }}>ФИО</span>
                            <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24', fontWeight: 400 }}>{state.rent.lastName} {state.rent.firstName} {state.rent.middleName}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '2px', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 400, fontSize: '12px', color: '#637083' }}>Дата рождения</span>
                            <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24', fontWeight: 400 }}>{formatDate(state.rent.birthDate)}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '2px', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 400, fontSize: '12px', color: '#637083' }}>Номер телефона</span>
                            <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24', fontWeight: 400 }}>{state.rent.phone}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '2px', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 400, fontSize: '12px', color: '#637083' }}>Электронная почта</span>
                            <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24', fontWeight: 400 }}>{state.rent.email}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '2px', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 400, fontSize: '12px', color: '#637083' }}>Комментарий</span>
                            <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24', fontWeight: 400 }}>{state.rent.comment || 'Нет данных'}</span>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '24px', padding: '16px 0', width: '50%' }}>
                    <SubmitButton text="Назад" colorScheme="secondary" isDark={isDark} onClick={() => navigate('/rents')} width={'50%'} />
                    {state.rent.status == 0 ? (
                        <SubmitButton text="Отменить бронь" colorScheme="primary" isDark={isDark} onClick={() => functions.handleIsOpenModal(true)} width={'50%'} />
                    ) : (
                        null
                    )}
                    <CancelRentDialog isOpen={state.isOpen} handleIsOpenModal={functions.handleIsOpenModal} cancelRents={functions.cancelRents} isDark={isDark} />
                </div>
            </div>
        </div>
    );
};

export default RentDetailPage;