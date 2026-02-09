import { formatDate, formatTimestampToDate } from "../../../../components/CommonFunctions";
import SubmitButton from "../../../../components/SubmitButton";
import { CarRentalDTO } from "../../../../types/CarRentalDTO";
import { useThirdStepPage } from "./hooks/useThirdStepPage";

interface StepOneProps {
    carRental: CarRentalDTO;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    continues: () => void;
    back: () => void;
    setStep: (step: number) => void;
    isDark: boolean;
}

const ThirdStepPage: React.FC<StepOneProps> = ({ carRental, back, setStep, isDark }) => {

    const { state, functions } = useThirdStepPage({ carRental, setStep });

    if (state.loading) {
        return <div style={{ position: 'relative', top: 100, display: 'flex', justifyContent: 'center' }}>Загрузка...</div>;
    }

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
                backgroundColor: isDark ? '#344051' : '#F3F4F6',
                flexDirection: 'row'
            }}>
                <div style={{ padding: '8px 0', display: 'flex', gap: '16px', width: '100%' }}>
                    <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24' }}>Данные брони</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ color: '#637083', fontSize: '12px' }}>Автомобиль</span>
                        <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24' }}>{state.car?.name}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ color: '#637083', fontSize: '12px' }}>Даты брони</span>
                        <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24' }}>{formatTimestampToDate(carRental.startDate || 0)} - {formatTimestampToDate(carRental.endDate || 0)}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ color: '#637083', fontSize: '12px' }}>Место получения</span>
                        <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24' }}>{carRental.pickupLocation}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ color: '#637083', fontSize: '12px' }}>Место возврата</span>
                        <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24' }}>{carRental.returnLocation}</span>
                    </div>
                </div>
                <div>
                    <img src="../../edit.png" style={{ width: '24px', height: '24px', cursor: 'pointer' }} onClick={() => functions.edit(1)} />
                </div>
            </div>

            <div style={{
                padding: '24px 48px',
                display: 'flex',
                gap: '24px',
                borderRadius: '16px',
                backgroundColor: isDark ? '#344051' : '#F3F4F6',
                flexDirection: 'row'
            }}>
                <div style={{ padding: '8px 0', display: 'flex', gap: '16px', width: '100%' }}>
                    <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24' }}>Данные заказчика</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ color: '#637083', fontSize: '12px' }}>ФИО</span>
                        <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24' }}>{carRental.lastName} {carRental.firstName} {carRental.middleName}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ color: '#637083', fontSize: '12px' }}>Дата рождения</span>
                        <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24' }}>{formatDate(carRental.birthDate)}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ color: '#637083', fontSize: '12px' }}>Номер телефона</span>
                        <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24' }}>{carRental.phone}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ color: '#637083', fontSize: '12px' }}>Электронная почта</span>
                        <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24' }}>{carRental.email}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ color: '#637083', fontSize: '12px' }}>Комментарий</span>
                        <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24' }}>{carRental.comment || 'Нет данных'}</span>
                    </div>
                </div>
                <div>
                    <img src="../../edit.png" style={{ width: '24px', height: '24px', cursor: 'pointer' }} onClick={() => functions.edit(2)} />
                </div>
            </div>
            <div style={{ padding: '12px 0', display: 'flex', gap: '16px', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                    <h3 style={{ margin: 0, color: isDark ? '#FFFFFF' : '#141C24' }}>Итого:</h3>
                    <h3 style={{ margin: 0, color: isDark ? '#FFFFFF' : '#141C24' }}>{(state.car?.price || 0) * functions.daysCount()} &#8381;</h3>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <span style={{ color: isDark ? '#FFFFFF' : '#141C24' }}>Аренда: {functions.displayValue()}</span>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0' }}>
                <SubmitButton text="Назад" width="33%" colorScheme="secondary" isDark={isDark} onClick={back} />
                <SubmitButton text="Забронировать" width="33%" colorScheme="primary" isDark={isDark} onClick={functions.rent} />
            </div>
        </div >
    );
};

export default ThirdStepPage;