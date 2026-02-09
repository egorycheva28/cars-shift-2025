import FirstStepPage from "./components/FirstStep/FirstStepPage";
import SecondStepPage from "./components/SecondStep/SecondStepPage";
import ThirdStepPage from "./components/ThirdStep/ThirdStepPage";
import { LinearProgress } from "@mui/material";
import { useCarRentalPage } from "./hooks/useCarRentalPage";

const CarRentalPage = ({ isDark }: { isDark: boolean }) => {

    const { state, functions } = useCarRentalPage();

    return (
        <div style={{
            display: 'flex',
            gap: '24px',
            paddingLeft: '260px',
            flexDirection: 'column',
            position: 'relative',
            top: 125,
            width: '368px'
        }}>
            {state.step === 1 && (
                <h2 style={{ margin: 0, color: isDark ? '#FFFFFF' : '#141C24' }}>Бронирование авто</h2>
            )}
            {state.step === 2 && (
                <h2 style={{ margin: 0, color: isDark ? '#FFFFFF' : '#141C24' }}>Введите ваши данные</h2>
            )}
            {state.step === 3 && (
                <h2 style={{ margin: 0, color: isDark ? '#FFFFFF' : '#141C24' }}>Проверка данных</h2>
            )}
            <div>
                <div style={{ paddingBottom: '8px' }}>
                    <label style={{ color: isDark ? '#FFFFFF' : '#141C24' }}>Шаг {state.step} из 3</label>
                </div>
                <LinearProgress variant="determinate" value={state.progressValue} sx={{
                    height: '4px',
                    borderRadius: '16px',
                    backgroundColor: '#CED2DA',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: '#4ECF53',
                    },
                }} />
            </div>
            {state.step === 1 && (
                <FirstStepPage carRental={state.carRental} handleChange={functions.handleChange} continues={functions.continues} errors={state.errors} handleDateChange={functions.handleDateChange} isDark={isDark} />
            )}
            {state.step === 2 && (
                <SecondStepPage carRental={state.carRental} handleChange={functions.handleChange} continues={functions.continues} back={functions.back} errors={state.errors} isDark={isDark} />
            )}
            {state.step === 3 && (
                <ThirdStepPage carRental={state.carRental} handleChange={functions.handleChange} continues={functions.continues} back={functions.back} setStep={functions.setStep} isDark={isDark} />
            )}
        </div >
    );
};

export default CarRentalPage;
