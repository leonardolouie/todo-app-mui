import { createTheme, MuiThemeProvider } from '@material-ui/core';
import indigo from '@material-ui/core/colors/indigo';
import orange from '@material-ui/core/colors/orange';
import React from 'react';

export const theme = {
    color: {
        primary: '#ff8c00',
        secondary: '#283593',
        error: '#ff5a5f',
        danger: '#c7390a',
        red: '#e74c3c',
        gray: '#707070',
        approved: '#0eb6a8',
        paleBlue: '#3498db',
    },
};

const matTheme = createTheme({
    palette: {
        primary: orange,
        secondary: indigo,
    },
    overrides: {
        MuiSnackbarContent: {
            root: {
                minWidth: '350px !important',
                padding: '20px 16px',
            },
        },
    },
});

export const ThemeProvider: React.FC = ({ children }) => (
    <MuiThemeProvider theme={matTheme}>
        {children}
    </MuiThemeProvider>
);
