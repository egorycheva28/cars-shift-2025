import { useEffect, useState } from "react";
import { createOtpCode } from "../../api/auth/createOtpCode";
import { signin } from "../../api/auth/signin";
import InputForm from "../../components/InputForm";
import SubmitButton from "../../components/SubmitButton";
import CancelButton from "../../components/CancelBurron";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState<string>();
    const [otpCode, setOtpCode] = useState<string>();
    const [isContinue, setIsContinue] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(60);
    const [codeRepeat, setCodeRepeat] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [click, setClick] = useState<number>(1);

    const startTimer = () => {
        setIsContinue(true);
        setTimer(60);
        setCodeRepeat(false);
    }

    const createCode = async () => {
        if (!phone) {
            setError('Поле является обязательным');
        } else {
            setError('');
            startTimer();
            await createOtpCode(phone);
        }
    };

    const login = async () => {
        if (!otpCode || otpCode.toString().length !== 6) {
            setError('Код должен содержать 6 цифр');
        }
        else {
            const result = await signin(phone, Number(otpCode));
            setError('');
            if (result && result.success) {
                setTimer(0);
                localStorage.setItem('token', result.token);
                navigate('/cars');
            }
            else {
                setClick(click + 1);
            }
        }
    };

    useEffect(() => {
        if (timer > 0) {
            const time = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(time);
        }
        else {
            setCodeRepeat(true);
        }
    }, [isContinue, timer]);

    return (
        <div style={{ position: 'relative', top: 125, display: 'flex', flexDirection: 'column', gap: '24px', padding: '0 240px', width: '400px' }}>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <h2 style={{ margin: 0, color: '#141C24' }}>Авторизация</h2>
            <span style={{ color: '#141C24', fontSize: '16px' }}>Введите {isContinue ? 'проверочный код' : 'номер телефона'} для входа в личный кабинет</span>
            <InputForm
                label=""
                name="phone"
                type="number"
                value={phone || ''}
                placeholder="Телефон"
                onChange={(e) => setPhone(e.target.value)}
                helperText={''}
                width="100%" />
            {isContinue && (
                <InputForm
                    label=""
                    name="otpCode"
                    type="number"
                    value={otpCode || ''}
                    placeholder="Проверочный код"
                    onChange={(e) => setOtpCode(e.target.value)}
                    helperText={''}
                    width="100%" />
            )}
            <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <SubmitButton text={isContinue ? 'Войти' : 'Продолжить'} onClick={isContinue ? login : createCode} width="100%" />
                {isContinue && (codeRepeat ? (
                    <CancelButton text='Запросить код ещё раз' onClick={createCode} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', boxShadow: 'none' }} />
                ) : (
                    <span style={{ color: '#97A1AF', display: 'flex', justifyContent: 'center' }}>Запросить код повторно можно через {timer} секунд</span>
                ))}
            </div>
        </div>
    );
};

export default AuthPage;