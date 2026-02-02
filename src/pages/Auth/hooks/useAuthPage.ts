import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginDTO } from "../../../types/LoginDTO";
import { createOtpCode } from "../../../api/auth/createOtpCode";
import { signin } from "../../../api/auth/signin";

export const useAuthPage = () => {
    const navigate = useNavigate();

    const [phone, setPhone] = useState<string>();
    const [otpCode, setOtpCode] = useState<string>();

    const [isContinue, setIsContinue] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(60);
    const [codeRepeat, setCodeRepeat] = useState<boolean>(false);
    const [errors, setErrors] = useState<Partial<Record<keyof LoginDTO, string>>>({});
    const [click, setClick] = useState<number>(1);

    const startTimer = () => {
        setIsContinue(true);
        setTimer(60);
        setCodeRepeat(false);
    }

    const validatePhone = (): boolean => {
        const e: typeof errors = {};

        if (!phone) {
            e.phone = 'Поле обязательно.';
        }

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const validateOtpCode = (): boolean => {
        const e: typeof errors = {};

        if (!otpCode || otpCode.toString().length !== 6) {
            e.otpCode = 'Код должен содержать 6 цифр';
        }

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const createCode = async () => {
        if (!validatePhone()) return false;

        startTimer();
        await createOtpCode(phone);
    };

    const login = async () => {
        if (!validateOtpCode()) return false;

        const result = await signin(phone, Number(otpCode));
        if (result && result.success) {
            setTimer(0);
            localStorage.setItem('token', result.token);
            navigate('/cars');
            return;
        }

        setClick(click + 1);
    };

    useEffect(() => {
        if (timer > 0) {
            const time = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(time);
        }

        setCodeRepeat(true);
        
    }, [isContinue, timer]);

    return {
        state: { phone, otpCode, isContinue, timer, codeRepeat, errors, click },
        functions: {
            setPhone,
            setOtpCode,
            createCode,
            login
        }
    }
}