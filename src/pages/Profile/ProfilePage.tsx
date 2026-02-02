import InputForm from "../../components/InputForm";
import SubmitButton from "../../components/SubmitButton";
import { useProfilePage } from "./hooks/useProfilePage";

const ProfilePage = () => {

    const { state, functions } = useProfilePage();

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
            top: 125,
            width: '368px'
        }}>
            <h2 style={{ margin: 0, color: '#141C24' }}>Профиль</h2>
            <div style={{ flex: 1 }}>
                <InputForm
                    label="Фамилия*"
                    name="lastname"
                    type="text"
                    value={state.profile.lastname || ''}
                    placeholder="Фамилия"
                    onChange={functions.handleChange}
                    helperText={''}
                    width="100%"
                />
            </div>
            <div style={{ flex: 1 }}>
                <InputForm
                    label="Имя*"
                    name="firstname"
                    type="text"
                    value={state.profile.firstname || ''}
                    placeholder="Имя"
                    onChange={functions.handleChange}
                    helperText={''}
                    width="100%"
                />
            </div>
            <div style={{ flex: 1 }}>
                <InputForm
                    label="Отчество*"
                    name="middlename"
                    type="text"
                    value={state.profile.middlename || ''}
                    placeholder="Отчество"
                    onChange={functions.handleChange}
                    helperText={''}
                    width="100%"
                />
            </div>
            <div style={{ flex: 1 }}>
                <InputForm
                    label="Телефон*"
                    name="phone"
                    type="text"
                    value={state.profile.phone || ''}
                    placeholder="Телефон"
                    onChange={functions.handleChange}
                    error={!!state.errors.phone}
                    helperText={state.errors.phone}
                    width="100%"
                />
            </div>
            <div style={{ flex: 1 }}>
                <InputForm
                    label="Email"
                    name="email"
                    type="email"
                    value={state.profile.email || ''}
                    placeholder="Email"
                    onChange={functions.handleChange}
                    helperText={''}
                    width="100%"
                />
            </div>
            <div style={{ flex: 1 }}>
                <InputForm
                    label="Город"
                    name="city"
                    type="text"
                    value={state.profile.city || ''}
                    placeholder="Город"
                    onChange={functions.handleChange}
                    helperText={''}
                    width="100%"
                />
            </div>
            <div style={{ display: 'flex', gap: '24px', padding: '16px 0' }}>
                <SubmitButton text="Выйти" width="70%" colorScheme="secondary" onClick={functions.logout} />
                <SubmitButton text="Обновить данные" width="100%" colorScheme="primary" onClick={functions.updateProfile} />
            </div>
        </div >
    );
};

export default ProfilePage;
