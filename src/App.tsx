import Router from './router/Router';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const App = () => {
    const [isDark, setIsDark] = useState<boolean>(false); 

    const toggleTheme = () => {
        console.log('color');
        setIsDark(prev => !prev);
    };

    const theme = createTheme();

    useEffect(() => {
        document.body.style.backgroundColor = isDark ? '#141C24' : '#FFFFFF';
    }, [isDark]);

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Router toggleTheme={toggleTheme} isDark={isDark} />
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;