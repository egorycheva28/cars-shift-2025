import InputForm from "../../components/InputForm";
import SubmitButton from "../../components/SubmitButton";
import { useAuthPage } from "./hooks/useAuthPage";

const AuthPage = () => {

    const { state, functions } = useAuthPage();

    return (
        <div style={{ position: 'relative', top: 125, display: 'flex', flexDirection: 'column', gap: '24px', padding: '0 240px', width: '400px' }}>
            <h2 style={{ margin: 0, color: '#141C24' }}>Авторизация</h2>
            <span style={{ color: '#141C24', fontSize: '16px' }}>Введите {state.isContinue ? 'проверочный код' : 'номер телефона'} для входа в личный кабинет</span>
            <InputForm
                label=""
                name="phone"
                type="number"
                value={state.phone || ''}
                placeholder="Телефон"
                onChange={(e) => functions.setPhone(e.target.value)}
                error={!!state.errors.phone}
                helperText={state.errors.phone}
                width="100%" />
            {state.isContinue && (
                <InputForm
                    label=""
                    name="otpCode"
                    type="number"
                    value={state.otpCode || ''}
                    placeholder="Проверочный код"
                    onChange={(e) => functions.setOtpCode(e.target.value)}
                    error={!!state.errors.otpCode}
                    helperText={state.errors.otpCode}
                    width="100%" />
            )}
            <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <SubmitButton text={state.isContinue ? 'Войти' : 'Продолжить'} colorScheme="primary" onClick={state.isContinue ? functions.login : functions.createCode} width="100%" />
                {state.isContinue && (state.codeRepeat ? (
                    <SubmitButton text='Запросить код ещё раз' colorScheme="secondary" onClick={functions.createCode} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', boxShadow: 'none' }} />
                ) : (
                    <span style={{ color: '#97A1AF', display: 'flex', justifyContent: 'center' }}>Запросить код повторно можно через {state.timer} секунд</span>
                ))}
            </div>
        </div>
    );
};

export default AuthPage;