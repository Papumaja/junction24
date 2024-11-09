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
    fontFamily: '"Trocchi", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Arimo", "Roboto"',
    },
    h2: {
      fontFamily: '"Arimo", "Roboto"',
    },
    h3: {
      fontFamily: '"Arimo", "Roboto"',
    },
    h4: {
      fontWeight: 600,
      fontFamily: '"Arimo", "Roboto"',
    },
    h5: {
      fontWeight: 500,
      fontFamily: '"Arimo", "Roboto"',
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

export default theme;
