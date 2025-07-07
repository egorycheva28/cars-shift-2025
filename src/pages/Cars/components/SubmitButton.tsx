import { Button } from '@mui/material'

interface SubmitButtonProps {
    text: string
    disabled?: boolean
    width?: number | string
    height?: number | string
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
    text,
    disabled = false,
    width = '100%',
    height = '56px'
}) => (
    <Button
        type="submit"
        variant="contained"
        disabled={disabled}
        sx={{
            borderRadius: '16px',
            width,
            height,
            fontSize: '16px',
            textTransform: 'none',
            bgcolor: '#DB0019',
            color: '#FFFFFF',
            '&:hover': {
                bgcolor: '#DB0019',
            },
            '&.Mui-disabled': {
                bgcolor: '#DB0019',
                color: '#FFFFFF',
                opacity: 0.6,
                cursor: 'not-allowed',
            },
            '&.Mui-disabled:hover': {
                bgcolor: '#DB0019',
            },
        }}
    >
        {text}
    </Button>
)

export default SubmitButton;