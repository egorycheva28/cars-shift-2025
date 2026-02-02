import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileDTO } from "../../../types/ProfileDTO";
import { getProfile } from "../../../api/profile/getProfile";
import { editProfile } from "../../../api/profile/editProfile";
import { CarRentalDTO } from "../../../types/CarRentalDTO";

export const useProfilePage = () => {
    const navigate = useNavigate();

    const [errors, setErrors] = useState<Partial<Record<keyof CarRentalDTO, string>>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [profile, setProfile] = useState<ProfileDTO>(
        {
            phone: '',
            firstname: '',
            lastname: '',
            middlename: '',
            email: '',
            city: ''
        }
    );

    const validate = (): boolean => {
        const e: typeof errors = {};

        if (!profile.phone) {
            e.phone = 'Поле обязательно.';
        }

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const getSession = async () => {
        try {
            const response = await getProfile();
            setProfile(response.user);
            setLoading(true);
        }
        catch (err: any) {
            console.error(err);
            alert('Ошибка получения сессии: ' + (err.message || 'Неизвестная ошибка'));
        }
        finally {
            setLoading(false);
        }
    };

    const updateProfile = async () => {
        try {
            if (!validate()) return;

            await editProfile(profile);
            getSession();
            setLoading(true);
        }
        catch (err: any) {
            console.error(err);
            alert('Ошибка обновления профиля: ' + (err.message || 'Неизвестная ошибка'));
        }
        finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/cars');
    };

    useEffect(() => {
        getSession();
    }, []);

    return {
        state: { errors, loading, profile },
        functions: {
            handleChange,
            updateProfile,
            logout
        }
    }
}