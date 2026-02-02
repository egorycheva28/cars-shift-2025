import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
    text: string;
    disabled?: boolean;
    width?: number | string;
    height?: number | string;
    colorScheme?: 'primary' | 'secondary';
}

const SubmitButton: React.FC<CustomButtonProps> = ({
    text,
    disabled = false,
    width = '100%',
    height = '56px',
    colorScheme = 'primary',
    ...props
}) => {
    const styles = {
        borderRadius: '16px',
        width,
        height,
        fontSize: '16px',
        textTransform: 'none',
        bgcolor: colorScheme === 'primary' ? '#DB0019' : '#FFFFFF',
        color: colorScheme === 'primary' ? '#FFFFFF' : '#344051',
        '&:hover': {
            bgcolor: colorScheme === 'primary' ? '#DB0019' : '#FFFFFF',
        },
        '&.Mui-disabled': {
            bgcolor: colorScheme === 'primary' ? '#DB0019' : '#FFFFFF',
            color: colorScheme === 'primary' ? '#FFFFFF' : '#344051',
            opacity: 0.6,
            cursor: 'not-allowed',
        },
        '&.Mui-disabled:hover': {
            bgcolor: colorScheme === 'primary' ? '#DB0019' : '#FFFFFF',
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