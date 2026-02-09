import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { Box, Button, useTheme } from '@mui/material';

const Navbar = ({ onToggleTheme, isDark }: { onToggleTheme: () => void, isDark: boolean }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const theme = useTheme();

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/cars');
    };

    return (
        <AppBar sx={{ position: 'fixed', height: '82px', paddingTop: '8px', top: 0, width: '100%', zIndex: 1000, backgroundColor: isDark ? '#141C24' : '#FFFFFF', borderBottom: '1px solid #CED2DA', boxShadow: 'none' }}>
            <Toolbar disableGutters>
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0, cursor: 'pointer' }} onClick={() => navigate('/cars')}>
                        <Typography variant="h6" component="div" sx={{ color: '#DB0019', width: '40%', fontSize: '13.43px', fontWeight: 600 }}>
                            ШИФТ RENT
                        </Typography>
                        <img
                            src="../../carIcon.png"
                            style={{
                                width: 37,
                                height: 29.75,
                                objectFit: 'contain'
                            }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', marginLeft: 4, justifyContent: 'space-between', width: '65%', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {token ? (
                                <>
                                    <Button
                                        variant="outlined"
                                        startIcon={<img
                                            src={isDark ? "../../profileWhite.png" : "../../profileBlack.png"}
                                            alt="Профиль"
                                            style={{
                                                width: 24,
                                                height: 24,
                                                objectFit: 'contain'
                                            }}
                                        />}
                                        sx={{ color: isDark ? '#FFFFFF' : '#141C24', border: "none", fontWeight: 500, fontSize: '16px', display: 'flex', alignItems: 'center', gap: 0.3, textTransform: 'none' }}
                                        onClick={() => navigate('/profile')}
                                    >
                                        Профиль
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<img
                                            src={isDark ? "../../rentWhite.png" : "../../rentBlack.png"}
                                            alt="Заказы"
                                            style={{
                                                width: 24,
                                                height: 24,
                                                objectFit: 'contain'
                                            }}
                                        />} sx={{ color: isDark ? '#FFFFFF' : '#141C24', border: "none", fontWeight: 500, fontSize: '16px', display: 'flex', alignItems: 'center', gap: 0.3, textTransform: 'none' }}
                                        onClick={() => navigate('/rents')}
                                    >
                                        Заказы
                                    </Button>
                                </>
                            ) : (
                                <></>
                            )}
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {!token ? (
                                <Button
                                    variant="outlined"
                                    startIcon={<img
                                        src={isDark ? "../../exitWhite.png" : "../../exitBlack.png"}
                                        alt="Войти"
                                        style={{
                                            width: 24,
                                            height: 24,
                                            objectFit: 'contain'
                                        }}
                                    />} sx={{ color: isDark ? '#FFFFFF' : '#141C24', border: "none", fontWeight: 500, fontSize: '16px', display: 'flex', alignItems: 'center', gap: 1, textTransform: 'none' }}
                                    onClick={() => navigate('/login')}
                                >
                                    Войти
                                </Button>
                            ) : (
                                <Button
                                    variant="outlined"
                                    startIcon={<img
                                        src={isDark ? "../../exitWhite.png" : "../../exitBlack.png"}
                                        alt="Выйти"
                                        style={{
                                            width: 24,
                                            height: 24,
                                            objectFit: 'contain'
                                        }}
                                    />} sx={{ color: isDark ? '#FFFFFF' : '#141C24', border: "none", fontWeight: 500, fontSize: '16px', display: 'flex', alignItems: 'center', gap: 1, textTransform: 'none' }}
                                    onClick={logout}
                                >
                                    Выйти
                                </Button>
                            )}
                            <IconButton onClick={onToggleTheme}>
                                {isDark ? (
                                    <img
                                        src="../../sun.png"
                                        alt="sun"
                                        style={{
                                            width: 24,
                                            height: 24,
                                            objectFit: 'contain'
                                        }}
                                    />
                                ) : (
                                    <img
                                        src="../../moon.png"
                                        alt="moon"
                                        style={{
                                            width: 24,
                                            height: 24,
                                            objectFit: 'contain'
                                        }}
                                    />
                                )}
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;