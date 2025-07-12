import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarRentalDTO } from "../../types/CarRentalDTO";
import InputForm from "../../components/InputForm";
import { ProfileDTO } from "../../types/ProfileDTO";
import CancelButton from "../../components/CancelBurron";
import SubmitButton from "../../components/SubmitButton";
import { getProfile } from "../../api/profile/getProfile";
import { editProfile } from "../../api/profile/editProfile";

const ProfilePage = () => {
    const navigate = useNavigate();

    const [errors, setErrors] = useState<Partial<Record<keyof CarRentalDTO, string>>>({});
    const [loading, setLoading] = useState<boolean>(true);

    const [profile, setProfile] = useState<ProfileDTO>(
        {
            phone: '',
            firstName: '',
            lastName: '',
            middleName: '',
            email: '',
            city: ''
        }
    );

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
            const response = await editProfile(profile);
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

    if (loading) {
        return <div style={{ position: 'relative', top: 100, display: 'flex', justifyContent: 'center' }}>Загрузка...</div>;
    }

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
            <h2 style={{ margin: 0, color: '#141C24' }}>Профиль</h2>
            <div style={{ flex: 1 }}>
                <InputForm
                    label="Фамилия*"
                    name="lastName"
                    type="text"
                    value={profile.lastName || ''}
                    placeholder="Фамилия"
                    onChange={handleChange}
                    helperText={''}
                    width="100%"
                />
            </div>
            <div style={{ flex: 1 }}>
                <InputForm
                    label="Имя*"
                    name="firstName"
                    type="text"
                    value={profile.firstName || ''}
                    placeholder="Имя"
                    onChange={handleChange}
                    helperText={''}
                    width="100%"
                />
            </div>
            <div style={{ flex: 1 }}>
                <InputForm
                    label="Отчество*"
                    name="middleName"
                    type="text"
                    value={profile.middleName || ''}
                    placeholder="Отчество"
                    onChange={handleChange}
                    helperText={''}
                    width="100%"
                />
            </div>
            <div style={{ flex: 1 }}>
                <InputForm
                    label="Телефон*"
                    name="phone"
                    type="text"
                    value={profile.phone || ''}
                    placeholder="Телефон"
                    onChange={handleChange}
                    helperText={''}
                    width="100%"
                />
            </div>
            <div style={{ flex: 1 }}>
                <InputForm
                    label="Email"
                    name="email"
                    type="email"
                    value={profile.email || ''}
                    placeholder="Email"
                    onChange={handleChange}
                    helperText={''}
                    width="100%"
                />
            </div>
            <div style={{ flex: 1 }}>
                <InputForm
                    label="Город"
                    name="city"
                    type="text"
                    value={profile.city || ''}
                    placeholder="Город"
                    onChange={handleChange}
                    helperText={''}
                    width="100%"
                />
            </div>
            <div style={{ display: 'flex', gap: '24px', padding: '16px 0' }}>
                <CancelButton text="Выйти" width="70%" onClick={logout} />
                <SubmitButton text="Обновить данные" width="100%" onClick={updateProfile} />
            </div>
        </div >
    );
};

export default ProfilePage;
