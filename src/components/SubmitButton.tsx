import { Button, ButtonProps } from '@mui/material';
import { border } from '@mui/system';

interface CustomButtonProps extends ButtonProps {
    text: string;
    disabled?: boolean;
    width?: number | string;
    height?: number | string;
    colorScheme?: 'primary' | 'secondary';
    isDark: boolean;
}

const SubmitButton: React.FC<CustomButtonProps> = ({
    text,
    disabled = false,
    width = '100%',
    height = '56px',
    colorScheme = 'primary',
    isDark,
    ...props
}) => {
    const styles = {
        borderRadius: '16px',
        border: colorScheme === 'primary' ? 'none' : '1px solid #CED2DA',
        boxShadow: 'none',
        width,
        height,
        fontSize: '16px',
        textTransform: 'none',
        bgcolor: colorScheme === 'primary' ? '#DB0019' : (isDark ? '#141C24' : '#FFFFFF'),
        color: (colorScheme === 'primary' || isDark) ? '#FFFFFF' : '#344051',
        '&:hover': {
            bgcolor: colorScheme === 'primary' ? '#DB0019' : (isDark ? '#141C24' : '#FFFFFF'),
        },
        '&.Mui-disabled': {
            bgcolor: colorScheme === 'primary' ? '#DB0019' : (isDark ? '#141C24' : '#FFFFFF'),
            color: (colorScheme === 'primary' || isDark) ? '#FFFFFF' : '#344051',
            opacity: 0.6,
            cursor: 'not-allowed',
        },
        '&.Mui-disabled:hover': {
            bgcolor: colorScheme === 'primary' ? '#DB0019' : (isDark ? '#141C24' : '#FFFFFF'),
        },
    };

    return (
        <Button
            type="submit"
            variant="contained"
            disabled={disabled}
            sx={styles}
            {...props}
        >
            {text}
        </Button>
    );
};

export default SubmitButton;