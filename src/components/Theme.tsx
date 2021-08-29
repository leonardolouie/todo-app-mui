import { createTheme, MuiThemeProvider } from '@material-ui/core';
import React from 'react';

const matTheme = createTheme({
  palette: {
    primary: {
      light: '#BFE9FC',
      main: '#00A9F5',
      dark: '#00A9F5'
    },
    secondary: {
      light: '#00A9F5',
      main: '#00A9F5',
      dark: '#00A9F5'
    }
  },
  overrides: {
    MuiSnackbarContent: {
      root: {
        minWidth: '350px !important',
        padding: '20px 16px'
      }
    }
  }
});

export const ThemeProvider: React.FC = ({ children }) => (
  <MuiThemeProvider theme={matTheme}>{children}</MuiThemeProvider>
);
