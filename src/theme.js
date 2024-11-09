// src/theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6200EE',
    },
    secondary: {
      main: '#03DAC6',
    },
    background: {
      default: '#F5F5F5',
    },
    text: {
      primary: '#212121',
    },
  },
  typography: {
    fontFamily: '"Arimo", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Trocchi", "Roboto"',
    },
    h2: {
      fontFamily: '"Trocchi", "Roboto"',
    },
    h3: {
      fontFamily: '"Trocchi", "Roboto"',
    },
    h4: {
      fontWeight: 600,
      fontFamily: '"Trocchi", "Roboto"',
    },
    h5: {
      fontWeight: 500,
      fontFamily: '"Trocchi", "Roboto"',
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

export default theme;
