'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#0288d1',
        },
        secondary: {
            main: '#f50057',
        },
    },
    typography: {
        fontFamily: 'var(--font-roboto)',
    },
    props: {
        MuiAppBar: {
            color: 'transparent',
        },
    },
});

export default theme;