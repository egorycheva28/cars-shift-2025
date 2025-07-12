import { Button, ButtonProps } from '@mui/material'

interface SubmitButtonProps extends ButtonProps {
    text: string
    disabled?: boolean
    width?: number | string
    height?: number | string
}

const CancelButton: React.FC<SubmitButtonProps> = ({
    text,
    disabled = false,
    width = '100%',
    height = '56px',
    ...props
}) => (
    <Button
        type="submit"
        variant="contained"
        disabled={disabled}
        sx={{
            borderRadius: '16px',
            border: '1px solid #CED2DA',
            width,
            height,
            fontSize: '16px',
            textTransform: 'none',
            bgcolor: '#FFFFFF',
            color: '#344051',
            '&:hover': {
                bgcolor: '#FFFFFF',
            },
            '&.Mui-disabled': {
                bgcolor: '#FFFFFF',
                color: '#344051',
                opacity: 0.6,
                cursor: 'not-allowed',
            },
            '&.Mui-disabled:hover': {
                bgcolor: '#FFFFFF',
            },
        }}
        {...props}
    >
        {text}
    </Button>
)

export default CancelButton;