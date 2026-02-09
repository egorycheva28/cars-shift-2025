import React from 'react';
import { Box, Typography, TextField, MenuItem } from '@mui/material';

interface Option {
    value: string;
    label: string;
}

interface FormFieldProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    width?: number | string;
    height?: number | string;
    options?: Option[];
    error?: boolean;
    helperText?: string;
    isDark: boolean;
}

const InputForm: React.FC<FormFieldProps> = ({
    label,
    name,
    type = 'text',
    placeholder = '',
    value,
    onChange,
    width = '100%',
    height,
    options,
    error = false,
    helperText = '',
    isDark
}) => (
    <Box sx={{ margin: 0, display: 'flex', gap: '6px', flexDirection: 'column' }}>
        <Typography variant="subtitle1" sx={{ color: isDark ? '#FFFFFF' : '#141C24', margin: 0, fontSize: '14px' }}>
            {label}
        </Typography>
        <TextField
            select={Boolean(options)}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            variant="outlined"
            margin="dense"
            error={error}
            helperText={helperText}
            FormHelperTextProps={{
                sx: {
                    textAlign: 'left',
                    margin: 0,
                }
            }}
            InputProps={{
                sx: {
                    '& .MuiOutlinedInput-input': {
                        padding: '4px 8px', color: isDark ? '#FFFFFF' : '#637083'
                    },
                }
            }}
            sx={{
                margin: 0,
                width,
                ...(height ? { height } : {}),
                '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    border: '1px solid #CED2DA',
                    padding: '12px',
                    backgroundColor: isDark ? '#141C24' : '#FFFFFF',
                    ...(height ? { height } : {}),
                    '&.Mui-focused fieldset': {
                        color: '#637083'
                    },
                },
            }}
        >
            {options?.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                </MenuItem>
            ))}
        </TextField>
    </Box>
);

export default InputForm;