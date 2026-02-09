import RentCard from "./components/RentCard";
import { useRentsPage } from "./hooks/useRentsPage";

const RentsPage = ({ isDark }: { isDark: boolean }) => {

    const { state } = useRentsPage();

    if (state.loading) {
        return <div style={{ position: 'relative', top: 100, display: 'flex', justifyContent: 'center' }}>Загрузка...</div>;
    }

    return (
        <div style={{
            display: 'flex',
            gap: '24px',
            paddingLeft: '260px',
            flexDirection: 'column',
            position: 'relative',
            top: 125
        }}>
            <h2 style={{ margin: 0, color: isDark ? '#FFFFFF' : '#141C24' }}>Заказы</h2>
            <div style={{ display: 'flex', gap: '24px' }}>
                <span style={{ color: '#637083', fontSize: '14px', width: '150px' }}>Автомобиль</span>
                <span style={{ color: '#637083', fontSize: '14px', width: '428px' }}>Даты брони</span>
                <span style={{ color: '#637083', fontSize: '14px' }}>Статус брони</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                {state.rents.map(rent => (
                    <div>
                        <RentCard key={rent._id} rent={rent} isDark={isDark} />
                    </div>
                ))}
            </div>
        </div >
    );
};

export default RentsPage;
